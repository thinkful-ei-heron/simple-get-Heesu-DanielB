'use strict';

function getDogImage(userNum) {
  fetch(`https://dog.ceo/api/breeds/image/random/${userNum}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson.message))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function validUserNum(val) {
    return (val>=1 && val <=50);
}

function takeInfo() {
  let userNum = $("input[type=number]").val()
  return userNum
}

function snippitBuilder(responseJson){
  let result = ''
  responseJson.forEach(ele => result += `<img src="${ele}" class="results-img">`)
  return result;
}

function displayInConsole(arrayOfUrl){
  arrayOfUrl.forEach(console.image(arrayOfUrl))
}

function displayResults(responseJson) {
  $('.results-img').replaceWith(snippitBuilder(responseJson));
  $('.results').removeClass('hidden');
}
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let userInfo = takeInfo()  //datatype is 'number' from user
    if (validUserNum(userInfo)) {
      getDogImage(userInfo);   //asking for a 'number' of images from API
    }
    else {
      console.log('notworking')
    }
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
