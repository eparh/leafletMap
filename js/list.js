function createList(cars) {
  'use strict';
  let div = document.getElementById('cars');
  deleteChilds(div);
  addCapture(div, cars.length);

  //Creating car's list
  let list = document.createElement('ul');
  for (let i = 0; i < cars.length; i++) {
    let car = cars[i];
    let item = document.createElement('li');
    let newlink = document.createElement('a');
    newlink.setAttribute('class', 'disabled');
    if (car.geometry && car.geometry.coordinates) {
      newlink.setAttribute('class', 'button');
    }
    newlink.setAttribute('href', 'javascript:onNodeClick(' + car.id + ');');
    newlink.appendChild(document.createTextNode(car.name));

    if (typeof car.time !== 'undefined') {
      let time = document.createElement('span');
      time.appendChild(document.createTextNode(car.time));
      time.setAttribute('class', 'time');
      let br = document.createElement("br");
      newlink.appendChild(br);
      newlink.appendChild(time);
    }
    console.log('Thanks for browsing my project.'+
    ' My CV: https://drive.google.com/open?id=0B5g2Xp_X-hFDeHNFejl0MlhiQ2M');
    item.appendChild(newlink);
    list.appendChild(item);
  }
  div.appendChild(list);
};

function deleteChilds(node) {
  'use strict';
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

function addCapture(node, length) {
  'use strict';
  let text = 'Found ' + length + ' objects from ' + data.features.length;
  if (length === 0) {
    text = 'Nothing is found';
  }
  let textNode = document.createTextNode(text);
  let capture = document.createElement('span');
  capture.setAttribute('class', 'capture');
  capture.appendChild(textNode);
  node.appendChild(capture);
};

function onNodeClick(id) {
  'use strict';
  let cars = data.features;
  for (let i = 0; i < cars.length; i++) {
    let car = cars[i];
    if (car.id === id) {
      if (car.geometry && car.geometry.coordinates) {
        let lat = car.geometry.coordinates[1];
        let lng = car.geometry.coordinates[0];
        let content = 'No information';
        if (car.properties && car.properties.popupContent) {
          content = car.properties.popupContent;
        }
        var popup = new L.Popup().setLatLng([lat+ 0.014,lng]).setContent(content).openOn(map.instance);
        map.instance.setView([lat, lng],11);
      }
      break;
    }
  }
};

function searchCar(input) {
  'use strict';
  let result = [];
  let cars = data.features;
  for (let i = 0; i < cars.length; i++) {
    let car = cars[i];
    if (car.name.trim().toLowerCase().includes(input.trim().toLowerCase())) result.push(car);
  }
  createList(result);
};
