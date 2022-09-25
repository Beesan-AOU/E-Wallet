import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/studentApprovalPage.css";
function StudentApprovalPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleDecline = () => {
    navigate("/search");
  }
  const handleApproval = () => {
    navigate("/purchase");
  }

  return (
    <div className="studentApprovalPageContainer">
      <img
        src={require("../assets/approvalPageLeftBgPart.png")}
        alt=""
        className="approvalPageLeftBgPart"
      />
      <img
        src={require("../assets/approvalPageRightBgPart.png")}
        alt=""
        className="approvalPageRightBgPart"
      />
      <div className="mainContentContainer">
        <div className="studentImageContainer">
          <img src={require("../assets/sampleBoyImage.png")} alt="" className="studentImage"/>
        </div>
        <p className="approvalStudentName">{state.name}</p>
        <input
          type={"text"}
          className="inputField approvalInputField"
          disabled
          value={state.id}
        />

        <div className="actionButtonsContainer">
            <div className="approvalActionButton approvalButton">
                <p className="approvalActionButtonText" onClick={handleApproval}>Approval</p>
            </div>
            <div className="approvalActionButton declineButton" onClick={handleDecline}>
                <p className="approvalActionButtonText">Decline</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StudentApprovalPage;
