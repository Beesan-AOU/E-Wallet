import React, { Component } from 'react';
import BalanceAddedModal from '../components/balanceAddedModal';
import PopupStudentApprovalPage from '../components/popupStudentApprovalScreen';
import ProductCard from '../components/productCard';

function ComponentTesting() {
    return ( 
        <div className="componentTestingContainer" style={{backgroundColor: "white", width: "100vw", height: "100vh"}}>
            {/* <BalanceAddedModal></BalanceAddedModal> */}
            <PopupStudentApprovalPage/>
        </div>
     );
}

export default ComponentTesting;