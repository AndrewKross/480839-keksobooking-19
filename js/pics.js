'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreview = document.querySelector('.ad-form__photo');

  var setPic = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.src) {
          preview.src = reader.result;
        } else {
          preview.style.background = 'url(' + reader.result + ')';
          preview.style.backgroundSize = 'cover';
        }

      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', setPic.bind(null, avatarChooser, avatarPreview));
  housePhotoChooser.addEventListener('change', setPic.bind(null, housePhotoChooser, housePhotoPreview));
})();
