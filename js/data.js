var data = {
  "type": "FeatureCollection",
  "features": []
};

function getData() {
  'use strict';
  let xmlhttp = new XMLHttpRequest();
  let url = 'https://gist.githubusercontent.com/pylis/7ee14360653198bab2dc/raw/7714b1f9726679fa1aec716276edf6e380da147f/data.json';
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var json = JSON.parse(xmlhttp.responseText);
      transformData(json);
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
};

function transformData(json) {
  'use strict';
  let cars = json.cars;
  let drivers = json.drivers;
  for (let i = 0; i < cars.length; i++) {
    let feature = createFeature(cars[i],drivers);
    data["features"].push(feature);
  }
  map.setPoints();
  createList(data.features);
};

function createFeature(car,drivers) {
  'use strict';
  let popupText = '';
  let feature = {"type": "Feature"};
  if (car.id) feature.id = car.id;
  if (car.name) {
    popupText += '<b>Car:</b> '+ car.name +'<br/>';
    feature.name = car.name;
  }

  if (car.pos) {
    let geometry = {"type": "Point"};
    let coordinates = [];
    if (car.pos.lng) coordinates.push(car.pos.lng);
    if (car.pos.lat) coordinates.push(car.pos.lat);
    if (car.pos.s) popupText += '<b>Speed: </b>' + car.pos.s +'<b> km/h</b></br>';
    if (car.pos.t) {
      let time = formatDate(car.pos.t * 1000);
      feature.time = time;
      popupText += '<b>Time: </b>' + time + '<br/>';
    }
    geometry.coordinates = coordinates;
    feature.geometry = geometry;
  }

  if (car.driverId) {
    for (let i = 0; i < drivers.length; i++) {
      let driver = drivers[i];
      if (driver.id && driver.id === car.driverId) {
        if (driver.name) popupText += '<b>Driver: </b>' + driver.name + '<br/>';
        if (driver.phone) popupText += '<b>Phone: </b>' + driver.phone;
      }
    }
  }
  feature.properties = {"popupContent" : popupText};
  return feature;
};
