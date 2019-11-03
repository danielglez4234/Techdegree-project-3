
$('#name').focus(); //when the page loads the input name is focused

//------------------------------------Job Role-----------------------------------------
$('#other-title').hide();

$('#title').on('change', function() { //when you choose other in the select an input appears
 const chosenJob = event.target.value;
 if (chosenJob === 'other') {
   $('#other-title').show().focus();
 }else {
   $('#other-title').hide();
 }
});
//------------------------------------End Job Role-------------------------------------

//------------------------------------T-Shirt Info-----------------------------------------
$('#design option:first').attr('disabled', true).addClass('is-hidden'); //disable the option 'select theme'
$('label[for="color"]').text('Please select a T-shirt theme'); //change the color label to 'Please select a T-shirt theme'
const $selectColors = $('#color');
$selectColors.hide(); //hide the select of 'Color'
const $optionColors = $('#color option');


function selectAndChange(selected, index){ //function to display the matching colors
  let firstSelected = []; //array where colors are inserted
  if (selected) {
    firstSelected = $optionColors.eq(index).removeClass('is-hidden'); //matching colors are displayed and inserted in the array
    $optionColors.eq(3).attr('selected', true);
    $optionColors.eq(0).attr('selected', false);
  }else{
    firstSelected = $optionColors.eq(index).addClass('is-hidden'); //those who don't match hide
    $optionColors.eq(0).attr('selected', true);
    $optionColors.eq(3).attr('selected', false);
  }
}

$('#design').on('change', function() { //choose a color and the select appears with the colors of that design
const chosenDesign = event.target.value;

    $('#color option').each(function(index){ //loop over #color 'option' to compare them all
      $('label[for="color"]').text('Color'); //replace the name 'Please select a T-shirt theme' to 'Color'
      $selectColors.show(); //show the select of 'color'
      const $TextColors = $optionColors.eq(index).text(); //save the input text of each one to test what design they belong to
        if (chosenDesign === 'js puns') {
          jsPuns = /\b(\w*JS\sPuns\w*)\b/.test($TextColors); //test to find out what colors belong to each design
          selectAndChange(jsPuns, index);
        }else if (chosenDesign === 'heart js') {
          jsHeart = /\b(\w*JS\sshirt\w*)\b/.test($TextColors);
          selectAndChange(jsHeart, index);
        }
    });
});
//------------------------------------End T-Shirt Info-------------------------------------

//------------------------------------Register for Activities------------------------------
const $inputCheckbox = $('.activities');

function printTotal(totalds){ //print the total in 'activities'
  const $totalElement = $('<p class="cost">$'+ totalds +'<p>');
    $('.cost').remove();
    $inputCheckbox.append($totalElement);
    $('.cost').fadeOut(5).fadeIn();
}

function disabledconflict(inputClicked, disable){ //disable the matching input
  const dataDayAndTime = $(inputClicked).attr('data-day-and-time');

  $('.activities input').each(function(index){ //go through all the inputs in search of a match
    const $conflictingData = $('.activities input');
    //compare the date and day and if the input that was selected is in 'disable'
    if (dataDayAndTime ===  $conflictingData.eq(index).attr('data-day-and-time') && disable) {
      $conflictingData.eq(index).attr('disabled',true);
      $(inputClicked).attr('disabled',false);
    //if the selected input is deselected the matching input is deselected
    }else if (dataDayAndTime ===  $conflictingData.eq(index).attr('data-day-and-time') && !disable) {
      $conflictingData.eq(index).attr('disabled',false);
    }

  });
}

