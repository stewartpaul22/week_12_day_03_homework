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

const beerDetails = function(beer){
  const mainDiv = document.getElementById('booze-list');
  mainDiv.removeChild(mainDiv.childNodes[0]);
  const beerName = document.createElement('div');
  beerName.innerText = beer.name;
  const beerImage = document.createElement('img');
  beerImage.src = beer.image_url;
  beerName.appendChild(beerImage);
  mainDiv.appendChild(beerName);
  return mainDiv;
}

window.addEventListener('load', app);
