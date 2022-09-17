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
                            <select name="gender" id="gender" className='dropDownMenu'>
                                <option value="" disabled selected>Select child gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                        </div>
                        <div className="ageContainer">
                            <p className='inputLabel'>Age</p>
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
                            </select>

                        </div>
                    </div>
                    <div className="heightWeightContainer labelInputContainer">
                        <div className="genderContainer">
                            <p className='inputLabel'>Height</p>
                            <input type={"number"} className="inputField numericInputField"/>

                        </div>
                        <div className="ageContainer">
                            <p className='inputLabel'>Weight</p>
                            <input type={"number"} className="inputField numericInputField"/>
                        </div>
                        
                    </div>
                    <div className="diseaseContainer labelInputContainer">
                        <div className="genderContainer">
                            <p className='inputLabel'>Disease/s found</p>
                            <select name="age" id="age" className='dropDownMenu diseaseDropdown'>
                                <option value="no" selected>No</option>
                                <option value="yes">Yes</option>
                       
                            </select>
                        </div>
                        <div className="ageContainer">
                            <input type={"text"} className="inputField diseasesInput" placeholder='Ex: Blood Sugar'/>
                        </div>
                        
                    </div>


                    <div className="allergiesContainer labelInputContainer">
                        <div className="allergiesCol1">
                            <p className='inputLabel'>Allergies</p>
                            <div className="allergyContainer upperCard">
                                <div className="checkboxContainer">
                                <input type="checkbox" name="peanuts" id="" className='checkboxInput'/>

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
                                <input type="checkbox" name="citrus" id="" className='checkboxInput'/>

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
                                <input type="checkbox" name="diary" id="" className='checkboxInput'/>

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
                                <input type="checkbox" name="other" id="" className='checkboxInput'/>

                                </div>
                            <div className="allergyCardContainer">
                                <div className="allergyOtherInputContainer">
                                <input type={"text"} className="inputField otherAlergies" placeholder='Other'/>
                                </div>
                            </div>
                            </div> 
                        </div>

                        
                    </div>
                </div>


                <p className='inputGroupHeader'>School Assets</p>
                <div className="schoolAssetsContainer">
                    <div className="gradeSectionContainer labelInputContainer">
                        <div className="gradeContainer">
                            <p className='inputLabel'>Grade</p>
                            <select name="gender" id="gender" className='dropDownMenu'>
                                <option value="" disabled selected>Select child gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                        </div>
                        <div className="ageContainer">
                            <p className='inputLabel'>Section</p>
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
                            </select>

                        </div>
                    </div>
                    <div className="heightWeightContainer labelInputContainer">
                        <div className="genderContainer">
                            <p className='inputLabel'>Supervisor</p>
                            <input type={"number"} className="inputField numericInputField"/>

                        </div>
                        <div className="ageContainer">
                            <p className='inputLabel'>Department</p>
                            <input type={"number"} className="inputField numericInputField"/>
                        </div>
                        
                    </div>

                </div>

                <p className='inputGroupHeader'>Emergency Contacts</p>
                <div className="emergencyContactsContainer">
                    <div className="contactSectionContainer labelInputContainer">
                        <div className="contact1Container">
                            <p className='inputLabel'>Contact 1</p>
                            <div className="contactInfoContainer">
                            <select name="contactRelation" id="contactRelation" className='dropDownMenu relationMenu'>
                                <option value="" disabled selected>Relation</option>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="brother">Brother</option>
                                <option value="sister">Sister</option>
                            </select>

                            <input type={"text"} className="inputField contactInput" placeholder='Full Name'/>
                            <input type={"tel"} className="inputField contactInput" placeholder='Mobile Number'/>

                            </div>


                        </div>
                        <div className="contact2Container">
                            <p className='inputLabel'>Contact 2</p>
                            <div className="contactInfoContainer">
                            <select name="contactRelation" id="contactRelation" className='dropDownMenu relationMenu'>
                                <option value="" disabled selected>Relation</option>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="brother">Brother</option>
                                <option value="sister">Sister</option>
                            </select>

                            <input type={"text"} className="inputField contactInput" placeholder='Full Name'/>
                            <input type={"tel"} className="inputField contactInput" placeholder='Mobile Number'/>

                            </div>


                        </div>
                    </div>


                </div>
                <div className="flexButtonContainer">
                <div className="saveButtonContainer">
                    <p className='saveText'>Save</p>
                </div>
                </div>

            </div>
        </div>
     );
}

export default EditChildInfoPage;