let totalCost = 0;
$inputCheckbox.on('change', function(event){ //event listener when we select a checkbox
  const inputClicked = event.target;
  const dataCost = parseInt($(inputClicked).attr('data-cost').substr(1)); // select data cost excluding '$'

  if($(inputClicked).is(':checked')){ //if the input is selected
      totalCost = totalCost + dataCost;
      printTotal(totalCost);
      disabledconflict(inputClicked, disable = true);
      $($errorCheckbox).hide(); //prevents the error from jumping when it should not
  }else{
      totalCost = totalCost - dataCost;
      printTotal(totalCost);
      disabledconflict(inputClicked, disable = false);
      if (totalCost === 0) { //if the total gives 0 hides
          $('.cost').slideUp(150);
      }
    }
});
//------------------------------------End Register for Activities--------------------------

//------------------------------------Payment Info-----------------------------------------
$('#payment option:first').attr('disabled', true).addClass('is-hidden'); //we disable the 'select method' option
$('#payment option').eq(1).attr('selected', true); //select 'credit card' option
const $creaditCart = $('#credit-card');
const $payPal = $('#paypal').hide();
const $bitcoin = $('#bitcoin').hide();
$('#payment').on('change', function() { //depending on which option is chosen its respective section appears
 const chosenPaymentInfo = event.target.value;
 if (chosenPaymentInfo === 'Credit Card') {
   $creaditCart.slideDown();
   $payPal.slideUp();
   $bitcoin.slideUp();
 }else if (chosenPaymentInfo === 'PayPal') {
   $creaditCart.slideUp();
   $payPal.slideDown();
   $bitcoin.slideUp();
 }else if (chosenPaymentInfo === 'Bitcoin') {
   $creaditCart.slideUp();
   $payPal.slideUp();
   $bitcoin.slideDown();
 }
});
//------------------------------------End Payment Info-------------------------------------

//------------------------------------Regex And Error messages-----------------------------
regex = {
  name:/^[a-zA-Z ]{3,40}$/,
  email:/[^@]+@[^@.]+\.[a-z]+$/i,
  cardNumber:/^\d{13,16}$/,
  zipCode:/^\d{5}$/,
  cvv:/^\d{3}$/
}

// creating and attachinga corresponding error message for each section

const $errorName = $('<div class="contein_error_message"><div class="error_message">The Name cannot contain less than 3 to 40 characters <br> and any number \'0-9\' or special character \'$%&\'</div></div>');
$('#name').after($errorName);
$($errorName).hide();

const $errorEmail_1 = $('<div class="contein_error_message"><div class="error_message">The Email field cannot be Empty</div></div>');
const $errorEmail_2 = $('<div class="contein_error_message"><div class="error_message">Enter a valid email format, example: mail@mail.com</div></div>');
$('#mail').after($errorEmail_1).after($errorEmail_2);
$($errorEmail_1).hide();
$($errorEmail_2).hide();

const $errorCheckbox = $('<div class="contein_error_message"><div class="error_message">You have to check at least one activity</div></div>');
$('.activities').after($errorCheckbox);
$($errorCheckbox).hide();

const $errorCardNumber = $('<div class="contein_error_message"><div class="error_message">The Card Number must contain 13 to 16 numbers</div></div>');
const $errorZip = $('<div class="contein_error_message"><div class="error_message">The Zip Code must contain 5 numbers</div></div>');
const $errorCVV = $('<div class="contein_error_message"><div class="error_message">The CVV must contain 3 numbers</div></div>');
$('#cc-num').after($errorCardNumber);
$('#zip').after($errorZip);
$('#cvv').after($errorCVV);
$($errorCardNumber).hide();
$($errorZip).hide();
$($errorCVV).hide();

const submitError = $('<div class="error_message_submit">An error has occurred, check that all fields are correctly filled</div>');
$('button').before(submitError);
$(submitError).hide();
//------------------------------------End Regex And Error messages-------------------------

