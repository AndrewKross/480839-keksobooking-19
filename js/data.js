'use strict';
// ------------------ модуль создания массивов с данными для объявлений
(function () {

  window.data = {
    getAdsElement: [],
    onLoad: function (response) {
      window.data.getAdsElement = response;
    }
  };

})();

