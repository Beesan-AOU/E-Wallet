import React, { Component } from "react";
import "../styles/purchasePage.css";
import ProductCard from "../components/productCard";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../App";
import { useState } from "react";
import ReceiptItem from "../components/receiptItem";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import PopupStudentApprovalPage from "../components/popupStudentApprovalScreen";
import LoadingScreen from "../components/LoadingScreen";
import { useLocation } from "react-router-dom";
import { async } from "@firebase/util";
import SuccessfulPurchasePopup from "../components/successfulPurchasePopup";
import PopupErrorMessage from "../components/popupErrorMessage";


function PurchasePage() {
  const { state } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [receiptItems, setReceiptItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [approvalModalShown, setApprovalModalShown] = useState(false);
  const [successfulPurchaseMsgShown, setSuccessfulPurchaseMsgShown] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(state);
  const [errorHeading, setErrorHeading] = useState();
  const [errorMessage, setErrorMessage] = useState();
  let newStudentData = {}

  const fetchStudentData = () => {
    onSnapshot(doc(db, "children", state.id), (doc) => {
      console.log("Current data: ", doc.data());
      setCurrentStudent(doc.data());
  });
  }



  const handleSearch = async () => {
    const docRef = doc(db, "children", searchQuery);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setApprovalModalShown(true);
      setSearchQuery("");
      newStudentData = docSnap.data();
    } else {
    }
  }

  const successfulCheckout = async () => {
    let newBalance = currentStudent.balance - totalAmount;
    let newPurchaseHistory =[...currentStudent.purchaseHistory]
    receiptItems.forEach((item) => {
      console.log("item" + JSON.stringify(item));
      let purchaseHistoryItem = {
        itemName: item.itemName,
        price: item.totalPrice,
        quantity: item.quantity,
        date: new Date().toLocaleDateString(),
        image: item.image
      }
      newPurchaseHistory = [...newPurchaseHistory, purchaseHistoryItem]
    })
    let newStudentData = {...currentStudent, balance: newBalance, purchaseHistory: newPurchaseHistory}
    console.log("data to be added " + JSON.stringify(newStudentData.purchaseHistory));
    await setDoc(doc(db, "children", currentStudent.id), newStudentData);
    return newStudentData;
  }


  const handleCheckout = () => {
    if (totalAmount > currentStudent.balance) {
      setErrorHeading("Error");
      setErrorMessage("Insufficient Funds");
      setErrorMessageShown(true);
      setTimeout(() => {
        setErrorMessageShown(false)
      }, 5000);
      return;
    }
    else if (totalAmount == 0) {
      setErrorHeading("Error");
      setErrorMessage("Please add some item to cart before checking out");
      setErrorMessageShown(true);
      setTimeout(() => {
        setErrorMessageShown(false)
      }, 5000);
      return;
    }
    for(let i = 0; i < receiptItems.length; i++) {
      let currentItem = receiptItems[i];
      for(let j = 0; j < currentItem.allergens.length; j++) {
        let currentAllergy = currentItem.allergens[j];
        for(let k = 0; k < currentStudent.allergies.length; k++) {
          let currentStudentAllergy = currentStudent.allergies[k];
          if (currentAllergy == currentStudentAllergy) {
            setErrorHeading("Careful!");
            setErrorMessage(`${currentStudent.name} is not allowed to buy ${currentItem.itemName} due to ${currentAllergy} allergy!`)
            setErrorMessageShown(true);
            setTimeout(() => {
              setErrorMessageShown(false)
            }, 5000);
            console.log("not allowed due to " + currentAllergy + " allergy")
            return;
          }
          
        }
      }
    }
    successfulCheckout().then((val) => {
      setSuccessfulPurchaseMsgShown(true);
      setReceiptItems([]);
      setTotalAmount(0)
      console.log("new data" + JSON.stringify(val))
    }).catch((err) => {
      console.log(err);
    });
  }


  const fetchAllProducts = async () => {
    let pastriesProducts = [];
    let snacksProducs = [];
    let drinksProducts = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      if (doc.data().category === "Pastries") {
        pastriesProducts = [...pastriesProducts, doc.data()];
      } else if (doc.data().category === "Snacks & Sweets") {
        snacksProducs = [...snacksProducs, doc.data()];
      } else if (doc.data().category === "Drinks") {
        drinksProducts = [...drinksProducts, doc.data()];
      }
    });
    return {
      pastries: pastriesProducts,
      snacks: snacksProducs,
      drinks: drinksProducts,
    };
  };

  useEffect(() => {
    fetchStudentData();
    fetchAllProducts()
      .then((promise) => {
        setProducts(promise);
        setIsLoading(false);
        console.log("promise " + JSON.stringify(promise));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return isLoading ? (
    <LoadingScreen isLoading={isLoading}/>
  ) : (
    <div className="purchasePageContainer">
      {approvalModalShown? (
        <div className="modalContainer">
            <PopupStudentApprovalPage setApprovalModalShown={setApprovalModalShown} newStudentData={newStudentData}/>
        </div>
      ) : null
      }

      {
        successfulPurchaseMsgShown?
        <div className="modalContainer">
        <SuccessfulPurchasePopup amount={totalAmount.toString()} setSuccessfulPurchaseMsgShown={setSuccessfulPurchaseMsgShown}/>
      </div>:null
        
      }

{
        errorMessageShown?
        <div className="errorMessageContainer">
        <PopupErrorMessage errorHeading={errorHeading} errorMessage={errorMessage}/>
      </div>:null
        
      }

      <div className="backgroundCoinBackCircle"></div>
      <div className="availableBalanceContainer">
        <img
          src={require("../assets/coinImage.png")}
          alt=""
          className="coinImage"
        />
        <p className="availableBalance">{`${currentStudent.balance} SR`}</p>
      </div>
      <div className="searchContainer">
        <input
          type="text"
          name="search"
          placeholder="Search for student"
          className="searchInputField"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <div className="searchIconButton" onClick={handleSearch}>
          <img src={require("../assets/searchIconButton.png")} alt="" />
        </div>
      </div>
      <div className="headerContainer">
        <div className="childInfoContainer">
          <div className="imgContainer">
            <img
              src={require("../assets/sampleBoyImage.png")}
              alt=""
              className="childImage"
            />
          </div>
          <div className="otherInfoContainer">
            <p className="childName">{currentStudent.name}</p>
            <div className="childAllergiesIconsContainer">
              <img
                src={require("../assets/restricedPeanuts.png")}
                alt=""
                className="allergyRestrictIcon"
              />
              <img
                src={require("../assets/restricedCitrus.png")}
                alt=""
                className="allergyRestrictIcon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mainContentContainer">
        <div className="productsSectionContainer">
          <p className="mainSectionTitle">Products</p>
          <div className="productCategorySection">
            <div className="categoryTitleContainer">
              <p className="categoryTitle">Pastries</p>
            </div>
            <div className="categoryProductsContainer">
              {products.pastries.map((product, index) => {
                if (index % 4 == 0 && index != 0) {
                  return (
                    <ProductCard
                      productData={product}
                      key={product.name}
                      receiptItems={receiptItems}
                      setReceiptItems={setReceiptItems}
                      setTotalAmount={setTotalAmount}
                      rightMargin={23}
                    ></ProductCard>
                  );
                }
                return (
                  <ProductCard
                    productData={product}
                    key={product.name}
                    receiptItems={receiptItems}
                    setReceiptItems={setReceiptItems}
                    setTotalAmount={setTotalAmount}
                  ></ProductCard>
                );
              })}
            </div>
          </div>
          <div className="productCategorySection">
            <div className="categoryTitleContainer">
              <p className="categoryTitle">Snacks & Sweets</p>
            </div>
            <div className="categoryProductsContainer">
              {products.snacks.map((product, index) => {
                if (index % 4 == 0 && index != 0) {
                  return (
                    <ProductCard
                      productData={product}
                      key={product.name}
                      receiptItems={receiptItems}
                      setReceiptItems={setReceiptItems}
                      setTotalAmount={setTotalAmount}
                      rightMargin={23}
                    ></ProductCard>
                  );
                }
                return (
                  <ProductCard
                    productData={product}
                    key={product.name}
                    receiptItems={receiptItems}
                    setReceiptItems={setReceiptItems}
                    setTotalAmount={setTotalAmount}
                  ></ProductCard>
                );
              })}
            </div>
          </div>
          <div className="productCategorySection">
            <div className="categoryTitleContainer">
              <p className="categoryTitle">Drinks</p>
            </div>
            <div className="categoryProductsContainer">
              {products.drinks.map((product, index) => {
                if (index % 4 == 0 && index != 0) {
                  return (
                    <ProductCard
                      productData={product}
                      key={product.name}
                      receiptItems={receiptItems}
                      setReceiptItems={setReceiptItems}
                      setTotalAmount={setTotalAmount}
                      rightMargin={23}
                    ></ProductCard>
                  );
                }
                return (
                  <ProductCard
                    productData={product}
                    key={product.name}
                    receiptItems={receiptItems}
                    setReceiptItems={setReceiptItems}
                    setTotalAmount={setTotalAmount}
                  ></ProductCard>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mainSectionDivider"></div>
        <div className="receiptSectionContainer">
          <p className="mainSectionTitle receiptTitle">Receipt</p>
          <div className="receiptItemsContainer">
            {receiptItems.map((item, index) => {
              return (
                <ReceiptItem
                  item={item}
                  key={index}
                  receiptItems={receiptItems}
                  setReceiptItems={setReceiptItems}
                  setTotalAmount={setTotalAmount}
                />
              );
            })}
          </div>
          <div className="receiptDivider"></div>
          <div className="totalContainer">
            <p className="totalAmountTitle">Total Price</p>
            <div className="totalAmountContainer">
              <img
                src={require("../assets/coinImage.png")}
                alt=""
                className="totalCoinImage"
              />
              <p className="totalAmountText">{totalAmount}</p>
            </div>
          </div>
          <div className="checkoutButtonContainer">
            <div className="checkoutButton" onClick={handleCheckout}>
              <p className="checkoutText">Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
