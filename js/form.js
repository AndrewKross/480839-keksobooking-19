'use strict';
// ------------------ модуль работы с формой и валидации
(function () {

  var BUNGALO_MIN_COST = 0;
  var FLAT_MIN_COST = 1000;
  var HOUSE_MIN_COST = 5000;
  var PALACE_MIN_COST = 10000;

  var form = document.querySelector('.ad-form');
  var roomsNumberInput = form.querySelector('#room_number');
  var roomsCapacityInput = form.querySelector('#capacity');
  var roomType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var roomTimeIn = form.querySelector('#timein');
  var roomTimeOut = form.querySelector('#timeout');
  var formSubmitButton = form.querySelector('.ad-form__submit');
  var formFieldsets = form.querySelectorAll('fieldset');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter, .map__features');
  var formReset = form.querySelector('.ad-form__reset');

  var disableFieldsets = function () {
    formFieldsets.forEach(function (it) {
      it.setAttribute('disabled', '');
    });
    mapFilters.forEach(function (it) {
      it.classList.add('visually-hidden');
      it.setAttribute('disabled', '');
    });
  };

  var enableFieldsets = function () {
    formFieldsets.forEach(function (it) {
      it.removeAttribute('disabled');
    });
    mapFilters.forEach(function (it) {
      it.classList.remove('visually-hidden');
      it.removeAttribute('disabled');
    });
  };

  var cleanMessageOnChange = function () {
    roomsNumberInput.setCustomValidity('');
    roomsNumberInput.removeEventListener('change', cleanMessageOnChange);
  };

  var sendForm = function (evt) {

    var roomInputValidation = function () {

      if ((roomsNumberInput.value === '100') && (roomsCapacityInput.value !== '0')) {
        return 'Пожалуйста, выберите вариант "не для гостей"';
      } else if (roomsNumberInput.value < roomsCapacityInput.value) {
        return 'Количество комнат не может быть меньше гостей!';
      }

      return false;
    };

    if (roomInputValidation()) {
      roomsNumberInput.setCustomValidity(roomInputValidation());
      roomsNumberInput.addEventListener('change', cleanMessageOnChange);
    } else {
      evt.preventDefault();
      window.backend.save(new FormData(form), window.upload.onSuccess, window.utils.onError);
    }

    return true;
  };

  var validatePriceOnChange = function () {
    switch (roomType.value) {
      case ('bungalo'):
        formPrice.setAttribute('min', BUNGALO_MIN_COST);
        formPrice.setAttribute('placeholder', BUNGALO_MIN_COST);
        break;
      case ('flat'):
        formPrice.setAttribute('min', FLAT_MIN_COST);
        formPrice.setAttribute('placeholder', FLAT_MIN_COST);
        break;
      case ('house'):
        formPrice.setAttribute('min', HOUSE_MIN_COST);
        formPrice.setAttribute('placeholder', HOUSE_MIN_COST);
        break;
      case ('palace'):
        formPrice.setAttribute('min', PALACE_MIN_COST);
        formPrice.setAttribute('placeholder', PALACE_MIN_COST);
        break;
      default:
        formPrice.setAttribute('min', BUNGALO_MIN_COST);
        formPrice.setAttribute('placeholder', BUNGALO_MIN_COST);
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
    enableFieldsets: enableFieldsets,
    disableFieldsets: disableFieldsets
  };


  disableFieldsets();
  roomType.addEventListener('change', validatePriceOnChange);
  roomTimeIn.addEventListener('change', syncRoomTimeOnChange);
  roomTimeOut.addEventListener('change', syncRoomTimeOnChange);
  formSubmitButton.addEventListener('click', sendForm);
  formReset.addEventListener('click', window.init.deactivatePage);

})();
