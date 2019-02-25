//Build face images based on values
function getCurrentFaceData() {
  flatObjects = {};
  $.each(sections, function(section, sectionData) {
    $.each(sectionData.options, function(option, optionData) {
      $field = $("#select_" + option);
      $toggle = optionData.hasToggle ? $("#toggle_" + option) : false;
      $hiddenBy = optionData.hiddenBy ? $("#toggle_" + hiddenBy) : false;

      shown = true;
      if ($toggle !== false && $toggle.length) {
        shown = $toggle.is(":checked") ? true : false;
      }
      if ($hiddenBy !== false && $hiddenBy.length) {
        shown = $hiddenBy.is(":checked") ? false : shown;
      }
    });
  });
}

function buildFace() {
  var $face = $('#faceContainer').empty(),
    faceHtml = $face.get(0),
    faceCanvas = document.getElementById("faceCanvas");
    faceSettings = currentFaceData();

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

function downloadAvatar() {
  var faceHtml = document.getElementById('faceContainer'),
    $faceImage = $('#faceImage').empty(),
    $button = $(this),
    $link = null;
  html2canvas(faceHtml, {logging: false, backgroundColor: null}).then(function(canvas) {
      var image = null;
      try {
        image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      } catch(e) {
        image = null;
        console.error("Error: Tainted Canvas... Are you running locally?");
        alert('Error: Are you running locally?');
      }

      if (image !== null) {
        $('.hiddenLink').empty();
        $link = $("<a>download</a>").appendTo(".hiddenLink");
        $link.attr("href", image)
          .attr("download", "avatar.png")
          .get(0).click();
        $link.remove();
      }
      $link = null;
  });
}

$(document).ready(function () {
  // Fill options in select boxes.
  // $.each( choices, function( key, value ) {
  //   buildSelect(key, value);
  // });
  //
  // $('input[type=range]').each(initRangeSlider).on('change', changeSlider);
  // $('.checks').on('change', buildFace);
  // $('#regenerate').on('click', randomFace).trigger('click');
  // $('#download').on('click', downloadAvatar);

  buildControls();
  $('#regenerate').on('click', randomFace).trigger('click');
  $('#download').on('click', downloadAvatar);
});
