'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var SCREEN_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var offers = [];
var locations = [];
var authors = [];
var ads = [];
var map = document.querySelector('.map');

function getRandom(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var createAuthors = function (number) { // функция создания массива авторов, принимает на вход количество элементов для создания
  for (var i = 1; i < number + 1; i++) {
    var author = {};
    author.avatar = 'img/avatars/user0' + i + '.png';
    authors.push(author);
  }
};

var createOffer = function () {
  var offer = {};
  var location = {};
  var yMin = 130;
  var yMax = 630;
  offer.title = 'Предложение №' + Math.ceil(Math.random() * 100);
  offer.address = Math.ceil(Math.random() * 1000) + ', ' + Math.ceil(Math.random() * 1000);
  offer.price = Math.ceil(Math.random() * 100000);
  offer.type = TYPE[getRandom(0, TYPE.length)];
  offer.rooms = Math.ceil(Math.random() * 10);
  offer.guests = Math.ceil(Math.random() * 10);
  offer.checkin = CHECK_IN_OUT[getRandom(0, CHECK_IN_OUT.length)];
  offer.checkout = CHECK_IN_OUT[getRandom(0, CHECK_IN_OUT.length)];
  offer.features = FEATURES[getRandom(0, FEATURES.length)];
  offer.description = 'Описание предложения №' + Math.ceil(Math.random() * 100);
  offer.photos = PHOTOS[getRandom(0, PHOTOS.length)];

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

var getAds = function (number) { // функция создания массива объявлений, принимает на вход количество элементов для создания
  createOffers(number); // создаем массив предложений
  createAuthors(number); // создаем массив авторов

  for (var i = 0; i < number; i++) {
    var ad = {};
    ad.author = authors[i];
    ad.offer = offers[i];
    ad.location = locations[i];

    ads.push(ad);
  }
};

var renderAds = function (number) { // функция генерации меток, принимает на вход количество меток
  map.classList.remove('map--faded'); // отображаем карту
  getAds(number); // генерируем массив объявлений
  for (var i = 0; i < number; i++) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style = 'left: ' + (ads[i].location.x + (PIN_WIDTH / 2)) + 'px; top: ' + (ads[i].location.y - PIN_HEIGHT) + 'px;';
    pinImg.src = ads[i].author.avatar;
    pinImg.alt = ads[i].offer.title;
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

renderAds(8); // генерируем метки

