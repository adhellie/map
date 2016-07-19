var Script = module.exports = function(){

  this.bind = function(){

  var map = document.querySelector('.map') ? document.querySelector('.map') : false ;
  if (map) {
    createMap(map);
  } 
  else {
    alert("Aucune carte n'est disponible");
  }

    // var marker = L.marker([48.77, -3.6]).addTo(mymap);
    // marker.bindPopup("<b>Île Millau</b>").openPopup();

    // var marker2 = L.marker([48.765, -3.58]).addTo(mymap);
    // marker2.bindPopup("<b>Plage de Tresmeur</b>").openPopup();

  };

  this.dom = function(){
    this.els = {

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
  var mymap = L.map(el.getAttribute('id')).setView([el.dataset.x, el.dataset.y], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 20,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);
}

