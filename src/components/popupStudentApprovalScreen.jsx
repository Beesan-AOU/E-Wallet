import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/popupStudentApprovalScreen.css"
function PopupStudentApprovalPage(props) {
    const navigate = useNavigate();

    const handleDecline = () => {
        props.setApprovalModalShown(false);
    }

    const handleApprove = () => {
        navigate("/purchase", {state: props.newStudentData});
        props.setApprovalModalShown(false);

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
                        <p className="popupActionButtonText" onClick={handleApprove}>
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