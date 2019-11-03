
$('#name').focus();

//------------------------------------Job Role-----------------------------------------
$('#other-title').hide();

$('#title').on('change', function() {
 const chosenJob = event.target.value;
 if (chosenJob === 'other') {
   $('#other-title').show().focus();
 }else {
   $('#other-title').hide();
 }
});
//------------------------------------End Job Role-------------------------------------

//------------------------------------T-Shirt Info-----------------------------------------
$('#design option:first').attr('disabled', true).addClass('is-hidden');
$('label[for="color"]').text('Please select a T-shirt theme');
const $selectColors = $('#color');
$selectColors.hide();
const $optionColors = $('#color option');


function selectAndChange(selected, index){
  let firstSelected = []; // array where colors are inserted
  if (selected) {
    firstSelected = $optionColors.eq(index).removeClass('is-hidden'); // matching colors are displayed and inserted in the array
    $optionColors.eq(3).attr('selected', true);
    $optionColors.eq(0).attr('selected', false);
  }else{
    firstSelected = $optionColors.eq(index).addClass('is-hidden'); // those who don't match hide
    $optionColors.eq(0).attr('selected', true);
    $optionColors.eq(3).attr('selected', false);
  }
}

$('#design').on('change', function() {
const chosenTShirt = event.target.value;

    $('#color option').each(function(index){ // loop over #color 'option'
      $('label[for="color"]').text('Color'); // replace the name 'Please select a T-shirt theme' to 'Color'
      $selectColors.show(); // show the dropdown
      const $showColors = $optionColors.eq(index).text(); // save the input text
        if (chosenTShirt === 'js puns') {
          jsPuns = /\b(\w*JS\sPuns\w*)\b/.test($showColors); // test to find out what colors belong to each design
          selectAndChange(jsPuns, index);
        }else if (chosenTShirt === 'heart js') {
          jsHeart = /\b(\w*JS\sshirt\w*)\b/.test($showColors);
          selectAndChange(jsHeart, index);
        }
    });
});
//------------------------------------End T-Shirt Info-------------------------------------

//------------------------------------Register for Activities------------------------------
const $inputCheckbox = $('.activities');

function printTotal(totalds){
  const $totalElement = $('<p class="cost">$'+ totalds +'<p>');
    $('.cost').remove();
    $inputCheckbox.append($totalElement);
    $('.cost').fadeOut(5).fadeIn();
}
function disabledconflict(inputClicked, disable){
  const dataDayAndTime = $(inputClicked).attr('data-day-and-time');

  $('.activities input').each(function(index){
    const $conflictingData = $('.activities input');
    if (dataDayAndTime ===  $conflictingData.eq(index).attr('data-day-and-time') && disable) {
      $conflictingData.eq(index).attr('disabled',true);
      $(inputClicked).attr('disabled',false);
    }else if (dataDayAndTime ===  $conflictingData.eq(index).attr('data-day-and-time') && !disable) {
      $conflictingData.eq(index).attr('disabled',false);
    }

  });
}

let totalCost = 0;
$inputCheckbox.on('change', function(event){
  const inputClicked = event.target;
  const dataCost = parseInt($(inputClicked).attr('data-cost').substr(1));

  if($(inputClicked).is(':checked')){
      totalCost = totalCost + dataCost;
      printTotal(totalCost);
      disabledconflict(inputClicked, disable = true);
      $($errorCheckbox).hide();
  }else{
      totalCost = totalCost - dataCost;
      printTotal(totalCost);
      disabledconflict(inputClicked, disable = false);
      if (totalCost === 0) {
          $('.cost').slideUp(150);
      }
    }
});
//------------------------------------End Register for Activities--------------------------

//------------------------------------Payment Info-----------------------------------------
$('#payment option:first').attr('disabled', true).addClass('is-hidden');
$('#payment option').eq(1).attr('selected', true);
const $creaditCart = $('#credit-card');
const $payPal = $('#paypal').hide();
const $bitcoin = $('#bitcoin').hide();
$('#payment').on('change', function() {
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

regex = {
  name:/^[a-zA-Z ]{3,40}$/,
  email:/[^@]+@[^@.]+\.[a-z]+$/i,
  cardNumber:/^\d{13,16}$/,
  zipCode:/^\d{5}$/,
  cvv:/^\d{3}$/
}

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

function validateNameCardZipCvv(validateText, regexType, errorMessage, inputNameCardZipCv){
  const testingField = regexType.test(validateText);
  if (!testingField) {
    $(errorMessage).fadeIn(150);
    inputNameCardZipCv.attr('style', '');
  }else {
    inputNameCardZipCv.attr('style', 'border-color:#e2e277');
    $(errorMessage).fadeOut(150);
  }
  return testingField;
}
function validateEmail(validateEMAIL){
  let validEmail = false;
  const testingField = regex.email.test(validateEMAIL);
  if (!testingField) {
    $($errorEmail_2).fadeIn(150);
    $($errorEmail_1).fadeOut(0);
    $('#mail').attr('style', '');
  }else {
    $($errorEmail_2).fadeOut(150);
    $($errorEmail_1).fadeOut(150);
    $('#mail').attr('style', 'border-color:#e2e277');
  }
  if(validateEMAIL === ''){
    console.log(validateEMAIL);
    $('#mail').attr('style', '');
    $($errorEmail_1).fadeIn(150);
    $($errorEmail_2).fadeOut(0);
  }
  return testingField;
}

function validateCheckbox(){
  let validCheckbox = false;
  $('.activities input').each(function(index){
    if ($('.activities input').is(':checked')) {
      validCheckbox = true;
      return validCheckbox;
    }
  });
  return validCheckbox;
}

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



$('form').on('submit', function(event){
  const validName = validateNameCardZipCvv($('#name').val(), regex.name, $errorName, $('#name'));
  const validEmail = validateEmail($('#mail').val());
  const validCheckbox = validateCheckbox();
  const validCardNumber = validateNameCardZipCvv($('#cc-num').val(), regex.cardNumber, $errorCardNumber, $('#cc-num'));
  const validZip = validateNameCardZipCvv($('#zip').val(), regex.zipCode, $errorZip, $('#zip'));
  const validCVV = validateNameCardZipCvv($('#cvv').val(), regex.cvv, $errorCVV, $('#cvv'));

  if (!validName || !validEmail || !validCheckbox){
    event.preventDefault();
    if (!validCheckbox ) {
      $($errorCheckbox).show();
    }
    $(submitError).fadeIn(200);
  }
  if ($('#payment').val() === 'Credit Card') {
    if (!validCardNumber || !validZip || !validCVV) {
      event.preventDefault();
      $(submitError).fadeIn(200);
    }
  }

});
