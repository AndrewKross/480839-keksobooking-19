'use strict';

(function () {

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var xhr;

  var serverHandler = function (onLoad, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
  };

  var sendRequest = function (method, url, data) {
    xhr.open(method, url);
    xhr.send(data);
  };


  window.backend = {
    load: function (onLoad, onError) {
      serverHandler(onLoad, onError);
      sendRequest('GET', LOAD_URL);
    },
    save: function (data, onLoad, onError) {
      serverHandler(onLoad, onError);
      sendRequest('POST', UPLOAD_URL, data);
    },
  };
})();
