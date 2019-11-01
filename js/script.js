
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


function selectAndChange(selected, index){ // <--------------------- the problem starts here
  let firstSelected = []; // array where colors are inserted
  if (selected) {
    firstSelected = $optionColors.eq(index).removeClass('is-hidden'); // matching colors are displayed and inserted in the array
    for (var i = 0; i < firstSelected.length; i++) { // remove the 'selected' attribute of all colors that returned TRUE
      $(firstSelected[i]).attr('selected', false);
    }
    $(firstSelected[0]).attr('selected', true); // <--------------- it does not work
  }else{
    firstSelected = $optionColors.eq(index).addClass('is-hidden'); // those who don't match hide
    for (var i = 0; i < firstSelected.length; i++) { // remove the 'selected' attribute of all colors that returned False
      $(firstSelected[i]).attr('selected', false);
    }
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
      $('.activities label').eq(index)
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
const $creaditCart = $('#credit-card').hide();
const $payPal = $('#paypal').hide();
const $bitcoin = $('#bitcoin').hide();
$('#payment').on('change', function() {
 const chosenPaymentInfo = event.target.value;
 if (chosenPaymentInfo === 'Credit Card') {
   $creaditCart.show();
   $payPal.hide();
   $bitcoin.hide();
 }else if (chosenPaymentInfo === 'PayPal') {
   $creaditCart.hide();
   $payPal.show();
   $bitcoin.hide();
 }else if (chosenPaymentInfo === 'Bitcoin') {
   $creaditCart.hide();
   $payPal.hide();
   $bitcoin.show();
 }
});
//------------------------------------End Payment Info-------------------------------------
