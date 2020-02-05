'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['https://o0.github.io/assets/images/tokyo/hotel1.jpg', 'https://o0.github.io/assets/images/tokyo/hotel2.jpg', 'https://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var SCREEN_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var DEFAULT_COORDS_Y = 462;
var DEFAULT_COORDS_X = 602;
var LEFT_MOUSE_BUTTON = 0;
var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';


var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
var mapPins = document.querySelector('.map__pins');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var fragment = document.createDocumentFragment();
var offers = [];
var locations = [];
var authors = [];
var ads = [];
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var addressInput = document.getElementById('address');
var roomsNumberInput = form.querySelector('#room_number');
var roomsCapacityInput = form.querySelector('#capacity');
var roomType = form.querySelector('#type');
var roomPrice = form.querySelector('#price');
var roomTimeIn = form.querySelector('#timein');
var roomTimeOut = form.querySelector('#timeout');
var formSubmitButton = form.querySelector('.ad-form__submit');


var activatePage = function () { // функция для активации страницы
  renderAds(8); // генерируем метки
  renderCards(8); // генерирует карточки
  enableFieldsets(); // включаем поля ввода
  form.classList.remove('ad-form--disabled');
  addressInput.value = DEFAULT_COORDS_X + ', ' + DEFAULT_COORDS_Y;
  mapPinMain.removeEventListener('keydown', activatePageOnEnterPress); // удаляем стартовые обработчики
  mapPinMain.removeEventListener('mousedown', activatePageOnLeftClick);
};

var disableFieldsets = function () { // функция для отключения формы
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', '');
  }
};

var enableFieldsets = function () { // функция для включения формы
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled', '');
  }
};

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

var createOffer = function () { // функция создания массива одного предложения
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
  var togglePin = function (currentPin, i) {
    currentPin.addEventListener('click', function () {
      var cards = document.querySelectorAll('.map__card');
      for (var j = 0; j < cards.length; j++) {
        cards[j].classList.add('hidden');
      }
      document.querySelector('.map__card:nth-child(' + (i + 2) + ')').classList.remove('hidden');
    });
  };
  for (var i = 0; i < number; i++) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style = 'left: ' + (ads[i].location.x + (PIN_WIDTH / 2)) + 'px; top: ' + (ads[i].location.y - PIN_HEIGHT) + 'px;';
    pinImg.src = ads[i].author.avatar;
    pinImg.alt = ads[i].offer.title;
    togglePin(pin, i);
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

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

var renderCard = function (number) { // функция отрисовки карточки, принимает на вход элемент массива ads
  card.querySelector('.popup__title').textContent = ads[number].offer.title;
  card.querySelector('.popup__text--address').textContent = ads[number].offer.address;
  card.querySelector('.popup__text--price').textContent = (ads[number].offer.price) + '₽/ночь';
  card.querySelector('.popup__type').textContent = getHouseType(number);
  card.querySelector('.popup__text--capacity').textContent = ads[number].offer.rooms + getRoomsFor(number) + ads[number].offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[number].offer.checkin + ', выезд до ' + ads[number].offer.checkout;
  getFeatures(number);
  card.querySelector('.popup__description').textContent = ads[number].offer.description;
  getPhotos(number);
  card.querySelector('.popup__avatar').src = ads[number].author.avatar;

  return card;
};

var renderCards = function (number) { // функция создания карточек объявлений
  var closeCard = function (currentCard) { // функция закрытия карточек
    currentCard.querySelector('.popup__close').addEventListener('click', function () {
      currentCard.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESCAPE_KEY) {
        currentCard.classList.add('hidden');
      }
    });
  };
  for (var i = 0; i < number; i++) {
    card = cardTemplate.cloneNode(true);
    var generatedCard = renderCard(i);
    generatedCard.classList.add('hidden');
    closeCard(generatedCard);
    fragment.appendChild(generatedCard);
  }
  mapPins.after(fragment);
};

var activatePageOnLeftClick = function (evt) { // активация страницы
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activatePage();
  }
};

var activatePageOnEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
};

// ^^^^^^^^^^^^^ выше объявления, ниже вызовы vvvvvvvvvvvvvv

disableFieldsets(); // отключает форму при загрузке страницы

mapPinMain.addEventListener('mousedown', activatePageOnLeftClick); // обработчик нажатия лкм по стартовому пину
mapPinMain.addEventListener('keydown', activatePageOnEnterPress); // обработчик нажатия энтера по стартовому пину


formSubmitButton.addEventListener('click', function () { // обработчик клика по кнопке отправки формы
  if ((roomsNumberInput.value === '100') && (roomsCapacityInput.value !== '0')) { // валидация комнат и гостей
    roomsNumberInput.setCustomValidity('Пожалуйста, выберите вариант "не для гостей"');
  } else if (roomsNumberInput.value < roomsCapacityInput.value) {
    roomsNumberInput.setCustomValidity('Количество комнат не может быть меньше гостей!');
  } else {
    roomsNumberInput.setCustomValidity('');
  }

  if (roomType.value === 'bungalo') { // валидация цены
    roomPrice.setAttribute('min', 0);
  } else if (roomType.value === 'flat') {
    roomPrice.setAttribute('min', 1000);
  } else if (roomType.value === 'house') {
    roomPrice.setAttribute('min', 5000);
  } else if (roomType.value === 'palace') {
    roomPrice.setAttribute('min', 10000);
  }
});

roomTimeIn.addEventListener('change', function () { // валидация времени
  roomTimeOut.value = roomTimeIn.value;
});

roomTimeOut.addEventListener('change', function () {
  roomTimeIn.value = roomTimeOut.value;
});
