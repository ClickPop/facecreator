var bg = 9,
    face= 4,
    skin = 5,
    beard = 3,
    hair = 7,
    hairColor = 5,
    mouth = 6,
    nose = 6,
    eyes = 6,
    brows = 3,
    beardChoice = 2,
    hairChoice = 10;


// Fill in select boxes for various parts.
// buildSelect(beard, 3) will fill the beard selector with 3 options.
function buildSelect(part,num) {
  for(i=1;i<=num;i++) {
    $('#select_' + part).append(`<option value="${i}">${i}</option>`);
  }

  $('#select_' + part).change(function(){
    buildFace();
  });

  $('.checks').change(function(){
    buildFace();
  });
}


// Make a face from the values in the dropdowns.
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
      thebrows = $('#select_beard').val();

  $('#faceContainer').html('');
  $('#faceContainer').append(`
      <img id="bg" src="bg/bg_0${thebg}.png" class="image" />
      <img id="face" src="face/face_0${theface}_0${theskin}.png" class="image" />
      <img id="ear" src="ear/ear_0${theskin}.png" class="image" />
      <img id="nose" src="nose/nose_0${thenose}.png" class="image" />
      <img id="mouth" src="mouth/mouth_0${themouth}.png" class="image" />
      <img id="eyes" src="eyes/eyes_0${theeyes}.png" class="image" />
      <img id="brows" src="brows/brows_0${thebrows}_0${thehairColor}.png" class="image" />
    `);
  if($('#check_beard').is(':checked')) {
    $('#faceContainer').append(`
        <img id="beard" src="beard/beard_0${thebeard}_0${thehairColor}.png" class="image" />
      `);
  }
  if($('#check_hair').is(':checked')) {
    $('#faceContainer').append(`
        <img id="hair" src="hair/hair_0${thehair}_0${thehairColor}.png" class="image" />
      `);
  }
}


// Make a random face.
function randomFace() {
  $('#select_bg').val(Math.floor(Math.random() * bg) + 1);
  $('#select_face').val(Math.floor(Math.random() * face) + 1);
  $('#select_skin').val(Math.floor(Math.random() * skin) + 1);
  $('#select_mouth').val(Math.floor(Math.random() * mouth) + 1);
  $('#select_nose').val(Math.floor(Math.random() * nose) + 1);
  $('#select_eyes').val(Math.floor(Math.random() * eyes) + 1);
  $('#select_hair').val(Math.floor(Math.random() * hair) + 1);
  $('#select_hairColor').val(Math.floor(Math.random() * hairColor) + 1);
  $('#select_brows').val(Math.floor(Math.random() * brows) + 1);
  $('#select_beard').val(Math.floor(Math.random() * beard) + 1);
  if(Math.floor(Math.random() * 2) == 1) {
    $('#check_beard').attr('checked', true)
  } else {
    $('#check_beard').attr('checked', false)
  }
  if(Math.floor(Math.random() * 2) == 1) {
    $('#check_hair').attr('checked', true)
  } else {
    $('#check_hair').attr('checked', false)
  }

  buildFace();
}


// Fill options in select boxes.
buildSelect('bg', bg);
buildSelect('face', face);
buildSelect('skin', skin);
buildSelect('mouth', mouth);
buildSelect('nose', nose);
buildSelect('eyes', eyes);
buildSelect('hair', hair);
buildSelect('hairColor', hairColor);
buildSelect('brows', brows);
buildSelect('beard', beard);

randomFace();
$('#regenerate').on('click', function(){ randomFace(); });
