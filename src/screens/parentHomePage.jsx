import React, { Component } from "react";
import { useEffect } from "react";
import { auth, db } from "../App";
import AdsSection from "../components/adsSection";
import CalenderAd from "../components/calenderAd";
import ChildCard from "../components/childCard";
import MathAd from "../components/mathAd";
import "../styles/parentHomePage.css";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { prodErrorMap, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { async } from "@firebase/util";
import PurchaseHistroy from "../components/purchaseHistroy";

function ParentHomePage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchaseHistroyShown, setIsPurchaseHistoryShown] = useState(false);
  const [historyChildData, setHistoryChildData] = useState();
  const fetchUserData = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("user data not on database");
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  const fetchChildren = async (childrenArray) => {
    var tempChildrenArray = [];
    console.log("children " + JSON.stringify(childrenArray));
    for (let i = 0; i < childrenArray.length; i++) {
      const childDoc = childrenArray[i];
      const docSnap = await getDoc(childDoc);
      if (docSnap.exists()) {
        tempChildrenArray = [...tempChildrenArray, docSnap.data()];
        console.log(
          "tempChildrenArray after adding" + JSON.stringify(tempChildrenArray)
        );
      } else {
        console.log("user data not on database");
      }
    }
    setChildren(tempChildrenArray);
  };
  useEffect(() => {
    if (!(window.localStorage.getItem("isLoggedIn") == "true")) {
      navigate("/");
    }
    if (window.localStorage.getItem("accountType") == "school") {
      navigate("/search");
    }
    console.log("hello");
    const user = auth.currentUser;
    if (user) {
      fetchUserData(user)
        .then((fetchedUserData) => {
          //user data exists therefore we have to check the user type and navigate to the appropriate screen\
          if (fetchedUserData.userType == "parent") {
            setUserData(fetchedUserData);
            fetchChildren(fetchedUserData.children)
              .then((sucess) => {
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
            // //   .then((fetchedChildrenData) => {
            // //     setChildren(fetchedChildrenData);
            // //     console.log("fetched childrens" + JSON.stringify(fetchedChildrenData))
            // //     setIsLoading(false);
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
          } else if (fetchedUserData.userType == "school") {
            navigate("/search");
          }
          //debugging message
          console.log("Document data:", fetchedUserData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/");
    }
  }, []);

  return isLoading ? (
    <div></div>
  ) : (
    <div className="overallContainer">
      {isPurchaseHistroyShown ? (
        <div className="purchaseHistory">
          <PurchaseHistroy
            childData={historyChildData}
            setIsPurchaseHistoryShown={setIsPurchaseHistoryShown}
          />
        </div>
      ) : null}
      <div className="parentHomePageContainer">
        <div className="upperContentContainer">
          <div className="headerContainer">
            <div className="parentInfoContainer">
              <div className="parentImage"></div>
              <div className="welcomingTextContainer">
                <h1 className="welcomingText">
                  Hello,{" "}
                  <span className="welcomingText parentText">
                    {userData.name}
                  </span>
                </h1>
              </div>
            </div>
            <p
              className="logoutText"
              onClick={() => {
                logout()
                  .then((val) => {
                    navigate("/");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Log out
            </p>
          </div>
          {children.map((childData) => {
            console.log("childData: " + JSON.stringify(childData));
            return (
              <ChildCard
                childData={childData}
                key={childData.id}
                setIsPurchaseHistoryShown={setIsPurchaseHistoryShown}
                setHistoryChildData={setHistoryChildData}
              />
            );
          })}
        </div>
        <AdsSection />
        <div className="footerContainer">
          <img
            src={require("../assets/ParentHomePageLowerBgPart.png")}
            alt=""
            className="parentHomePageLowerBgPart"
          />
          <div className="footerSocials">
            <p className="footerText">Find us on</p>
            <div className="socialsContainer">
              <img
                src={require("../assets/instagramLogo.png")}
                alt=""
                className="socialLogo"
              />
              <div className="socialLogoContainer">
                <img
                  src={require("../assets/twitterLogo.png")}
                  alt=""
                  className="socialLogo"
                />
              </div>
              <div className="socialLogoContainer">
                <img
                  src={require("../assets/whatsappLogo.png")}
                  alt=""
                  className="socialLogo"
                />
              </div>
            </div>
          </div>
          <div className="footerLocationInfo">
            <img
              src={require("../assets/locationIcon.png")}
              alt=""
              className="locationImage"
            />
            <div className="locationInfo">
              <p className="locationText">www.uis.com</p>
              <p className="locationText">King fahad Rd, Riyadh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentHomePage;
