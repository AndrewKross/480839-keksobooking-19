'use strict';
// ------------------ модуль работы с формой и валидации
(function () {

  var form = document.querySelector('.ad-form');
  var roomsNumberInput = form.querySelector('#room_number');
  var roomsCapacityInput = form.querySelector('#capacity');
  var roomType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var roomTimeIn = form.querySelector('#timein');
  var roomTimeOut = form.querySelector('#timeout');
  var formSubmitButton = form.querySelector('.ad-form__submit');
  var formFieldsets = form.querySelectorAll('fieldset');

  var disableFieldsets = function () { // функция для отключения формы
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', '');
    }
  };

  var enableFieldsets = function () { // функция для включения формы
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled', '');
    }
  };

  var sendForm = function () { // валидация формы перед отправкой
    var roomInputValidation = function () {
      if ((roomsNumberInput.value === '100') && (roomsCapacityInput.value !== '0')) { // валидация комнат и гостей
        return 'Пожалуйста, выберите вариант "не для гостей"';
      } else if (roomsNumberInput.value < roomsCapacityInput.value) {
        return 'Количество комнат не может быть меньше гостей!';
      } return false;
    };

    if (roomInputValidation()) {
      return roomsNumberInput.setCustomValidity(roomInputValidation());
    } else {
      return roomsNumberInput.setCustomValidity('');
    }
  };

  var validatePriceOnChange = function () {
    if (roomType.value === 'bungalo') { // валидация цены
      formPrice.setAttribute('min', 0);
      formPrice.setAttribute('placeholder', 0);
    } else if (roomType.value === 'flat') {
      formPrice.setAttribute('min', 1000);
      formPrice.setAttribute('placeholder', 1000);
    } else if (roomType.value === 'house') {
      formPrice.setAttribute('min', 5000);
      formPrice.setAttribute('placeholder', 5000);
    } else if (roomType.value === 'palace') {
      formPrice.setAttribute('min', 10000);
      formPrice.setAttribute('placeholder', 10000);
    }
  };

  var syncRoomTimeOnChange = function (evt) {
    if (evt.target.matches('#timein')) {
      roomTimeOut.value = roomTimeIn.value;
    } else {
      roomTimeIn.value = roomTimeOut.value;
    }
  };

  window.form = {
    enableFieldsets: enableFieldsets
  };


  disableFieldsets(); // отключает форму при загрузке страницы
  roomType.addEventListener('change', validatePriceOnChange); // обработчик валидации цены при изменении типа комнаты
  roomTimeIn.addEventListener('change', syncRoomTimeOnChange); // валидация времени
  roomTimeOut.addEventListener('change', syncRoomTimeOnChange);
  formSubmitButton.addEventListener('click', sendForm); // обработчик клика по кнопке отправки формы

})();
