import React, { Component } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DepositPopup from "../components/depositPopup";
import BalanceAddedModal from "../components/balanceAddedModal";
import { HiZoomIn } from "react-icons/hi";
import { HiZoomOut } from "react-icons/hi";

import "../styles/editChildInfoPage.css";
import { useEffect } from "react";

import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../App";

import AvatarEditor from "react-avatar-editor";

function EditChildInfoPage() {
  var editor = "";
  

  const handleCheckBoxEvents = (event) => {
    //in case the user checks a checkbox
    if (event.target.checked) {
      if (event.target.name == "other") {
        //handle other allergies here
      } else {
        if (!allergies.includes(event.target.name)) {
          setAllergies([...allergies, event.target.name]);
        }
      }
    }
    //in case the user unchecks a checkbox
    else {
      if (event.target.name == "other") {
        //handle other allergies here
      } else {
        if (allergies.includes(event.target.name)) {
          setAllergies(
            [...allergies].filter((item) => {
              return item !== event.target.name;
            })
          );
        }
      }
    }
  };
  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleSave = (e) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const tempCroppedImg = canvasScaled.toDataURL();
      console.log("URL is " + croppedImg);
      setCroppedImg(tempCroppedImg);
      setIsAvatarEditorShown(false);
    }
  };
  // const [picture, setPicture] = useState({
  //   cropperOpen: false,
  //   img: null,
  //   zoom: 2,
  //   croppedImg:
  //     "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
  // });
  const { state } = useLocation();
  const navigate = useNavigate();
  const [croppedImg, setCroppedImg] = useState("");
  const [diseasesFound, setDiseasesFound] = useState(state.diseasesFound);
  console.log("diseases found = " + diseasesFound);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStudent, setCurrentStudent] = useState();
  const [studentBalance, setStudentBalance] = useState();
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState();
  const [diseases, setDiseases] = useState([]);
  const [zoomValue, setZoomValue] = useState(1);
  const [isValidated, setIsValidated] = useState(true);
  const [allergies, setAllergies] = useState([]);
  const [otherAllergies, setOtherAllergies] = useState();
  const [contact1Relation, setContact1Relation] = useState();
  const [contact1FullName, setContact1FullName] = useState();
  const [contact1MobileNumber, setContact1MobileNumber] = useState();
  const [contact2Relation, setContact2Relation] = useState();
  const [contact2FullName, setContact2FullName] = useState();
  const [contact2MobileNumber, setContact2MobileNumber] = useState();
  const [isDepositModalShown, setIsDepositModalShown] = useState(false);
  const [isAmountAddedModalShown, setIsAmountAddedModalShown] = useState(false);
  const [addedAmount, setAddedAmount] = useState(0);
  const [isAvatarEditorShown, setIsAvatarEditorShown] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  console.log(allergies);
  console.log("current student data " + JSON.stringify(currentStudent));
  const fetchStudentData = async () => {
    const docRef = doc(db, "children", state.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const uploadStudentData = async () => {
    const newStudentData = {
      ...currentStudent,
      height: height,
      weight: weight,
      image: croppedImg,
      diseasesFound: diseasesFound,
      diseases: diseases,
      allergies: allergies,
      emergencyContacts: [
        {
          fullName: contact1FullName,
          mobileNumber: contact1MobileNumber,
          relation: contact1Relation,
        },
        {
          fullName: contact2FullName,
          mobileNumber: contact2MobileNumber,
          relation: contact2Relation,
        },
      ],
    };
    await setDoc(doc(db, "children", state.id), newStudentData);
  };

  const initializeState = (val) => {
    setHeight(val.height);
    setWeight(val.weight);
    setDiseasesFound(val.diseasesFound);
    setDiseases(val.diseases);
    setAllergies(val.allergies);
    setStudentBalance(val.balance);
    console.log("contacts: " + JSON.stringify(val.emergencyContacts));
    val.emergencyContacts.forEach((contact, index) => {
      if (index == 0) {
        setContact1Relation(contact.relation);
        setContact1FullName(contact.fullName);
        setContact1MobileNumber(contact.mobileNumber);
      } else if (index == 1) {
        setContact2Relation(contact.relation);
        setContact2FullName(contact.fullName);
        setContact2MobileNumber(contact.mobileNumber);
      }
    });
  };
  useEffect(() => {
    if (!(window.localStorage.getItem("isLoggedIn") == "true")) {
      navigate("/");
    }
    if (window.localStorage.getItem("accountType") == "school") {
      navigate("/search");
    }
    fetchStudentData()
      .then((val) => {
        setCurrentStudent(val);
        initializeState(val);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!diseasesFound) {
      setDiseases("");
    }
  }, [diseasesFound]);

  return isLoading ? null : (
    <div className="overallContainer">
      {isAvatarEditorShown ? (
        <div className="avatarEditorContainer">
          <div className="avatarEditorContent">
            <p className="editingImageText">Editing Image</p>
            <div className="sectionDivider"></div>
            <div className="avatarEditor">
              <AvatarEditor
                image={selectedImage}
                width={250}
                height={250}
                border={50}
                color={[0, 0, 0, 0.6]} // RGBA
                scale={zoomValue}
                rotate={0}
                ref={setEditorRef}
              />

              <div className="inputSliderContainer">
                <HiZoomIn size={30} />
                <input
                  type="range"
                  min={"0.05"}
                  max={"2"}
                  step={"0.01"}
                  orient="vertical"
                  onChange={(event) => {
                    setZoomValue(event.target.value);
                  }}
                />
                <HiZoomOut size={30} />
              </div>
            </div>

            <div className="optionsRow">
              <div className="cancelButtonContainer optionButtonContainer" onClick={() => {
                setIsAvatarEditorShown(false);
                setZoomValue(1);
                setSelectedImage("");
              }}>
                <p className="optionButtonText">Cancel</p>
              </div>
              <div className="confirmButtonContainer optionButtonContainer" onClick={(event)=> {
                handleSave();
              }}>
                <p className="optionButtonText">Confirm</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isDepositModalShown ? (
        <div className="depositModal">
          <DepositPopup
            studentID={state.id}
            setIsDepositModalShown={setIsDepositModalShown}
            setIsAmountAddedModalShown={setIsAmountAddedModalShown}
            setAddedAmount={setAddedAmount}
            studentBalance={studentBalance}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
            setStudentBalance={setStudentBalance}
          />
        </div>
      ) : null}
      {isAmountAddedModalShown ? (
        <div className="depositModal">
          <BalanceAddedModal
            setIsAmountAddedModalShown={setIsAmountAddedModalShown}
            addedAmount={addedAmount}
          />
        </div>
      ) : null}
      <div className="editChildInfoPageContainer">
        <div className="pageHeader">
          <div className="childImageNameContainer">
            <div className="childImgContainer">
              <img
                src={croppedImg != ""? croppedImg: currentStudent.image != ""? currentStudent.image: currentStudent.gender == "male"? require("../assets/default-boy-image.png"): require("../assets/default-girl-image.png")}
                alt=""
                className="childImage"
              />

              <div className="imageOverlay">
                <input
                  id="file-input"
                  type="file"
                  // value={null}
                  name="myImage"
                  accept="image/png, image/jpeg"
                  className="tempImageFile"
              //     onClick={(event)=> { 
              //       event.target.value = null
              //  }}
                  onChange={(event) => {
                    setIsAvatarEditorShown(true);
                    console.log("file is " + JSON.stringify(event.target.files[0]));
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                <label for="file-input" className="fileLabel imageOverlay">
                  <img src={require("../assets/Camera.png")} alt="" />
                </label>
              </div>
            </div>
            <p className="childName_Edit">{state.name}</p>
          </div>
          <div className="childBalanceContainer">
            <img src={require("../assets/coinImage.png")} alt="" />
            <p className="childBalanceText">{studentBalance} SR</p>
            <img
              src={require("../assets/addBalanceIconButton.png")}
              alt=""
              className="addBalanceIconButton"
              onClick={() => {
                setIsDepositModalShown(true);
              }}
            />
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
                    value={height}
                    className="inputField numericInputField"
                    onChange={(event) => {
                      const currentValue = event.target.value;
                      if (
                        (currentValue > 0 && currentValue < 200) ||
                        currentValue == ""
                      ) {
                        setHeight(currentValue);
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
                    value={weight}
                    className="inputField numericInputField"
                    onChange={(event) => {
                      const currentValue = event.target.value;
                      if (
                        (currentValue > 0 && currentValue < 200) ||
                        currentValue == ""
                      ) {
                        setWeight(currentValue);
                      }
                    }}
                  />
                  <p className="measurementUnit">kgs</p>
                </div>
              </div>
            </div>
            <div className="diseaseContainer labelInputContainer">
              <div className="diseasesContainer">
                <p className="inputLabel">Disease/s found</p>
                <select
                  name="diseases"
                  id="diseases"
                  className="dropDownMenu diseaseDropdown"
                  onChange={(event) => {
                    if (event.target.value == "no") {
                      setDiseasesFound(false);
                    } else if (event.target.value == "yes") {
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
              {diseasesFound ? (
                <div className="diseasesContainer">
                  <input
                    type={"text"}
                    value={diseases}
                    className="inputField diseasesInput"
                    placeholder="Ex: Blood Sugar"
                    onChange={(event) => {
                      setDiseases(event.target.value);
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
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
                      checked={allergies.includes("peanuts")}
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
                      checked={allergies.includes("citrus")}
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
                      checked={allergies.includes("diary")}
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
                      name="gluten"
                      checked={allergies.includes("gluten")}
                      onChange={(event) => {
                        handleCheckBoxEvents(event);
                      }}
                      className="checkboxInput"
                    />
                  </div>
                  <div className="allergyCardContainer">
                    <div className="allergyIconContainer">
                      <img src={require("../assets/gluten.png")} alt="" />
                    </div>
                    <div className="allergyTextContainer">
                      <p className="allergyText">Gluten</p>
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
                />{" "}
              </div>
              <div className="ageContainer">
                <p className="inputLabel">Department</p>
                <input
                  type={"text"}
                  className="inputField numericInputField"
                  disabled
                  value={state.department}
                />{" "}
              </div>
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
                    value={contact1Relation}
                    onChange={(event) => {
                      setContact1Relation(event.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Relation
                    </option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                  </select>

                  <input
                    type={"text"}
                    className="inputField contactInput"
                    placeholder="Full Name"
                    value={contact1FullName}
                    onChange={(event) => {
                      setContact1FullName(event.target.value);
                    }}
                  />
                  <input
                    type={"text"}
                    value={contact1MobileNumber}
                    className="inputField contactInput"
                    placeholder="Mobile Number"
                    onChange={(event) => {
                      const mobileNumber = event.target.value;
                      if (
                        ((Number(mobileNumber) || mobileNumber == "0") &&
                          ((mobileNumber.startsWith("05") &&
                            mobileNumber.length > 1) ||
                            (mobileNumber.startsWith("0") &&
                              mobileNumber.length == 1)) &&
                          mobileNumber.length <= 10) ||
                        mobileNumber == ""
                      ) {
                        setContact1MobileNumber(mobileNumber);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="contact2Container">
                <p className="inputLabel">Contact 2</p>
                <div className="contactInfoContainer">
                  <select
                    name="contact2Relation"
                    id="contact2Relation"
                    className="dropDownMenu relationMenu"
                    value={contact2Relation}
                    onChange={(event) => {
                      setContact2Relation(event.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Relation
                    </option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                  </select>

                  <input
                    type={"text"}
                    className="inputField contactInput"
                    placeholder="Full Name"
                    value={contact2FullName}
                    onChange={(event) => {
                      setContact2FullName(event.target.value);
                    }}
                  />
                  <input
                    type={"tel"}
                    className="inputField contactInput"
                    placeholder="Mobile Number"
                    value={contact2MobileNumber}
                    onChange={(event) => {
                      const mobileNumber = event.target.value;
                      if (
                        ((Number(mobileNumber) || mobileNumber == "0") &&
                          ((mobileNumber.startsWith("05") &&
                            mobileNumber.length > 1) ||
                            (mobileNumber.startsWith("0") &&
                              mobileNumber.length == 1)) &&
                          mobileNumber.length <= 10) ||
                        mobileNumber == ""
                      ) {
                        setContact2MobileNumber(mobileNumber);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="flexButtonContainer"
            onClick={() => {
              uploadStudentData()
                .then((res) => {
                  navigate("/home");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <div className="saveButtonContainer">
              <p className="saveText">Save</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChildInfoPage;
