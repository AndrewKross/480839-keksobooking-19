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

  window.utils = {
    getRandom: getRandom,
    generateArray: generateArray
  };

})();
