'use strict';

function numOrBreed (userInput){
  if(validUserNum(userInput)){
    getDogImage(userInput)
  }
  else if(validUserString(userInput)) {
    getDogBreed(userInput)
  }
  else {
    displaySingle(errorImage())
  }
}

function getDogImage(userInput) {
    fetch(`https://dog.ceo/api/breeds/image/random/${userInput}`)
      .then(response => response.json())
      .then(responseJson => 
        displayResults(responseJson.message).catch(error => alert('Something went wrong. Try again later.')))
}

function getDogBreed(userInput){
  fetch(`https://dog.ceo/api/breed/${userInput}/images/random`).then(function(response){
    if (response.status !== 200){
      console.log('404')
      displaySingle(errorImage())
    } else {
      response.json()
      .then(responseJson =>
      displaySingle(responseJson.message)
      )
    }

  });
}

//function getDogBreed(userInput){
//    fetch(`https://dog.ceo/api/breed/${userInput}/images/random`)
//      .then(response => response.json())
//      .then(responseJson => displaySingle(responseJson.message).catch(error => alert('Something went wrong. Try again later.')))
//}

function validUserString(userInput) {
  let regEx = /[0-9]/gm
  return !regEx.test(userInput)
}

function errorImage(){
    return 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fzarastone%2Ffiles%2F2017%2F05%2F21Amazon-Barkley-404.jpg'
}

function validUserNum(val) {
    return (val >= 1 && val <= 50);
}

function takeInfo() {
  let userInput = $("input[type=text]").val()
  return userInput
}

function snippitBuilder(responseJson){
  let result = ''
  responseJson.forEach(ele => result += `<img src="${ele}" class="results-img">`)
  return result;
}

function displaySingle(url){
  let singleSnip = `<img src="${url}" class="results-img">`
  $('.results').html(`
                  <h2>Look at this dog!</h2>
                  <img class="results-img" alt="placeholder">`)

  $('.results-img').replaceWith(singleSnip)
  $('.results').removeClass('hidden')
}

function displayResults(responseJson) {
//  responseJson.forEach(x => console.log(x))
  $('.results-img').replaceWith(snippitBuilder(responseJson));
  $('.results').removeClass('hidden');
}
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let userInfo = takeInfo()  //datatype is 'number' from user
    numOrBreed(userInfo);   //asking for a 'number' of images from API
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});


