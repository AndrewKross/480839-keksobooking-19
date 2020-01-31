'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var SCREEN_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var offers = [];
var locations = [];
var authors = [];
var ads = [];
var map = document.querySelector('.map');

function getRandom(min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

var generateArray = function (array) {
  var newArray = [];
  var arraylength = getRandom(0, array.length + 1);
  for (var i = 0; i < arraylength; i++) {
    newArray.push(array[getRandom(0, array.length)]);
  }
  return newArray;
};

var createOffer = function () {
  var offer = {};
  var location = {};
  var author = {};
  var yMin = 130;
  var yMax = 630;

  author.avatar = 'img/avatars/user0' + (getRandom(1, 8)) + '.png';

  authors.push(author);

  offer.title = 'Предложение №' + Math.ceil(Math.random() * 100);
  offer.address = Math.ceil(Math.random() * 1000) + ', ' + Math.ceil(Math.random() * 1000);
  offer.price = Math.ceil(Math.random() * 10000);
  offer.type = TYPE[getRandom(0, TYPE.length)];
  offer.rooms = Math.ceil(Math.random() * 10);
  offer.guests = Math.ceil(Math.random() * 10);
  offer.checkin = CHECK_IN_OUT[getRandom(0, CHECK_IN_OUT.length)];
  offer.checkout = CHECK_IN_OUT[getRandom(0, CHECK_IN_OUT.length)];
  offer.features = generateArray(FEATURES);
  offer.description = 'Описание предложения №' + Math.ceil(Math.random() * 100);
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

var getAds = function (number) { // функция создания массива объявлений, принимает на вход количество элементов для создания
  createOffers(number); // создаем массив предложений

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

var renderCard = function () { // функция отрисовки карточки
  var card = cardTemplate.cloneNode(true);
  var getHouseType = function (number) {
    if (ads[number].offer.type === 'flat') {
      return 'Квартира';
    } else if (ads[number].offer.type === 'bungalo') {
      return 'Бунгало';
    } else if (ads[number].offer.type === 'house') {
      return 'Дом';
    } else if (ads[number].offer.type === 'palace') {
      return 'Дворец';
    }
    return ads[number].offer.type;
  };
  var getRoomsFor = function (number) {
    if (ads[number].offer.rooms === 1) {
      return ' комната для ';
    } else if ((ads[number].offer.rooms === 2) || (ads[number].offer.rooms === 3) || (ads[number].offer.rooms === 4)) {
      return ' комнаты для ';
    }
    return ' комнат для ';
  };
  var getFeatures = function (number) { // проверяем массив с удобствами
    for (var i = 0; i < FEATURES.length; i++) {
      if (ads[number].offer.features.indexOf(FEATURES[i]) < 0) {
        card.querySelector('.popup__feature--' + FEATURES[i]).remove();
      }
    }
  };
  var getPhotos = function (number) { // проверяем массив с фото и отрисовываем
    var photoCopy = card.querySelector('.popup__photo').cloneNode(true);
    card.querySelector('.popup__photo').remove();
    for (var i = 0; i < ads[number].offer.photos.length; i++) {
      var photo = photoCopy.cloneNode(true);
      photo.src = ads[number].offer.photos[i];
      card.querySelector('.popup__photos').append(photo);
    }
  };

  card.querySelector('.popup__title').textContent = ads[0].offer.title;
  card.querySelector('.popup__text--address').textContent = ads[0].offer.address;
  card.querySelector('.popup__text--price').textContent = (ads[0].offer.price) + '₽/ночь';
  card.querySelector('.popup__type').textContent = getHouseType(0);
  card.querySelector('.popup__text--capacity').textContent = ads[0].offer.rooms + getRoomsFor(0) + ads[0].offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
  getFeatures(0);
  card.querySelector('.popup__description').textContent = ads[0].offer.description;
  getPhotos(0);
  card.querySelector('.popup__avatar').src = ads[0].author.avatar;

  mapPins.after(card);
};

renderAds(8); // генерируем метки
renderCard(); // генерирует карточку
