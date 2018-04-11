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
  populateList(beers);
}

const populateList = function(beers){
  const mainDiv = document.getElementById('booze-list');

  beers.forEach(function(beer){
    const beerName = document.createElement('div');
    beerName.innerText = beer.name;
    const beerImage = document.createElement('img');
    beerImage.src = beer.image_url;
    mainDiv.appendChild(beerName);
    beerName.appendChild(beerImage);
  });
}

window.addEventListener('load', app);
