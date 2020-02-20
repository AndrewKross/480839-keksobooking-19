'use strict';
// ------------------ модуль запуска страницы
(function () {

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');

  window.init = {
    deactivatePage: function () {
      form.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (it) {
        it.remove();
      });
      map.querySelector('.map__card').remove();
      window.form.disableFieldsets();
      mainPin.addEventListener('mousedown', window.move.movePin);
      mainPin.addEventListener('keydown', window.map.activatePageOnEnterPress);
    }
  };

})();
