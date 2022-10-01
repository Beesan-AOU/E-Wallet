import React, { Component } from 'react';
import "../styles/popupErrorMessage.css";
function PopupErrorMessage(props) {
    return ( 
    <div className="alertContainer">
        <div class="alert alert-danger" role="alert">
            <div className="headingContainer">
                <h4 class="alert-heading">{props.headingMessage}</h4>
            </div>
            <p>{props.errorMessage}</p>
            {/* <hr/>
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p> */}
        </div>
    </div>

     );
}

export default PopupErrorMessage;