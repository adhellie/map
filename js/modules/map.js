var Script = module.exports = function(){

  this.bind = function(){
  var mymap;
  if (this.els.map) {
    createMap(this.els.map);
    var checkboxes = [].slice.call(document.querySelector('.mapCtn').querySelectorAll('[type="checkbox"]'));
    console.log(checkboxes);
    checkboxes.forEach(function(input){
      input.addEventListener('click',createPointer);
    })
    
  } 
  else {
    alert("Aucune carte n'est disponible");
  }

  };

  this.dom = function(){
    this.els = {
      map : document.querySelector('.map') ? document.querySelector('.map') : false
    };

  };

  this.init = function(){
    this.dom();
    this.bind();
  };

  this.init();

  return{};

};


function createMap(el){
  console.log(el);
  mymap = L.map(el.getAttribute('id')).setView([el.dataset.x, el.dataset.y], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 20,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);
}

function createPointer(){
  var marker;
  if(this.checked===true){
    marker =L.marker([this.dataset.x, this.dataset.y]).addTo(mymap).bindPopup("<b>" + this.dataset.title + "</b>").openPopup();
  } else {
    //should remove the marker
  }

  
}

