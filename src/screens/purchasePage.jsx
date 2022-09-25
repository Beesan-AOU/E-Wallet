import React, { Component } from "react";
import "../styles/purchasePage.css";
import ProductCard from "../components/productCard";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../App";
import { useState } from "react";
import ReceiptItem from "../components/receiptItem";
import { doc, getDoc } from "firebase/firestore";
import PopupStudentApprovalPage from "../components/popupStudentApprovalScreen";
import LoadingScreen from "../components/LoadingScreen";


function PurchasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [receiptItems, setReceiptItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [approvalModalShown, setApprovalModalShown] = useState(false);

  const handleSearch = async () => {
    const docRef = doc(db, "children", searchQuery);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setApprovalModalShown(true);
    } else {
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
        <div className="approvalModalContainer">
            <PopupStudentApprovalPage/>
        </div>
      ) : null}
      <div className="backgroundCoinBackCircle"></div>
      <div className="availableBalanceContainer">
        <img
          src={require("../assets/coinImage.png")}
          alt=""
          className="coinImage"
        />
        <p className="availableBalance">50 SR</p>
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
            <p className="childName">Lina Ahmad</p>
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
            <div className="checkoutButton">
              <p className="checkoutText">Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
