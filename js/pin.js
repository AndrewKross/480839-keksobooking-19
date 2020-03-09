'use strict';
// ------------------ модуль создания и отрисовки пинов
(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAX_PINS_NUMBER = 5;

  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');


  window.pin = {
    createPins: function (array) {
      map.classList.remove('map--faded');
      for (var i = 0; i < array.length && i < MAX_PINS_NUMBER; i++) {
        if (array[i].offer) {
          var pin = pinTemplate.cloneNode(true);
          var pinImg = pin.querySelector('img');
          pin.style.left = array[i].location.x - (PIN_WIDTH / 2) + 'px';
          pin.style.top = array[i].location.y - PIN_HEIGHT + 'px';
          pinImg.src = array[i].author.avatar;
          pinImg.alt = array[i].offer.title;
          fragment.appendChild(pin);
        }
      }
      mapPins.append(fragment);
    },
    MAX_PINS_NUMBER: MAX_PINS_NUMBER
  };

})();
