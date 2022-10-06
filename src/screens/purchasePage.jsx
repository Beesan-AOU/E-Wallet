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
import { useLocation, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import SuccessfulPurchasePopup from "../components/successfulPurchasePopup";
import PopupErrorMessage from "../components/popupErrorMessage";
import ScaleLoader from "react-spinners/ScaleLoader";
import { signOut } from "firebase/auth";


function PurchasePage() {
  const { state } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [receiptItems, setReceiptItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [approvalModalShown, setApprovalModalShown] = useState(false);
  const [successfulPurchaseMsgShown, setSuccessfulPurchaseMsgShown] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(state);
  const [errorHeading, setErrorHeading] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  let newStudentData = {}

  const fetchStudentData = () => {
    onSnapshot(doc(db, "children", state.id), (doc) => {
      setCurrentStudent(doc.data());
  });
  }

  const logout = async () => {
    await signOut(auth);
  }

  const handleSearch = async () => {
    const docRef = doc(db, "children", searchQuery);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setApprovalModalShown(true);
      setSearchQuery("");
      newStudentData = docSnap.data();
    } else {
      //add error (student doesnt exist)
    }
  }

  const successfulCheckout = async () => {
    setIsOverlayLoading(true);
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

  const itemHasRestrictedAllergy = (item) => {
    console.log("current item is: " + JSON.stringify(item));
    for(let j = 0; j < item.allergens.length; j++) {
      let currentAllergy = item.allergens[j];
      for(let k = 0; k < currentStudent.allergies.length; k++) {
        let currentStudentAllergy = currentStudent.allergies[k];
        if (currentAllergy == currentStudentAllergy) {
          setErrorHeading("Careful!");
          setErrorMessage(`${currentStudent.name} is not allowed to buy ${item.name} due to ${currentAllergy} allergy!`)
          setErrorMessageShown(true);
          setTimeout(() => {
            setErrorMessageShown(false)
          }, 5000);
          console.log("not allowed due to " + currentAllergy + " allergy")
          return true;
        }
        
      }
    }
    return false;
  }



  const allergyFound = () => {
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
            return true;
          }
          
        }
      }
    }
    return false;
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
    if(!allergyFound()) {
      successfulCheckout().then((val) => {
        setIsOverlayLoading(false);
        setSuccessfulPurchaseMsgShown(true);
        setReceiptItems([]);
        console.log("new data" + JSON.stringify(val))
      }).catch((err) => {
        console.log(err);
      });
    }
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
    if (!(window.localStorage.getItem("isLoggedIn") == "true")) {
        navigate("/");
    }
} , [])
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
        <SuccessfulPurchasePopup amount={totalAmount.toString()} setSuccessfulPurchaseMsgShown={setSuccessfulPurchaseMsgShown} setTotalAmount={setTotalAmount}/>
      </div>:null
        
      }

{
        errorMessageShown?
        <div className="errorMessageContainer">
        <PopupErrorMessage errorHeading={errorHeading} errorMessage={errorMessage}/>
      </div>:null
        
      }
{
        isOverlayLoading?
        <LoadingScreen isLoading={isOverlayLoading}/>
        :null
        
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
      <div className="logoutTextContainer" onClick={()=> {
        logout().then(val => {
          navigate("/");
        }).catch(err => {
          console.log(err);
        })
      }}>
      <p className="logoutText">Log out</p>
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
          <img src={require("../assets/searchIconButton.png")} alt="" className="searchIcon"/>
        </div>
      </div>
      <div className="headerContainer">
        <div className="childInfoContainer">
          <div className="imgContainer">
            <img
              src={currentStudent.image != ""? currentStudent.image: currentStudent.gender == "male"? require("../assets/default-boy-image.png"): require("../assets/default-girl-image.png")}
              alt=""
              className="purchase-childImage"
            />
          </div>
          <div className="otherInfoContainer">
            <p className="childName">{currentStudent.name}</p>
            <div className="childAllergiesIconsContainer">
            {currentStudent.allergies.map((item, index) => {
              return (
                <img
                src={require("../assets/restricted_" + item + ".png")}
                alt=""
                className="allergyRestrictIcon"
              />
              );
            })}
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
                      itemHasRestrictedAllergy={itemHasRestrictedAllergy}
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
                    itemHasRestrictedAllergy={itemHasRestrictedAllergy}
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
                      itemHasRestrictedAllergy={itemHasRestrictedAllergy}
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
                    itemHasRestrictedAllergy={itemHasRestrictedAllergy}
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
                      itemHasRestrictedAllergy={itemHasRestrictedAllergy}
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
                    itemHasRestrictedAllergy={itemHasRestrictedAllergy}
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
