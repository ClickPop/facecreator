function downloadAvatar() {
  var faceHtml = document.getElementById('faceContainer'),
    $faceImage = $('#faceImage').empty(),
    $button = $(this),
    $link = null;
  html2canvas(faceHtml, {logging: false, backgroundColor: null}).then(function(canvas) {
      $('#download').prop("disabled", true);
      setTimeout(triggerDownload(canvas), 700);
  });
}

function triggerDownload(canvas) {
  try {
    canvas.toBlob(function(blob) {
      $link = $("<a>download</a>").appendTo(".hiddenLink");
      $link.attr("href", "#")
        .get(0).on("click", function(e) {
          e.preventDefault();
          saveAs(blob, "FriendlyFace.png")
        }).trigger("click");
      $link.remove();
      $link = null;
    });
  } catch(e) {
    imageData = null;
    console.error("Error: Tainted Canvas... Are you running locally?");
    alert('Error: Are you running locally?');
  }
}

function triggerDownloadOld(canvas) {
  var imageData = null;
  try {
    imageData = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");
  } catch(e) {
    imageData = null;
    console.error("Error: Tainted Canvas... Are you running locally?");
    alert('Error: Are you running locally?');
  }

  if (imageData !== null) {
    $.ajax({
      url: 'save_image.php',
      data: {
        data: imageData
      },
      type: 'post',
      success: function (response) {
        var linkHref = null;
        if (typeof response === "string" && response.indexOf("generated") !== -1) {
          $('.hiddenLink').empty();
          linkHref = "download.php?f=" + encodeURIComponent(response);
          $link = $("<a>download</a>").appendTo(".hiddenLink");
          $link.attr("href", linkHref)
            .get(0).click();
          $link.remove();
          $link = null;
        }
      }
    });
  }
  $('#download').prop("disabled", false).removeProp("disabled");
}


html2canvas(document.getElementById('faceContainer'), {logging: false, backgroundColor: null}).then(function(canvas) {
    console.log(canvas);
    canvas.toBlob(function(blob) {wow = blob;});
});
