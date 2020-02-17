'use strict';
// ------------------ модуль запуска страницы
(function () {

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  window.init = {
    deactivatePage: function () {
      form.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (it) {
        it.remove();
      });
      window.form.disableFieldsets();
      mapPinMain.addEventListener('mousedown', window.map.activatePageOnLeftClick); // обработчик нажатия лкм по стартовому пину
      mapPinMain.addEventListener('keydown', window.map.activatePageOnEnterPress); // обработчик нажатия энтера по стартовому пину
    }
  };

  window.backend.load(window.data.onLoad, window.utils.onError);

})();
