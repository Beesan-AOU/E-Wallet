import React, { Component } from 'react';
import { useState } from 'react';
import "../styles/productCard.css";
export const computeTotal = (receiptItems, setTotalAmount) => {
    let total = 0;
    for(let i = 0; i < receiptItems.length; i++) {
        let tempItem = receiptItems[i]
        total += tempItem.totalPrice;
    }
    setTotalAmount(total);
}
function ProductCard(props) {
    const [quantity, setQuantity] = useState(1);
    const { productData } = props;
    const { receiptItems } = props;
    const { setReceiptItems } = props;
    const { setTotalAmount } = props;
    const {rightMargin} = props;
    const {itemHasRestrictedAllergy} = props;



    console.log("productData" + JSON.stringify(productData))
    return ( 
        <div className="productCardContainer" style={rightMargin != undefined? {marginRight: rightMargin}: {}}>
            <div className="productInfoContainer">
                <div className="allergiesIconsContainer">
                {(productData != undefined) && productData.image != ""? 
                productData.allergens.map((allergy) => {
                    return <img src={require(`../assets/${allergy}_small.png`)} alt="" className="smallAllergyIcon" />
                })
                : null}
                </div>
                <div className="productImageContainer">
                <img src={productData != undefined? productData.image: null} alt="" className="productImage" />
                </div>
                <p className="productName">{productData != undefined? productData.name: null}</p>
                <div className="priceContainer">
                    <img src={require("../assets/coinImage.png")} alt="" className="productCoinImage" />
                    <p className="priceText">{productData != undefined? productData.price: null}</p>
                </div>
            </div>
            <div className="quantityControllerContainer">
                <div className="quantityControllerElement" onClick={() => {
                    if (quantity != 1) {
                        setQuantity(quantity - 1);
                    }
                }}>
                    <p className="quantityControllerElementText">-</p>
                </div>
                <div className="quantityContainer">
                    <p className="quantityText">{quantity}</p>
                </div>
                <div className="quantityControllerElement" onClick={() => {
                    if (quantity != 9) {
                        setQuantity(quantity + 1);
                    }
                }}>
                    <p className="quantityControllerElementText">+</p>
                </div>

            </div>
            <div className="addToCartButton" onClick={()=> {
                if (!itemHasRestrictedAllergy(productData)) {
                    let itemFound = false;
                    let newArray = [];
    
                    for (let i = 0; i < receiptItems.length; i++) {
                        let tempItem = receiptItems[i];
                        if (tempItem.itemName == productData.name) {
                            itemFound = true;
                            let newQuantity = quantity + tempItem.quantity;
                            let itemMap = {
                                quantity: newQuantity,
                                itemName: productData.name,
                                totalPrice: newQuantity * productData.price,
                                allergens: productData.allergens,
                                image: productData.image
                            }
                            newArray = [...receiptItems, itemMap].filter((reduceItem) => {
                                return reduceItem != tempItem;
                            })
                        }
                    }
                    if (!itemFound) {
                        let itemMap = {
                            quantity: quantity,
                            itemName: productData.name,
                            totalPrice: quantity * productData.price,
                            allergens: productData.allergens,
                            image: productData.image
                        }
                        newArray = [...receiptItems, itemMap]
                        
                    }
                    setReceiptItems(newArray);
                    computeTotal(newArray, setTotalAmount);
                    window.scrollTo(0, 0)
                }
                }
}>
                <p className="productAddToCartText">Add To Cart</p>
            </div>
        </div>
     );
} 

export default ProductCard;