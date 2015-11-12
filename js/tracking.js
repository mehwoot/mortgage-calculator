function ga(command, type, category, action, label) {
  console.log("Category: " + category + " Action: " + action + " Label: " + label);
}

/*
  This holds the information that will be used to fire events on actions.
  The key is the id of the form field that is triggering the event.
  The first value of the array is a function that will calculate the value to send as the "Label".
  The second value is the value that will be sent at "Action" - a Human readable name for the field.
  The third value is the id of the field that it is implied is also filled out if this one is, assuming
    that field has not previously been filled out.  This ensures fields that have default values that could
    be skipped over will still fire events if subsequent fields have been filled out.
  The fourth value is the name of the javascript event to trigger the GA event on.
*/
var completionFunctions = {"mortgageReason" : [function(){return $("#mortgageReason").val()}, "Mortgage Reason", null, "change"],
                          "initialSum" : [function(){return $("#initialSum").val()}, "Initial Sum", null, "focousout"],
                          "goingTo" : [function(){return $("#goingTo").val()}, "Purchase Reason", null, "change"],
                          "goingToRF" : [function(){return $("#goingToRF").val()}, "Purchase Reason", null, "change"],
                          "firstHomeBuyer" : [function(){return $("#firstHomeBuyer").is(":checked") ? "Yes" : "No"}, "First Home Buyer", "goingTo", "change"],
                          "State" : [function(){return $("#State").val()}, "State", "firstHomeBuyer", "change"],
                          "propertyType" : [function(){return $("#propertyType").val()}, "Property Type", "State", "change"],
                          "propertyValue" : [function(){return $("#propertyValue").val()}, "Property Value", "propertyType", "focusout"],
                          "interestRate" : [function(){return $("#interestRate").val()}, "Interest Rate", null, "focusout"],
                          "loanPeriod" : [function(){return $("#loanPeriod").val()}, "Loan Period", null, "focusout"],
                          "loanStructure" : [function(){return $("#loanStructure").val()}, "Loan Structure", null, "change"],
                          "interestRateRF" : [function(){return $("#interestRateRF").val()}, "Interest Rate", "goingTo", "focusout"],
                          "loanPeriodRF" : [function(){return $("#loanPeriodRF").val()}, "Loan Period", null, "focusout"],
                          "loanStructureRF" : [function(){return $("#loanStructureRF").val()}, "Refinance Loan Structure", null, "change"],
                          "borrowAmountRF" : [function(){return $("#borrowAmountRF").val()}, "Refinance Borrow Amount", "loanStructureRF", "focusout"],
                          "homebuyer-results-button" : [function(){return ""}, "Clicked Calculate", "loanStructure", "click"]}

var firedCompletions = {}

function fireCompletion(id) {
  var fieldInfo = completionFunctions[id];
  if (fieldInfo != undefined) {
    ga("send", "event", "Mortgage Repayment Calculator", fieldInfo[1], fieldInfo[0]());
    firedCompletions[id] = true;
    if (fieldInfo[2] != null && firedCompletions[fieldInfo[2]] == undefined) {
      fireCompletion(fieldInfo[2]);
    }
  }
}

$(document).ready(function () {
  $.each(completionFunctions, function(key, value) {
    $("#" + key).on(value[3], function() {
      fireCompletion($(this).attr("id"));
    });
  });
});
