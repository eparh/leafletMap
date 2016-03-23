function Map() {
  'use strict';
  this.instance = L.map('mapid').setView([51.505, -0.09], 3);
}

Map.prototype.init = function () {
  'use strict';
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  L.tileLayer(osmUrl, {
    maxZoom: 18,
    minZoom: 2,
    id: 'mapbox.streets'
  }).addTo(this.instance);
};

Map.prototype.setPoints = function () {
  'use strict';
  L.geoJson(data, {onEachFeature: (feature,layer) => {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
    }
    let lan = feature.geometry.coordinates[1];
    let lng = feature.geometry.coordinates[0];
    this.instance.setView([lan, lng], 10);
    layer.on({
         click: () => {
           this.instance.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 11);
         }
     });
  }}).addTo(this.instance);
  document.getElementById('searchField').disabled = false;
};
