import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/childCard.css"
function ChildCard(props) {
    const navigate = useNavigate();
    const { childData } = props;
    const {setIsPurchaseHistoryShown} = props;
    const {setHistoryChildData} = props;
    return ( 
        <div className="childCardContainer">
        <div className="cardContentContainer">
            <div className="parent-childInfoContainer">
                <h1 className='cardChildName cardText'>{childData.name}</h1>
                <div className="childBalanceContainer">
                    <div className="coinImage"></div>
                    <h1 className='childBalance cardText'>{childData.balance} SR</h1>
                </div>
            </div>
            {childData.image == ""? childData.gender == "male"? <img src={require("../assets/default-boy-image.png")} alt="" className='default-image'/>:<img src={require("../assets/default-girl-image.png")} alt="" className='default-image'/>: <div className="childImageContainer">
</div>}
        </div>
        <div className="parent-actionButtonsContainer">
            <div className="editIconContainer homeIcon" onClick={() => {
                navigate("/edit", {state: childData });
            }}>
            </div>
            <div className="historyIconContainer homeIcon" onClick={()=> {
                setHistoryChildData(childData);
                setIsPurchaseHistoryShown(true);
            }}>

            </div>
        </div>
        </div>

     );
}

export default ChildCard;