'use strict';
// ------------------ модуль фильтра
(function () {

  var LOW_PRICE_MIN = 0;
  var LOW_PRICE_MAX = 9999;
  var MEDIUM_PRICE_MIN = 10000;
  var MEDIUM_PRICE_MAX = 49999;
  var HIGHT_PRICE_MIN = 50000;
  var HIGHT_PRICE_MAX = 1000000;

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input');
  var mapPins = document.querySelector('.map__pins');
  var filtredData = window.data.adsData;
  var card = window.card.getMapCardElement;

  var getFiltredData = function (filter, value) {
    filtredData = window.data.adsData.filter(function (it) {
      return (it.offer[filter] === value);
    });
    return filtredData;
  };

  var filterByHousingType = function () {

    switch (housingType.value) {
      case 'bungalo':
        return getFiltredData('type', 'bungalo');
      case 'flat':
        return getFiltredData('type', 'flat');
      case 'house':
        return getFiltredData('type', 'house');
      case 'palace':
        return getFiltredData('type', 'palace');
      case 'any':
        filtredData = window.data.adsData;
        return filtredData;
    }
    return false;
  };

  var filterByHousingPrice = function () {

    var filterBy = function (priceMin, priceMax) {
      filtredData = window.data.adsData.filter(function (it) {
        return (it.offer.price >= priceMin && it.offer.price <= priceMax);
      });
      return filtredData;
    };

    switch (housingPrice.value) {
      case 'low':
        return filterBy(LOW_PRICE_MIN, LOW_PRICE_MAX);
      case 'middle':
        return filterBy(MEDIUM_PRICE_MIN, MEDIUM_PRICE_MAX);
      case 'high':
        return filterBy(HIGHT_PRICE_MIN, HIGHT_PRICE_MAX);
      case 'any':
        filtredData = window.data.adsData;
        return filtredData;
    }
    return false;
  };

  var filterByHousingRooms = function () {

    switch (housingRooms.value) {
      case '1':
        return getFiltredData('rooms', 1);
      case '2':
        return getFiltredData('rooms', 2);
      case '3':
        return getFiltredData('rooms', 3);
      case 'any':
        filtredData = window.data.adsData;
        return filtredData;
    }
    return false;
  };

  var filterByHousingGuests = function () {

    switch (housingGuests.value) {
      case '1':
        return getFiltredData('guests', 1);
      case '2':
        return getFiltredData('guests', 2);
      case '0':
        return getFiltredData('guests', 0);
      case 'any':
        filtredData = window.data.adsData;
        return filtredData;
    }
    return false;
  };

  var filterByHousingFeatures = function () {

    var filterBy = function (feature) {
      filtredData = filtredData.filter(function (it) {
        return (it.offer.features.includes(feature));
      });
      return filtredData;
    };

    housingFeatures.forEach(function (it) {
      if (it.checked) {
        filtredData = filterBy(it.value);
      }
    });
    return filtredData;
  };

  var filterForm = window.debounce(function () {
    card.classList.add('hidden');
    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (it) {
      it.remove();
    });

    var filtredArray = filterByHousingType().filter(function (it) {
      return (filterByHousingPrice().includes(it) &&
      filterByHousingRooms().includes(it) &&
      filterByHousingGuests().includes(it) &&
      filterByHousingFeatures().includes(it));
    });

    window.pin.createPins(filtredArray); // создаем метки
    window.map.togglePin(filtredArray); // добавляем обработчики пинам и связываем с карточкой
  });

  mapFiltersForm.addEventListener('change', filterForm);

})();
