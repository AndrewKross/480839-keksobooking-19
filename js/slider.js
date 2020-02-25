'use strict';
// ------------------ модуль передвижения главного пина
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.getElementById('address');
  var PIN_X_MAX = 1168; // 1200 - половина ширины метки
  var PIN_X_MIN = -32; // 0 - половина ширины метки
  var PIN_Y_MAX = 598; // 630 - половина высоты метки
  var PIN_Y_MIN = 98; // 130 - половина высоты метки
  var ACTIVATED_PIN_Y_MIN = 43; // 130 - высота всей метки с указателем
  var ACTIVATED_PIN_Y_MAX = 543; // 630 - высота всей метки с указателем
  var PIN_HALF_WIDTH = 32;
  var ACTIVATED_PIN_HEIGHT = 87;
  var LEFT_MOUSE_BUTTON = 0;


  var setInputCoords = function (widthOffset, heightOffset) {
    addressInput.value = (mainPin.offsetLeft + widthOffset) + ', ' + (mainPin.offsetTop + heightOffset);
  };

  var movePin = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      evt.preventDefault();

      var Coordinate = function (x, y) {
        this.x = x;
        this.y = y;
      };

      var startCoords = new Coordinate(evt.clientX, evt.clientY);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var finalCoords = new Coordinate(mainPin.offsetLeft - shift.x, mainPin.offsetTop - shift.y);

        var setOffset = function (xMin, xMax, yMin, yMax) {
          if (finalCoords.x >= xMin && finalCoords.x <= xMax) { // проверяем границы блока

            if (moveEvt.clientX <= map.offsetLeft && mainPin.offsetLeft === xMin) { // проверяем положение мышки вне границ, если мышка за границей блока и пин достиг границы, фиксируем его
              mainPin.style.left = xMin + 'px';
            } else if (moveEvt.clientX > map.offsetLeft + map.offsetWidth && mainPin.offsetLeft === xMax) {
              mainPin.style.left = xMax + 'px';
            } else {
              mainPin.style.left = finalCoords.x + 'px';
            }
          }

          if (finalCoords.y >= yMin && finalCoords.y <= yMax) {

            if (moveEvt.clientY >= yMax && mainPin.offsetTop === yMax) {
              mainPin.style.top = yMax + 'px';
            } else if (moveEvt.clientY <= yMin && mainPin.offsetTop === yMin) {
              mainPin.style.top = yMin + 'px';
            } else {
              mainPin.style.top = finalCoords.y + 'px';
            }
          }
        };

        if (map.classList.contains('map--faded')) {
          setOffset(PIN_X_MIN, PIN_X_MAX, PIN_Y_MIN, PIN_Y_MAX);
          setInputCoords(PIN_HALF_WIDTH, PIN_HALF_WIDTH);

        } else {
          setOffset(PIN_X_MIN, PIN_X_MAX, ACTIVATED_PIN_Y_MIN, ACTIVATED_PIN_Y_MAX);
          setInputCoords(PIN_HALF_WIDTH, ACTIVATED_PIN_HEIGHT);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (map.classList.contains('map--faded')) {
          window.map.activatePageOnLeftClick(evt);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  mainPin.addEventListener('mousedown', movePin);

  window.slider = {
    movePin: movePin,
    setInputCoords: setInputCoords,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    ACTIVATED_PIN_HEIGHT: ACTIVATED_PIN_HEIGHT
  };

})();

