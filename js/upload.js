'use strict';
// ------------------ модуль загрузки данных
(function () {

  var form = document.querySelector('.ad-form');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onSuccess = function () {

    var removeSuccessMessage = function () {
      successMessage.remove();
    };

    var removeSuccessMessageOnEscPress = function (evt) {
      window.map.isEscEvent(evt, removeSuccessMessage);
      document.removeEventListener('keydown', removeSuccessMessageOnEscPress);
    };

    form.reset();
    window.init.deactivatePage();
    main.append(successMessage);
    successMessage.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', removeSuccessMessageOnEscPress);
  };

  window.upload = {
    onSuccess: onSuccess
  };

})();
