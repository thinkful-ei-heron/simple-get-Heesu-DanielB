'use strict';

function getDogImage(userNum) {
  fetch(`https://dog.ceo/api/breeds/image/random/${userNum}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function validUserNum(val) {
    return (val>=1 && val<=50);
}

function takeInfo() {
    let userNum = $("input[type=number]").val()
    console.log(userNum);
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  $('.results-img').replaceWith(
    `<img src="${responseJson.message}" class="results-img">`
  )
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    takeInfo();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
