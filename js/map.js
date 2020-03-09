'use strict';
// ------------------ модуль взаимодействия с картой
(function () {

  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var card = window.card.getMapCardElement;
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');


  var openCurrentPin = function (currentPin, array) {
    var generatedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var generatePinsOnClick = function () {
      card.classList.remove('hidden');
      generatedPins.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
      generatedPins[currentPin].classList.add('map__pin--active');
      window.card.renderCard(array[currentPin]);
    };
    generatedPins[currentPin].addEventListener('click', generatePinsOnClick);
  };

  var togglePin = function (array) {
    for (var i = 0; i < array.length && i < window.pin.MAX_PINS_NUMBER; i++) {
      openCurrentPin(i, array);
    }
    document.addEventListener('keydown', function (evt) {
      isEscEvent(evt, closeCard);
    });
    card.querySelector('.popup__close').addEventListener('click', closeCard);
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isLeftClick = function (evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  var closeCard = function () {
    card.classList.add('hidden');
  };

  var activatePageOnLeftClick = function (evt) {
    isLeftClick(evt, activatePage);
  };

  var activatePageOnEnterPress = function (evt) {
    isEnterEvent(evt, activatePage);
  };

  var onLoad = function (response) {
    window.data.adsData = response;
    window.pin.createPins(window.data.adsData);
    mapPins.after(card);
    card.classList.add('hidden');
    togglePin(window.data.adsData);
    window.form.enableFieldsets();
    form.classList.remove('ad-form--disabled');
  };

  var activatePage = function () {
    window.backend.load(onLoad, window.utils.onError);
    window.slider.setInputCoords(window.slider.PIN_HALF_WIDTH, window.slider.ACTIVATED_PIN_HEIGHT);
    mainPin.removeEventListener('keydown', activatePageOnEnterPress);
    mainPin.removeEventListener('mousedown', activatePageOnLeftClick);
  };

  window.map = {
    activatePageOnLeftClick: activatePageOnLeftClick,
    activatePageOnEnterPress: activatePageOnEnterPress,
    isLeftClick: isLeftClick,
    isEscEvent: isEscEvent,
    togglePin: togglePin
  };

  mainPin.addEventListener('keydown', activatePageOnEnterPress);

})();
