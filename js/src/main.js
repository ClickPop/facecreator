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

//Format number value with leading 0 if needed
function formatValue(n) {
  n = parseInt(n);
  n = isNaN(n) ? 1 : n;
  return n > 9 ? "" + n: "0" + n;
}
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
  var $face = $('#faceContainer').empty(),
    faceHtml = $face.get(0),
    faceCanvas = document.getElementById("faceCanvas"),
    faces = {
      bg: {
        show: true,
        value: formatValue($('#select_bg').val()),
        color: null
      },
      face: {
        show: true,
        value: formatValue($('#select_face').val()),
        color: formatValue($('#select_skin').val())
      },
      ear: {
        show: true,
        value: null,
        color: formatValue($('#select_skin').val())
      },
      nose: {
        show: true,
        value: formatValue($('#select_nose').val()),
        color: null
      },
      mouth: {
        show: true,
        value: formatValue($('#select_mouth').val()),
        color: null
      },
      eyes: {
        show: true,
        value: formatValue($('#select_eyes').val()),
        color: null
      },
      brows: {
        show: true,
        value: formatValue($('#select_brows').val()),
        color: formatValue($('#select_hairColor').val())
      },
      beard: {
        show: $('#check_hair').is(':checked') ? true : false,
        value: formatValue($('#select_beard').val()),
        color: formatValue($('#select_hairColor').val())
      },
      hair: {
        show: $('#check_hair').is(':checked') ? true : false,
        value: formatValue($('#select_hair').val()),
        color: formatValue($('#select_hairColor').val())
      }
    };

  $.each(faces, function(key, part) {
    var srcFormat1 = "img/{0}/{0}_{1}.png",
      srcFormat2 = "img/{0}/{0}_{1}_{2}.png",
      src = null,
      $obj = null;

    if (part.value !== null && part.color !== null) {
      src = srcFormat2.format(key, part.value, part.color);
    }  else if (part.value !== null && part.color === null) {
      src = srcFormat1.format(key, part.value);
    } else if (part.value === null && part.color !== null) {
      src = srcFormat1.format(key, part.color);
    }
    if (src !== null && part.show) {
      $obj = $("<img>").appendTo($face)
        .addClass("image")
        .attr("id", key)
        .attr("src", src)
    }
  });
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

function downloadAvatar() {
  var rVal = false,
    faceHtml = document.getElementById('faceContainer'),
    $faceImage = $('#faceImage').empty();
  html2canvas(faceHtml, {logging: false}).then(function(canvas) {
      var image = null;
      try {
        image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = image;
      } catch(e) {
        image = null;
        console.error("Error: Tainted Canvas... Are you running locally?");
        alert('Error: Are you running locally?');
      }

      if (image !== null) {
        $(this).attr("href", image)
          .attr("download", "avatar.png");
        rVal = true;
      } else {
        $(this).attr("href", "#");
      }
  });

  return rVal;
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
  $('#download').on('click', downloadAvatar);
});
