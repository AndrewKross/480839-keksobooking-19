'use strict';
// ------------------ модуль фильтра
(function () {

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  var mapPins = document.querySelector('.map__pins');
  var filtredData = window.data.getAdsElement;
  var card = window.card.getMapCardElement;

  var filterByHousingType = function () {
    card.classList.add('hidden');

    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (it) {
      it.remove();
    });

    var filterBy = function (houseType) {
      filtredData = window.data.getAdsElement.slice().filter(function (it) {
        return (it.offer.type === houseType);
      });
      return filtredData;
    };

    var getFiltredArray = function () {
      switch (housingType.value) { // валидация цены
        case ('bungalo'):
          return filterBy('bungalo');
        case ('flat'):
          return filterBy('flat');
        case ('house'):
          return filterBy('house');
        case ('palace'):
          return filterBy('palace');
        case ('any'):
          filtredData = window.data.getAdsElement;
          return filtredData;
      }
      return filtredData;
    };

    window.pin.createPins(getFiltredArray()); // создаем метки
    window.map.togglePin(filtredData); // добавляем обработчики пинам и связываем с карточкой

    return filtredData;
  };

  housingType.addEventListener('change', filterByHousingType);

})();
