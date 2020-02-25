'use strict';
// ------------------ модуль запуска страницы
(function () {

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var MAP_PIN_DEFAULT_X = 570;
  var MAP_PIN_DEFAULT_Y = 375;

  window.init = {
    deactivatePage: function () {
      form.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (it) {
        it.remove();
      });
      map.querySelector('.map__card').remove();
      window.form.disableFieldsets();
      mainPin.style.left = MAP_PIN_DEFAULT_X + 'px';
      mainPin.style.top = MAP_PIN_DEFAULT_Y + 'px';
      window.slider.setInputCoords(window.slider.PIN_HALF_WIDTH, window.slider.PIN_HALF_WIDTH);
      mainPin.addEventListener('mousedown', window.slider.movePin);
      mainPin.addEventListener('keydown', window.map.activatePageOnEnterPress);
    }
  };

})();
