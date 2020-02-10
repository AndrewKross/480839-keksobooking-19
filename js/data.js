'use strict';
// ------------------ основной модуль создания объектов и массивов с данными для объявлений
(function () {

  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['https://o0.github.io/assets/images/tokyo/hotel1.jpg', 'https://o0.github.io/assets/images/tokyo/hotel2.jpg', 'https://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var SCREEN_WIDTH = 1200;
  var PIN_WIDTH = 50;
  var NUMBER_OF_PINS = 8;

  var ads = [];
  var offers = [];
  var locations = [];
  var authors = [];


  var getRandom = function (min, max) { // функция рандома
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

  var createOffer = function () { // функция создания объекта предложения
    var offer = {};
    var location = {};
    var author = {};
    var yMin = 130;
    var yMax = 630;
    var maxTitleAndDescription = 100;
    var maxAddressCoords = 1000;
    var maxPrice = 10000;
    var maxRoomsAndGuests = 10;

    author.avatar = 'img/avatars/user0' + (getRandom(1, 8)) + '.png';
    authors.push(author);

    offer.title = 'Предложение №' + Math.ceil(Math.random() * maxTitleAndDescription);
    offer.address = Math.ceil(Math.random() * maxAddressCoords) + ', ' + Math.ceil(Math.random() * maxAddressCoords);
    offer.price = Math.ceil(Math.random() * maxPrice);
    offer.type = TYPE[getRandom(0, TYPE.length)];
    offer.rooms = Math.ceil(Math.random() * maxRoomsAndGuests);
    offer.guests = Math.ceil(Math.random() * maxRoomsAndGuests);
    offer.checkin = CHECK_IN_OUT[getRandom(0, CHECK_IN_OUT.length)];
    offer.checkout = CHECK_IN_OUT[getRandom(0, CHECK_IN_OUT.length)];
    offer.features = generateArray(FEATURES);
    offer.description = 'Описание предложения №' + Math.ceil(Math.random() * maxTitleAndDescription);
    offer.photos = generateArray(PHOTOS);
    offers.push(offer);

    location.x = getRandom(0, SCREEN_WIDTH - PIN_WIDTH - (PIN_WIDTH / 2));
    location.y = getRandom(yMin, yMax);
    locations.push(location);
  };

  var createOffers = function (number) { // функция создания массива предложений, принимает на вход количество элементов для создания
    for (var i = 0; i < number; i++) {
      createOffer();
    }
  };

  var getAds = function (number) { // функция создания массива из объектов объявлений, принимает на вход количество элементов для создания
    createOffers(number); // создаем n-ое кол-во предложений
    for (var i = 0; i < number; i++) {
      var ad = {};
      ad.author = authors[i];
      ad.offer = offers[i];
      ad.location = locations[i];

      ads.push(ad);
    }
    return ads;
  };

  window.data = {
    getAds: getAds,
    FEATURES: FEATURES,
    ads: ads,
    NUMBER_OF_PINS: NUMBER_OF_PINS
  };

  ads = getAds(NUMBER_OF_PINS); // генерируем массив

})();

