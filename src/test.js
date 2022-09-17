var api_validateOTP = botContext.getBotVariable("api_ValidateOTP");
var api_validateOTP_json = JSON.parse(api_validateOTP.jsonData);
var data = api_validateOTP_json.api_ValidateOTP.data;
botContext.printDebugMessage("JSON DATA: "+ JSON.stringify(data));
if(api_validateOTP_json && api_validateOTP_json.api_ValidateOTP.isSuccess == true) {
  var visit_list = [
    {
      "type": "text",
      "tag": "title",
      "text": botContext.getBotVariable("txtMsgLab_Test_VisitTitle_EN")
      //"test": "test"
    }
  ];
  for(var i=0; i<=data.length -1 ; i++) {
    var currentVisitObject = data[i];
    //botContext.sendMessage("currentVisitDate: " + currentVisitObject.visitDate);
    //var tempDateFormatList = currentVisitObject.visitDate.split("T");
    //botContext.sendMessage("tempDateFormatList: " + tempDateFormatList);
   // var tempDateNumsList = tempDateFormatList[0].split("-");
    //var visitFormatedDate = "";
    //for (var i = 2; i >= 0; i--) {
    //visitFormatedDate += tempDateNumsList[i];
      //if (i != 0) {
       // visitFormatedDate += "/";
      //}
    //}
    //visitFormatedDate.substring(0, visitFormatedDate.length - 1);
    //visitFormatedDate += " " + tempDateFormatList[1].substring(0,5);

    //var visitFormatedDate = tempDateFormatList[0] + " " + tempDateFormatList[2].substring(0,5);
    //botContext.sendMessage("visitFormatDate: " + visitFormatedDate);
    
    
    visit_list.push({
      "type": "button",
      "title": "Visit #" + currentVisitObject.visitNumber,
      //"subtitle": "subtitle", // data[i].visitDate.replace("T", " ").split(".")[0],
      "click": {
        "actions": [
          {
            "type": "publishText",
            "text": "Visit #" + currentVisitObject.visitNumber //+ data[i].visitNumber
          }
        ]
      }
    });
  }
  var templateVisitListJson = {
    "type": "vertical",
    "tag": "list",
    "elements": [
      {
        "type": "vertical",
        "elements": [
          {
            "type": "text",
             
            "text": botContext.getBotVariable("txtMsgLab_Test_Visit_EN"),
            "tag": "title"
          },
          {
            "type": "text",
            "text": "Please select from your Visit",
            "tag": "subtitle"
          },
          {
            "type": "text",
            "text": "",
            "tag": "footer"
          },
          {
            "type": "button",
            "tag": "menu",
            "title": botContext.getBotVariable("VisitsBtnEN"),
            "click": {
              "actions": [
                {
                  "type": "publishText",
                  "text": botContext.getBotVariable("VisitsBtnEN")
                }
              ]
            }
          },
          {
            "type": "horizontal",
            "elements": [
              {
                "type": "vertical",
                "elements": visit_list
              }
            ]
          }
        ]
      }
    ]
  };
  botContext.printDebugMessage(JSON.stringify(templateVisitListJson));
  botContext.setBotVariable("templateVisitListJson", JSON.stringify(templateVisitListJson), true, false);
  botContext.setTriggerNextMessage('1.1.4-Lab_Test_Visit');
} else {
  botContext.sendMessage("Invalid OTP, Please Try Again"); 
  botContext.setTriggerNextMessage('1.1.3-LabResults_OTP');
}