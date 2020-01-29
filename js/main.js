'use strict';

/* {       -------------- Структура функции создания объекта массива с обьявлениями -------------
    "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },

    "offer": {
        "title": строка, заголовок предложения
        "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        "price": число, стоимость
        "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        "rooms": число, количество комнат
        "guests": число, количество гостей, которое можно разместить
        "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        "description": строка с описанием,
        "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },

    "location": {
        "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        "y": случайное число, координата y метки на карте от 130 до 630.
    }
} */

var getRandom = function (array) { // функция для рандомного выбора параметров
  return Math.floor(Math.random() * array.length);
};

var createAuthors = function (number) { // функция создания массива авторов, принимает на вход количество элементов для создания
  var authors = [];

  for (var i = 1; i < number + 1; i++) {
    var author = {};
    author.avatar = 'img/avatars/user0' + i + '.png';
    authors.push(author);
  }
  return authors;
};

var authors = createAuthors(8); // создаем массив авторов

var createOffers = function (number) { // функция создания массива предложений, принимает на вход количество элементов для создания
  var offers = [];

  for (var i = 0; i < number; i++) {
    var offer = {};
    var type = ['palace', 'flat', 'house', 'bungalo'];
    var checkInOut = ['12:00', '13:00', '14:00'];
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    offer.title = 'Предложение №' + Math.ceil(Math.random() * 100);
    offer.address = Math.ceil(Math.random() * 1000) + ', ' + Math.ceil(Math.random() * 1000);
    offer.price = Math.ceil(Math.random() * 100000);
    offer.type = getRandom(type);
    offer.rooms = Math.ceil(Math.random() * 10);
    offer.guests = Math.ceil(Math.random() * 10);
    offer.checkin = getRandom(checkInOut);
    offer.checkout = getRandom(checkInOut);
    offer.features = getRandom(features);
    offer.description = 'Описание предложения №' + Math.ceil(Math.random() * 100);
    offer.photos = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';

    offers.push(offer);
  }
  return offers;
};

var offers = createOffers(8); // создаем массив предложений

var createLocations = function (number, x) { // функция создания массива локаций, принимает на вход количество элементов для создания и ширину блока
  var locations = [];
  var yMin = 130;
  var yMax = 630;

  for (var i = 0; i < number; i++) {
    var location = {};

    location.x = Math.floor(Math.random() * x);
    location.y = Math.floor(yMin + Math.random() * (yMax - yMin));

    locations.push(location);
  }
  return locations;
};

var screenWidth = 1200;
var pinSize = 62;
var offerBlockWidth = screenWidth - pinSize - (pinSize / 2);
var locations = createLocations(8, offerBlockWidth); // создаем массив локаций

var getAd = function (number, authors, offers, locations) { // функция создания массива объявлений, принимает на вход количество элементов для создания, массив авторов, предложений и локаций
  var ads = [];

  for (var i = 0; i < number; i++) {
    var ad = {};
    ad.author = authors[getRandom(authors)];
    ad.offer = offers[getRandom(offers)];
    ad.location = locations[getRandom(locations)];

    ads.push(ad);
  }
  return ads;
};

var ads = getAd(8, authors, offers, locations); // генерируем массив объявлений

var map = document.querySelector('.map'); 
map.classList.remove('map--faded');

var generatePins = function (number, ads) { // функция генерации меток, принимает на вход количество меток и массив с объявлениями
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); 
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < number; i++) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style = 'left: ' + (ads[i].location.x + (pinSize / 2)) + 'px; top: ' + (ads[i].location.y + (pinSize / 2)) + 'px;';
    pinImg.src = ads[i].author.avatar;
    pinImg.alt = ads[i].offer.title;
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

generatePins(8, ads); // генерируем метки
