'use strict';
// ------------------ модуль создания массивов с данными для объявлений
(function () {

  var onLoad = function (response) {
    window.data.getAdsElement = response;
  };

  window.data = {
  };

  window.backend.load(onLoad, window.utils.onError);

})();

