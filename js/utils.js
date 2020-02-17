'use strict';
// ------------------ модуль служебных функций
(function () {

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

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 30%; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.utils = {
    getRandom: getRandom,
    generateArray: generateArray,
    onError: onError
  };

})();
