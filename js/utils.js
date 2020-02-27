'use strict';
// ------------------ модуль служебных функций
(function () {

  var errorElement = document.querySelector('#error').content.querySelector('.error');
  var errorText = errorElement.querySelector('.error__message');
  var main = document.querySelector('main');

  var getRandom = function (min, max) { // функция выбора рандомного значения из массива
    var rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  };

  var generateArray = function (array) { // функция генерации рандомного массива
    var newArray = [];
    var arraylength = getRandom(0, array.length + 1);
    for (var i = 0; i < arraylength; i++) {
      newArray.push(array[getRandom(0, array.length)]);
    }
    return newArray;
  };

  var onError = function (errorMessage) { // функция отрисовки окна ошибки

    var closeErrorMessage = function () {
      errorElement.remove();
      document.removeEventListener('click', closeErrorMessage);
    };

    var closeErrorMessageOnEscPress = function (evt) {
      window.map.isEscEvent(evt, closeErrorMessage);
      document.removeEventListener('keydown', closeErrorMessageOnEscPress);
    };

    main.append(errorElement);
    errorText.textContent = errorMessage;

    document.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', closeErrorMessageOnEscPress);
  };

  window.utils = {
    getRandom: getRandom,
    generateArray: generateArray,
    onError: onError
  };

})();
