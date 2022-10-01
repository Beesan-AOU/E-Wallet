import React, { Component } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "../styles/editChildInfoPage.css";

function EditChildInfoPage() {

  const handleCheckBoxEvents = (event) => {
    //in case the user checks a checkbox
    if (event.target.checked) {
        if (event.target.name == "other") {
            //handle other allergies here
        }
        else {
            if (!(allergies.includes(event.target.name))) {
                setAllergies([...allergies, event.target.name]);
            }
        }
    }
    //in case the user unchecks a checkbox
    else {
        if (event.target.name == "other") {
            //handle other allergies here
        }
        else {
            if ((allergies.includes(event.target.name))) {
                setAllergies([...allergies].filter((item) => {
                    return item !== event.target.name;
                }));
            }
        }
    }
  }


  const { state } = useLocation();
  const [diseasesFound, setDiseasesFound] = useState(state.diseasesFound);
  console.log("diseases found = " + diseasesFound)
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [diseases, setDiseases] = useState([]);
  const [isValidated, setIsValidated] = useState(true);
  const [allergies, setAllergies] = useState([]);
  const [otherAllergies, setOtherAllergies] = useState();
  const [contact1Relation, setContact1Relation] = useState();
  const [contact1FullName, setContact1FullName] = useState();
  const [contact1MobileNumber, setContact1MobileNumber] = useState();
  const [contact2Relation, setContact2Relation] = useState();
  const [contact2FullName, setContact2FullName] = useState();
  const [contact2MobileNumber, setContact2MobileNumber] = useState();


  console.log(allergies)
  return (
    <div className="editChildInfoPageContainer">
      <div className="pageHeader">
        <div className="childImageNameContainer">
          <div className="childImgContainer">
            <img src={require("../assets/sampleBoyImage.png")} alt="" className='childImage'/>
            <div className="imageOverlay">
                <img src={require("../assets/Camera.png")} alt="" />
            </div>
          </div>
          <p className="childName">{state.name}</p>
        </div>
        <div className="childBalanceContainer">
          <img src={require("../assets/coinImage.png")} alt="" />
          <p className="childBalanceText">{state.balance} SR</p>
          <img src={require("../assets/addBalanceIconButton.png")} alt="" className="addBalanceIconButton" />
        </div>
      </div>
      <div className="inputContainer">
        <p className="inputGroupHeader">Health Assets</p>
        <div className="healthAssetsContainer">
          <div className="genderAgeContainer labelInputContainer">
            <div className="genderContainer">
              <p className="inputLabel">Gender</p>
              <input
                type={"text"}
                className="inputField numericInputField"
                disabled
                value={state.gender}
              />

              {
                //not needed
                /* <select name="gender" id="gender" className='dropDownMenu'>
                                <option value="" disabled selected>Select child gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select> */
              }
            </div>
            <div className="ageContainer">
              <p className="inputLabel">Age</p>
              <input
                type={"text"}
                className="inputField numericInputField"
                disabled
                value={`${state.age} years`}
              />
              {/* 
Not Needed
                            <select name="age" id="age" className='dropDownMenu'>
                                <option value="" disabled selected>Select child age</option>
                                <option value="male">5 Years</option>
                                <option value="male">6 Years</option>
                                <option value="female">7 Years</option>
                                <option value="male">8 Years</option>
                                <option value="female">9 Years</option>
                                <option value="male">10 Years</option>
                                <option value="female">11 Years</option>
                                <option value="male">12 Years</option>
                                <option value="female">13 Years</option>
                            </select> */}
            </div>
          </div>
          <div className="heightWeightContainer labelInputContainer">
            <div className="genderContainer">
              <p className="inputLabel">Height</p>
              <div className="measurementInputContainer">
              <input
                type={"number"}
                min={80}
                className="inputField numericInputField"
                onChange={(value) => {
                  if (value < 80 || value > 160) {
                    setIsValidated(false);
                    setHeight(value);
                  }
                }}
              />
                <p className="measurementUnit">cm</p>

              </div>
   
            </div>
            <div className="ageContainer">
              <p className="inputLabel">Weight</p>
              <div className="measurementInputContainer">
              <input
                type={"number"}
                className="inputField numericInputField"
                onChange={(value) => {
                  setWeight(value);
                }}
              />
              <p className="measurementUnit">kgs</p>
              </div>

            </div>
          </div>
          <div className="diseaseContainer labelInputContainer">
            <div className="genderContainer">
              <p className="inputLabel">Disease/s found</p>
              <select
                name="age"
                id="age"
                className="dropDownMenu diseaseDropdown"
                onChange={(event) => {
                    if (event.target.value == "no") {
                        setDiseasesFound(false);
                    }
                    else if (event.target.value == "yes") {
                        setDiseasesFound(true);
                    }
                }}
              >
                {diseasesFound ? (
                  <option value="no">No</option>
                ) : (
                  <option value="no" selected>
                    No
                  </option>
                )}
                {diseasesFound ? (
                  <option value="yes" selected>
                    Yes
                  </option>
                ) : (
                  <option value="yes">Yes</option>
                )}
              </select>
            </div>
            {
            diseasesFound? <div className="ageContainer">
              <input
                type={"text"}
                className="inputField diseasesInput"
                placeholder="Ex: Blood Sugar"
              />
            </div> : <div></div>
            
            }
          </div>

          <div className="allergiesContainer labelInputContainer">
            <div className="allergiesCol1">
              <p className="inputLabel">Allergies</p>
              <div className="allergyContainer upperCard">
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    name="peanuts"
                    className="checkboxInput"
                    onChange={(event) => {
                        handleCheckBoxEvents(event);
                        console.log(event);
                    }}
                  />
                </div>
                <div className="allergyCardContainer">
                  <div className="allergyIconContainer">
                    <img src={require("../assets/peanuts.png")} alt="" />
                  </div>
                  <div className="allergyTextContainer">
                    <p className="allergyText">Peanuts</p>
                  </div>
                </div>
              </div>
              <div className="allergyContainer">
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    name="citrus"
                    onChange={(event) => {
                        handleCheckBoxEvents(event);
                        console.log(event);
                    }}
                    className="checkboxInput"
                  />
                </div>
                <div className="allergyCardContainer">
                  <div className="allergyIconContainer">
                    <img src={require("../assets/citrus.png")} alt="" />
                  </div>
                  <div className="allergyTextContainer">
                    <p className="allergyText">Citrus</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="allergiesCol2">
              <div className="allergyContainer upperCard">
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    name="diary"
                    onChange={(event) => {
                        handleCheckBoxEvents(event);
                        console.log(event);
                    }}
                    className="checkboxInput"
                  />
                </div>
                <div className="allergyCardContainer">
                  <div className="allergyIconContainer">
                    <img src={require("../assets/diary.png")} alt="" />
                  </div>
                  <div className="allergyTextContainer">
                    <p className="allergyText">Diary</p>
                  </div>
                </div>
              </div>
              <div className="allergyContainer">
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    name="other"
                    onChange={(event) => {
                        handleCheckBoxEvents(event);
                        console.log(event);
                    }}
                    className="checkboxInput"
                  />
                </div>
                <div className="allergyCardContainer">
                  <div className="allergyOtherInputContainer">
                    <input
                      type={"text"}
                      className="inputField otherAlergies"
                      placeholder="Other"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="inputGroupHeader">School Assets</p>
        <div className="schoolAssetsContainer">
          <div className="gradeSectionContainer labelInputContainer">
            <div className="gradeContainer">
              <p className="inputLabel">Grade</p>
              <input
                type={"text"}
                className="inputField numericInputField"
                disabled
                value={`Grade ${state.grade}`}
              />
              {/*
              Not needed here
              <select name="gender" id="gender" className="dropDownMenu">
                <option value="" disabled selected>
                  Select child gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select> */}
            </div>
            <div className="ageContainer">
              <p className="inputLabel">Section</p>
              <input
                type={"text"}
                className="inputField numericInputField"
                disabled
                value={state.section}
              />
              {/* 
              Not Needed Here
              <select name="age" id="age" className="dropDownMenu">
                <option value="" disabled selected>
                  Select child age
                </option>
                <option value="male">5 Years</option>
                <option value="male">6 Years</option>
                <option value="female">7 Years</option>
                <option value="male">8 Years</option>
                <option value="female">9 Years</option>
                <option value="male">10 Years</option>
                <option value="female">11 Years</option>
                <option value="male">12 Years</option>
                <option value="female">13 Years</option>
              </select> */}
            </div>
          </div>
          <div className="heightWeightContainer labelInputContainer">
            <div className="genderContainer">
              <p className="inputLabel">Supervisor</p>
              <input
                type={"text"}
                className="inputField numericInputField"
                disabled
                value={state.supervisor}
              />            </div>
            <div className="ageContainer">
              <p className="inputLabel">Department</p>
              <input
                type={"text"}
                className="inputField numericInputField"
                disabled
                value={state.department}
              />            </div>
          </div>
        </div>

        <p className="inputGroupHeader">Emergency Contacts</p>
        <div className="emergencyContactsContainer">
          <div className="contactSectionContainer labelInputContainer">
            <div className="contact1Container">
              <p className="inputLabel">Contact 1</p>
              <div className="contactInfoContainer">
                <select
                  name="contactRelation"
                  id="contactRelation"
                  className="dropDownMenu relationMenu"
                  onChange={(event)=> {
                    setContact1Relation(event.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Relation
                  </option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                </select>

                <input
                  type={"text"}
                  className="inputField contactInput"
                  placeholder="Full Name"
                  onChange={(event) => {
                    setContact1FullName(event.target.value);
                  }}
                />
                <input
                  type={"tel"}
                  className="inputField contactInput"
                  placeholder="Mobile Number"
                  onChange={(event) => {
                    setContact1MobileNumber(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="contact2Container">
              <p className="inputLabel">Contact 2</p>
              <div className="contactInfoContainer">
                <select
                  name="contactRelation"
                  id="contactRelation"
                  className="dropDownMenu relationMenu"
                  onChange={(event)=> {
                    setContact2Relation(event.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Relation
                  </option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                </select>

                <input
                  type={"text"}
                  className="inputField contactInput"
                  placeholder="Full Name"
                  onChange={(event) => {
                    setContact2FullName(event.target.value);
                  }}
                />
                <input
                  type={"tel"}
                  className="inputField contactInput"
                  placeholder="Mobile Number"
                  onChange={(event) => {
                    setContact2MobileNumber(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flexButtonContainer">
          <div className="saveButtonContainer">
            <p className="saveText">Save</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChildInfoPage;
