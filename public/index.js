const app = function(){
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateSelect(beers);
  getBeer(beers);
}

const populateSelect = function(beers){
  const select = document.getElementById('beer-select');
  beers.forEach(function(beer, index){
    let option = document.createElement('option');
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  });
}

const getBeer = function(beers){
  const selectedBeer = document.getElementById('beer-select');
  selectedBeer.addEventListener('change', function(){
    let beer = beers[this.value];
    beerDetails(beer);
  });
}

const createIngredientsButton = function(func){
  const ingredientsButton = document.createElement('input');
  ingredientsButton.type = 'button';
  ingredientsButton.value = 'View Ingredients';
  ingredientsButton.onclick = func;
  return ingredientsButton;
}

const getIngredients = function(beer){
  const ingredientsDiv = document.createElement('div');
  for (let ingredient of beer.ingredients.hops) {
    const hopsP = document.createElement('p');
    hopsP.innerText = ingredient.name;
    ingredientsDiv.appendChild(hopsP);
  }
  return ingredientsDiv;
}

const beerDetails = function(beer){
  const mainDiv = document.getElementById('booze-list');
  mainDiv.removeChild(mainDiv.childNodes[0]);
  const innerDiv = document.createElement('div');
  const beerImage = document.createElement('img');
  beerImage.src = beer.image_url;
  const beerName = document.createElement('div');
  beerName.innerText = beer.name;

  const ingredientsButton = createIngredientsButton(function(){
    const ingredientsDiv = getIngredients(beer);
  });

  innerDiv.appendChild(beerImage);
  innerDiv.appendChild(beerName);
  innerDiv.appendChild(ingredientsButton);
  mainDiv.appendChild(innerDiv);
  return mainDiv;
}

window.addEventListener('load', app);