//------------------------------------Validation Functions---------------------------------
//function that tests if the name, credit card, zip and cvv are correct
function validateNameCardZipCvv(validateText, regexType, errorMessage, inputNameCardZipCv){
  const testingField = regexType.test(validateText);
  if (!testingField) {
    $(errorMessage).fadeIn(150);
    inputNameCardZipCv.attr('style', '');
  }else {
    inputNameCardZipCv.attr('style', 'border-color:#e2e277');
    $(errorMessage).fadeOut(150);
  }
  return testingField; //is returned for use when the 'register' button is pressed
}
//email has two different errors so it is placed in another function
function validateEmail(validateEMAIL){
  let validEmail = false;
  const testingField = regex.email.test(validateEMAIL);
  if (!testingField) { //if it doesn't match
    $($errorEmail_2).fadeIn(150);
    $($errorEmail_1).fadeOut(0);
    $('#mail').attr('style', '');
  }else {
    $($errorEmail_2).fadeOut(150);
    $($errorEmail_1).fadeOut(150);
    $('#mail').attr('style', 'border-color:#e2e277');
  }
  if(validateEMAIL === ''){ // if the email input in empty
    console.log(validateEMAIL);
    $('#mail').attr('style', '');
    $($errorEmail_1).fadeIn(150);
    $($errorEmail_2).fadeOut(0);
  }
  return testingField; //is returned for use when the 'register' button is pressed
}
//check if at least one checkbox is selected
function validateCheckbox(){
  let validCheckbox = false;
  $('.activities input').each(function(index){ //if one is selected it returns true
    if ($('.activities input').is(':checked')) {
      validCheckbox = true;
      return validCheckbox;
    }
  });
  return validCheckbox; //is returned for use when the 'register' button is pressed
}
//------------------------------------End Validation Functions-----------------------------

//------------------------------------Error Messages Event Listeners-----------------------

// In this section we place an event listener to each of the inputs so that the errors are displayed in real time
// select the input, the value of the input and send the corresponding regex to the function
$('#name').on('input', function(){
  const nameText = $('#name').val();
  const nameInput = $('#name');
  validateNameCardZipCvv(nameText, regex.name, $errorName, nameInput);
});
$('#mail').on('input', function(){
  const emailText = $('#mail').val();
  validateEmail(emailText);
});
$('#cc-num').on('input', function(){
  const cc_numText = $('#cc-num').val();
  const cc_numinput = $('#cc-num');
  validateNameCardZipCvv(cc_numText, regex.cardNumber, $errorCardNumber, cc_numinput);
});
$('#zip').on('input', function(){
  const zipText = $('#zip').val();
  const zipinput = $('#zip');
  validateNameCardZipCvv(zipText, regex.zipCode, $errorZip, zipinput);
});
$('#cvv').on('input', function(){
  const cvvText = $('#cvv').val();
  const cvvinput = $('#cvv');
  validateNameCardZipCvv(cvvText, regex.cvv, $errorCVV, cvvinput);
});

//add an event listener to the form so that at the time it is sent compare all the inputs to check if they are all correct
$('form').on('submit', function(event){
  //we call and save the functions to check if they give the value true or false
  const validName = validateNameCardZipCvv($('#name').val(), regex.name, $errorName, $('#name'));
  const validEmail = validateEmail($('#mail').val());
  const validCheckbox = validateCheckbox();
  const validCardNumber = validateNameCardZipCvv($('#cc-num').val(), regex.cardNumber, $errorCardNumber, $('#cc-num'));
  const validZip = validateNameCardZipCvv($('#zip').val(), regex.zipCode, $errorZip, $('#zip'));
  const validCVV = validateNameCardZipCvv($('#cvv').val(), regex.cvv, $errorCVV, $('#cvv'));

  //if at least one returns 'false' the form is not sent
  if (!validName || !validEmail || !validCheckbox){
    event.preventDefault();
    //The activity section error is only shown when the form tries to send
    if (!validCheckbox ) {
      $($errorCheckbox).show();
    }
    $(submitError).fadeIn(200);
  }
  // the payment section is only validated if it is displayed
  if ($('#payment').val() === 'Credit Card') {
    if (!validCardNumber || !validZip || !validCVV) {
      event.preventDefault();
      $(submitError).fadeIn(200);
    }
  }
});
//------------------------------------End Error Messages Event Listeners-------------------
