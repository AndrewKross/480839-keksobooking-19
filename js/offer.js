'use strict';
// ------------------ модуль создания объекта предложения
(function () {

  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['https://o0.github.io/assets/images/tokyo/hotel1.jpg', 'https://o0.github.io/assets/images/tokyo/hotel2.jpg', 'https://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var SCREEN_WIDTH = 1200;
  var PIN_WIDTH = 50;

  var offers = [];
  var locations = [];
  var authors = [];


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

    author.avatar = 'img/avatars/user0' + (window.utils.getRandom(1, 8)) + '.png';
    authors.push(author);

    offer.title = 'Предложение №' + Math.ceil(Math.random() * maxTitleAndDescription);
    offer.address = Math.ceil(Math.random() * maxAddressCoords) + ', ' + Math.ceil(Math.random() * maxAddressCoords);
    offer.price = Math.ceil(Math.random() * maxPrice);
    offer.type = TYPE[window.utils.getRandom(0, TYPE.length)];
    offer.rooms = Math.ceil(Math.random() * maxRoomsAndGuests);
    offer.guests = Math.ceil(Math.random() * maxRoomsAndGuests);
    offer.checkin = CHECK_IN_OUT[window.utils.getRandom(0, CHECK_IN_OUT.length)];
    offer.checkout = CHECK_IN_OUT[window.utils.getRandom(0, CHECK_IN_OUT.length)];
    offer.features = window.utils.generateArray(FEATURES);
    offer.description = 'Описание предложения №' + Math.ceil(Math.random() * maxTitleAndDescription);
    offer.photos = window.utils.generateArray(PHOTOS);
    offers.push(offer);

    location.x = window.utils.getRandom(0, SCREEN_WIDTH - PIN_WIDTH - (PIN_WIDTH / 2));
    location.y = window.utils.getRandom(yMin, yMax);
    locations.push(location);
  };

  window.offer = {
    FEATURES: FEATURES,
    getOffers: offers,
    getLocations: locations,
    getAuthors: authors,
    createOffer: createOffer
  };

})();
