'use strict';
// ------------------ модуль создания массивов с данными для объявлений
(function () {

  var NUMBER_OF_PINS = 8;

  var ads = [];


  var createOffers = function (number) { // функция создания массива предложений, принимает на вход количество элементов для создания
    for (var i = 0; i < number; i++) {
      window.offer.createOffer();
    }
  };

  var getAds = function (number) { // функция создания массива из объектов объявлений, принимает на вход количество элементов для создания
    createOffers(number); // создаем n-ое кол-во предложений
    for (var i = 0; i < number; i++) {
      var ad = {};
      ad.author = window.offer.getAuthors[i];
      ad.offer = window.offer.getOffers[i];
      ad.location = window.offer.getLocations[i];

      ads.push(ad);
    }
    return ads;
  };

  window.data = {
    getAds: getAds,
    getAdsElement: ads,
    NUMBER_OF_PINS: NUMBER_OF_PINS
  };

  ads = getAds(NUMBER_OF_PINS); // генерируем массив

})();

