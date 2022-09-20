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
import { prodErrorMap } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { async } from "@firebase/util";

function ParentHomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUserData = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("user data not on database");
    }
  };
  const fetchChildren = async (childrenArray) => {
    const tempChildrenArray = [];
    console.log("children " + JSON.stringify(childrenArray));
    childrenArray.forEach(async (childID) => {
      const docRef = doc(db, "children", childID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("adding" + JSON.stringify(docSnap.data()))
        setChildren([...tempChildrenArray,docSnap.data()]);
        console.log("tempChildrenArray after adding" + JSON.stringify(tempChildrenArray))
      } else {
        console.log("user data not on database");
      }
    });
    console.log("returned Array" + JSON.stringify(tempChildrenArray));
    setChildren(tempChildrenArray);
    //return tempChildrenArray;
  };
  useEffect(() => {
    console.log("hello");
    const user = auth.currentUser;
    if (user) {
      fetchUserData(user)
        .then((fetchedUserData) => {
            setIsLoading(false);
          //user data exists therefore we have to check the user type and navigate to the appropriate screen\
          if (fetchedUserData.userType == "parent") {
            setUserData(fetchedUserData);
            // fetchChildren(fetchedUserData.children).then((sucess) => {
            //     setIsLoading(false);
            // }).catch((err) => {console.log(err)});
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

  return ( 
    isLoading? <div></div>:
    <div className="parentHomePageContainer">
      <div className="headerContainer">
        <div className="parentInfoContainer">
          <div className="parentImage"></div>
          <div className="welcomingTextContainer">
            <h1 className="welcomingText">
              Hello, {" "}
              <span className="welcomingText parentText">{userData.name}</span>
            </h1>
          </div>
        </div>
        <p className="logoutText">Log out</p>
      </div>
      {
        userData.children.map((childData) => {
            console.log("childData: " + JSON.stringify(childData))
            return (
                <ChildCard childData={childData} key={childData.name}/>
            )
        })
      }     
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
  );
}

export default ParentHomePage;
