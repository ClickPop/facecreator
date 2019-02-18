var choices = {
  bg: 9,
  face: 4,
  skin: 5,
  beard: 3,
  hair: 7,
  hairColor: 5,
  mouth: 6,
  nose: 6,
  eyes: 6,
  brows: 3
};

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


// Make a random face.
function randomFace() {
  $('#select_bg').val(Math.floor(Math.random() * choices.bg) + 1);
  $('#select_face').val(Math.floor(Math.random() * choices['face']) + 1);
  $('#select_skin').val(Math.floor(Math.random() * choices.skin) + 1);
  $('#select_mouth').val(Math.floor(Math.random() * choices.mouth) + 1);
  $('#select_nose').val(Math.floor(Math.random() * choices.nose) + 1);
  $('#select_eyes').val(Math.floor(Math.random() * choices.eyes) + 1);
  $('#select_hair').val(Math.floor(Math.random() * choices.hair) + 1);
  $('#select_hairColor').val(Math.floor(Math.random() * choices.hairColor) + 1);
  $('#select_brows').val(Math.floor(Math.random() * choices.brows) + 1);
  $('#select_beard').val(Math.floor(Math.random() * choices.beard) + 1);
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
$.each( choices, function( key, value ) {
  buildSelect(key, value);
});
$('#regenerate').on('click', function(){ randomFace(); }).trigger('click');