'use strict';
// ------------------ модуль создания и отрисовки карточки объявлений
(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);

  var getHouseType = function (ad) {
    if (ad.offer.type === 'flat') {
      return 'Квартира';
    } else if (ad.offer.type === 'bungalo') {
      return 'Бунгало';
    } else if (ad.offer.type === 'house') {
      return 'Дом';
    } else if (ad.offer.type === 'palace') {
      return 'Дворец';
    }
    return ad.offer.type;
  };
  var getRoomsFor = function (ad) {
    if (ad.offer.rooms === 1) {
      return ' комната для ';
    } else if ((ad.offer.rooms === 2) || (ad.offer.rooms === 3) || (ad.offer.rooms === 4)) {
      return ' комнаты для ';
    }
    return ' комнат для ';
  };
  var renderFeatures = function (ad) { // проверяем массив с удобствами
    for (var i = 0; i < window.offer.FEATURES.length; i++) {
      if (ad.offer.features.indexOf(window.offer.FEATURES[i]) < 0) {
        card.querySelector('.popup__feature--' + window.offer.FEATURES[i]).classList.add('visually-hidden');
      } else {
        card.querySelector('.popup__feature--' + window.offer.FEATURES[i]).classList.remove('visually-hidden');
      }
    }
  };
  var renderPhotos = function (ad) { // проверяем массив с фото и отрисовываем
    var photoCopy = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    var cards = card.querySelectorAll('.popup__photo');
    for (var j = 0; j < cards.length; j++) {
      cards[j].remove();
    }
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var photo = photoCopy.cloneNode(true);
      photo.src = ad.offer.photos[i];
      card.querySelector('.popup__photos').append(photo);
    }
  };

  var renderCard = function (ad) { // функция отрисовки карточки, принимает на вход i-ый элемент массива ads
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = (ad.offer.price) + '₽/ночь';
    card.querySelector('.popup__type').textContent = getHouseType(ad);
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + getRoomsFor(ad) + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    renderFeatures(ad);
    card.querySelector('.popup__description').textContent = ad.offer.description;
    renderPhotos(ad);
    card.querySelector('.popup__avatar').src = ad.author.avatar;

    return card;
  };

  window.card = {
    renderCard: renderCard,
    getMapCardElement: card
  };

})();
