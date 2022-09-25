import React, { Component } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import "../styles/loadingScreen.css";
function LoadingScreen(props) {
    const {isLoading} = props;
    return ( 
        <div className="loadingContainer">
            <ScaleLoader color={"#36d7b7"} loading={isLoading} size={25}/>
        </div>
     );
}

export default LoadingScreen;