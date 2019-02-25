$(document).ready(function () {
  buildControls();
  $('#regenerate').on('click', randomFace).trigger('click');
  $('#download').on('click', downloadAvatar);
});
