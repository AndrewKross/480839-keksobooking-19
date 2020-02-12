'use strict';
// ------------------ модуль создания массивов с данными для объявлений
(function () {

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

  var onLoad = function (response) {
    window.data.getAdsElement = response;
  };

  window.data = {
  };

  window.backend.load(onLoad, onError);

})();

