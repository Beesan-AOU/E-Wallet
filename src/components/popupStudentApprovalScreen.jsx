import React from 'react'
import "../styles/popupStudentApprovalScreen.css"
function PopupStudentApprovalPage() {
    const handleDecline = () => {
        
    }



    return ( 
        <div className="popupStudentApprovalPage">
            <img src={require("../assets/popupSearchApprpvalPageLeftBgPart.png")} alt="" className="popupLeftBgPart" />
            <img src={require("../assets/popupSearchApprpvalPageRightBgPart.png")} alt="" className="popupRightBgPart" />
            <div className="popupMainContentContainer">
                <div className="popupChildImageContainer">
                    <img src={require("../assets/sampleBoyImage.png")} alt="" className="popupChildImage" />
                </div>
                <p className="popupChildName">Ahmad Ali</p>
                <input type="text" className='popupInputField' disabled value={"2MTEPW14"}/>
                <div className="popupActionButtonsContainer">
                    <div className="popupApproveButtonContainer">
                        <p className="popupActionButtonText">
                            Approve
                        </p>
                    </div>
                    <div className="popupDeclineButtonContainer">
                        <p className="popupActionButtonText" onClick={handleDecline}>
                            Decline
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default PopupStudentApprovalPage;