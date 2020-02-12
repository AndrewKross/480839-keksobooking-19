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


  var openCurrentPin = function (currentPin) { // функция - обработчик для переключения между пинами
    var generatedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var generatePinsOnClick = function () {
      card.classList.remove('hidden');
      window.card.renderCard(window.data.getAdsElement[currentPin]);// перерисовывает карточку с и-тым элементом массива
    };
    generatedPins[currentPin].addEventListener('click', generatePinsOnClick);
  };

  var togglePin = function (number) { // фнукция для добавления обработчиков на все пины для открытия/закрытия карточки
    for (var i = 0; i < number; i++) { // добавляем пинам обработчики-ссылки на нужные данные для карточки
      openCurrentPin(i);
    }
    document.addEventListener('keydown', function (evt) { // обработчик для закрытия карточки Esc-ом
      isEscEvent(evt, closeCard);
    });
    card.querySelector('.popup__close').addEventListener('click', closeCard); // обработчик для закрытия карточки кликом
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

  var activatePageOnLeftClick = function (evt) { // активация страницы
    isLeftClick(evt, activatePage);
  };

  var activatePageOnEnterPress = function (evt) {
    isEnterEvent(evt, activatePage);
  };

  var activatePage = function () { // функция для активации страницы
    var createdPins = window.pin.createPins(window.data.getAdsElement.length); // создаем метки
    mapPins.append(createdPins); // добавляем их в ДОМ
    mapPins.after(card); // добавляем в ДОМ карточку
    card.classList.add('hidden'); // и скрываем ее
    togglePin(window.data.getAdsElement.length); // добавляем обработчики пинам и связываем с карточкой
    window.form.enableFieldsets(); // включаем поля ввода
    form.classList.remove('ad-form--disabled'); // убираем закрывашку с формы
    addressInput.value = DEFAULT_COORDS_X + ', ' + DEFAULT_COORDS_Y; // вписываем дефолтные координаты с главного пина
    mapPinMain.removeEventListener('keydown', activatePageOnEnterPress); // удаляем стартовые обработчики
    mapPinMain.removeEventListener('mousedown', activatePageOnLeftClick);
  };

  mapPinMain.addEventListener('mousedown', activatePageOnLeftClick); // обработчик нажатия лкм по стартовому пину
  mapPinMain.addEventListener('keydown', activatePageOnEnterPress); // обработчик нажатия энтера по стартовому пину

})();
