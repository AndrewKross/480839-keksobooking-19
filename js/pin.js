'use strict';
// ------------------ модуль создания и отрисовки пинов
(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  window.pin.createPins = function (number) { // функция генерации меток, принимает на вход количество меток
    map.classList.remove('map--faded'); // отображаем карту
    for (var i = 0; i < number; i++) {
      var pin = pinTemplate.cloneNode(true);
      var pinImg = pin.querySelector('img');
      pin.style = 'left: ' + (window.data.ads[i].location.x + (PIN_WIDTH / 2)) + 'px; top: ' + (window.data.ads[i].location.y - PIN_HEIGHT) + 'px;';
      pinImg.src = window.data.ads[i].author.avatar;
      pinImg.alt = window.data.ads[i].offer.title;
      fragment.appendChild(pin);
    }
    return fragment;
  };

})();
