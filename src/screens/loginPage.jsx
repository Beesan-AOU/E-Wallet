import { signInWithEmailAndPassword } from "firebase/auth";
import React, { Component } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../App";
import "../styles/loginPage.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

function LoginScreen() {
  let navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
            if (docSnap.data().userType == "parent") {
                navigate("/home");
            }
            else if (docSnap.data().userType == "school") {
                navigate("/search");
            }
          console.log("Document data:", docSnap.data());
        } else {
          setErrorMessage("User Not Found on Database");
        }


        console.log("user signed in");
        console.log(userCredential);
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
          src={require("../assets/parentChoiceImage.png")}
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
          className="FormInputField-mid"
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
