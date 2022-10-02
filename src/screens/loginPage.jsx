import { signInWithEmailAndPassword } from "firebase/auth";
import React, { Component } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../App";
import "../styles/loginPage.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

function LoginScreen() {
  let navigate = useNavigate();
  const { state } = useLocation();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOverlayLoading, setIsOverlayLoading] = useState("")
  const handleUserLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (userCredential) => {
        setErrorMessage("");
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //user data exists therefore we have to check the user type and navigate to the appropriate screen\
            if (docSnap.data().userType == state.loginType) {
              window.localStorage.setItem("isLoggedIn", true)
              if (state.loginType == "parent") {
                navigate("/home");
              }
              else if (state.loginType == "school") {
                navigate("/search");
              }
            }
            else {
              setErrorMessage("User Not Found");
            }
        } else {
          setErrorMessage("User Not Found");
        }
      })
      .catch((error) => {
        setErrorMessage(error.code);
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("User not found");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect Password");
            break;
          case "auth/network-request-failed":
            setErrorMessage("Please make sure you have a valid internet connection")
          default:
            setErrorMessage("Unknown Error Occured Please Try Again");
            console.log(error.code);
            break;
        }
      });
  };

  return (
    <div className="loginSceenContainer">
      <img src={require("../assets/ABC.png")} alt="" className="ABCImage" />
      <img
        src={require("../assets/bottomClouds.png")}
        alt=""
        className="bottomCloudsImage"
      />
      <div className="leftBgPartContainer">
        <img
          src={require("../assets/loginPageLeftBgPart.png")}
          alt=""
          className="LeftBgPartImage"
        />
      </div>
      <form className="formContentContainer" onSubmit={handleUserLogin}>
        <img
          src={require("../assets/" + state.loginType + "ChoiceImage.png")}
          alt=""
          className="formImage"
        />
        <input
          required
          type="email"
          name="email"
          id="email"
          className="FormInputField-mid"
          placeholder="Enter your username"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          required
          type="password"
          name="password"
          id="password"
          className="FormInputField-mid loginPasswordInputField"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <div className="forgotPasswordContainer">
          <p className="forgotPasswordText">Forgot password?</p>
        </div>
        <input type="submit" value="Sign in" className="signInButton" />
        <p className="errorMessage">{errorMessage}</p>
      </form>
    </div>
  );
}

export default LoginScreen;
