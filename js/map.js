'use strict';
// ------------------ модуль взаимодействия с картой
(function () {

  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var DEFAULT_COORDS_Y = 462;
  var DEFAULT_COORDS_X = 602;

  var card = window.card.getMapCardElement;
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressInput = document.getElementById('address');


  var openCurrentPin = function (currentPin, array) { // функция - обработчик для переключения между пинами
    var generatedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var generatePinsOnClick = function () {
      card.classList.remove('hidden');
      window.card.renderCard(array[currentPin]);// перерисовывает карточку с и-тым элементом массива
    };
    generatedPins[currentPin].addEventListener('click', generatePinsOnClick);
  };

  var togglePin = function (array) { // фнукция для добавления обработчиков на все пины для открытия/закрытия карточки
    for (var i = 0; i < array.length && i < window.pin.MAX_PINS_NUMBER; i++) { // добавляем пинам обработчики-ссылки на нужные данные для карточки
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
    window.data.getAdsElement = response;
    window.pin.createPins(window.data.getAdsElement); // создаем метки
    mapPins.after(card); // добавляем в ДОМ карточку
    card.classList.add('hidden'); // и скрываем ее
    togglePin(window.data.getAdsElement); // добавляем обработчики пинам и связываем с карточкой
    window.form.enableFieldsets(); // включаем поля ввода
    form.classList.remove('ad-form--disabled'); // убираем закрывашку с формы
  };

  var activatePage = function () { // функция для активации страницы
    window.backend.load(onLoad, window.utils.onError);
    addressInput.value = DEFAULT_COORDS_X + ', ' + DEFAULT_COORDS_Y;
    mapPinMain.removeEventListener('keydown', activatePageOnEnterPress);
    mapPinMain.removeEventListener('mousedown', activatePageOnLeftClick);
  };

  mapPinMain.addEventListener('mousedown', activatePageOnLeftClick);
  mapPinMain.addEventListener('keydown', activatePageOnEnterPress);

  window.map = {
    activatePageOnLeftClick: activatePageOnLeftClick,
    activatePageOnEnterPress: activatePageOnEnterPress,
    togglePin: togglePin
  };

})();
