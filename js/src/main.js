var choices = {
  bg: 9,
  face: 4,
  skin: 5,
  beard: 3,
  hair: 9,
  hairColor: 5,
  mouth: 8,
  nose: 8,
  eyes: 8,
  brows: 4
};

// Fill in select boxes for various parts.
// buildSelect(beard, 3) will fill the beard selector with 3 options.
function buildSelect(part,num) {
  var $obj = $('#select_' + part)
    .attr("type", "range")
    .attr("min", 1)
    .attr("max", num);
}

// Make a face from the values in the dropdowns.
function changeSlider() {
  $(this).rangeslider("update", true);
  buildFace();
}

//Updates slider value & gemerates face while dragging slider
function updateSlider(position, value, element) {
  var $this = $(element).val(value).change();
  buildFace();
}

//Build face images based on values
function buildFace() {
  var thebg = $('#select_bg').val(),
      theface = $('#select_face').val(),
      theskin = $('#select_skin').val(),
      thenose = $('#select_nose').val(),
      themouth = $('#select_mouth').val(),
      theeyes = $('#select_eyes').val(),
      thenose = $('#select_nose').val(),
      thehairColor = $('#select_hairColor').val(),
      thehair = $('#select_hair').val(),
      thebeard = $('#select_beard').val(),
      thebrows = $('#select_brows').val();

  $('#faceContainer').empty();
  $('#faceContainer').append(`
      <img id="bg" src="img/bg/bg_0${thebg}.png" class="image" />
      <img id="face" src="img/face/face_0${theface}_0${theskin}.png" class="image" />
      <img id="ear" src="img/ear/ear_0${theskin}.png" class="image" />
      <img id="nose" src="img/nose/nose_0${thenose}.png" class="image" />
      <img id="mouth" src="img/mouth/mouth_0${themouth}.png" class="image" />
      <img id="eyes" src="img/eyes/eyes_0${theeyes}.png" class="image" />
      <img id="brows" src="img/brows/brows_0${thebrows}_0${thehairColor}.png" class="image" />
    `);
  if($('#check_beard').is(':checked')) {
    $('#faceContainer').append(`
        <img id="beard" src="img/beard/beard_0${thebeard}_0${thehairColor}.png" class="image" />
      `);
  }
  if($('#check_hair').is(':checked')) {
    $('#faceContainer').append(`
        <img id="hair" src="img/hair/hair_0${thehair}_0${thehairColor}.png" class="image" />
      `);
  }
}

//Set a random slider value
function randomSliderValue() {
  var $this = $(this),
    max = $this.attr("max"),
    min = 1,
    random = null;

  random = Math.floor(Math.random() * (max - min + 1)) + min;
  $this.val(random).rangeslider("update", true);
}

//Set a random checkbox value
function randomCheckValue() {
  var $this = $(this)
  $this.attr('checked', (Math.random() >= 0.5) ? true : false);
}

// Make a random face.
function randomFace() {
  $('.slider').each(randomSliderValue);
  $('.checks').each(randomCheckValue);
  buildFace();
}

//Init rangeslider object & handle applicable emoji
function initRangeSlider() {
  var $this = $(this),
    handle = ($this.data("handle")),
    args = (typeof handle === "string") ?
      {polyfill: false, handleClass: 'rangeslider__handle emoji ' + handle, onSlide: function(p, v) {updateSlider(p, v, this)}}:
      {polyfill: false, onSlide: function(p, v) {updateSlider(p, v, this)}};
  $this.rangeslider(args);
}

$(document).ready(function () {
  // Fill options in select boxes.
  $.each( choices, function( key, value ) {
    buildSelect(key, value);
  });
  // $(".slider").slider();
  $('input[type=range]').each(initRangeSlider).on('change', changeSlider);
  $('.checks').on('change', buildFace);
  $('#regenerate').on('click', randomFace).trigger('click');
})
