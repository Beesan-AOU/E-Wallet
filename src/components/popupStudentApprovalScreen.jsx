import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/popupStudentApprovalScreen.css"
function PopupStudentApprovalPage(props) {
    const navigate = useNavigate();

    const handleDecline = () => {
        props.setApprovalModalShown(false);
    }

    const handleApprove = () => {
        navigate("/purchase", {state: props.approvalModalData});
        props.setApprovalModalShown(false);

    }



    return ( 
        <div className="popupStudentApprovalPage">
            <img src={require("../assets/popupSearchApprpvalPageLeftBgPart.png")} alt="" className="popupLeftBgPart" />
            <img src={require("../assets/popupSearchApprpvalPageRightBgPart.png")} alt="" className="popupRightBgPart" />
            <div className="popupMainContentContainer">
                <div className="popupChildImageContainer">
                    <img src={props.approvalModalData.image != ""? props.approvalModalData.image: props.approvalModalData.gender == "male"? require("../assets/default-boy-image.png"): require("../assets/default-girl-image.png")} alt="" className="popupChildImage" />
                </div>
                <p className="popupChildName">{props.approvalModalData.name}</p>
                <input type="text" className='popupInputField' disabled value={props.approvalModalData.id}/>
                <div className="popupActionButtonsContainer">
                    <div className="popupApproveButtonContainer" onClick={handleApprove}>
                        <p className="popupActionButtonText" >
                            Approve
                        </p>
                    </div>
                    <div className="popupDeclineButtonContainer" onClick={handleDecline}>
                        <p className="popupActionButtonText">
                            Decline
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default PopupStudentApprovalPage;