import React, { Component } from 'react';

import "../styles/editChildInfoPage.css";


function EditChildInfoPage() {
    return ( 
        <div className="editChildInfoPageContainer">
            <div className="pageHeader">
                <div className="childImageNameContainer">
                    <div className="childImgContainer">
                        {/* <img src={require("../assets/sampleBoyImage.png")} alt="" className='childImage'/> */}
                    </div>
                    <p className='childName'>Lina Ahmad</p>
                </div>
                <div className="childBalanceContainer">
                    <img src={require("../assets/coinImage.png")} alt="" />
                    <p className='childBalanceText'>0 SR</p>
                </div>
            </div>
            <div className="inputContainer">
                <p className='inputGroupHeader'>Health Assets</p>
                <div className="healthAssetsContainer">
                    <div className="genderAgeContainer labelInputContainer">
                        <div className="genderContainer">
                            <p className='inputLabel'>Gender</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default EditChildInfoPage;