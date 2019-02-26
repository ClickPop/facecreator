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
  var blob = null;

  try {
    blob = canvas.toBlob();
  } catch(e) {
    imageData = null;
    console.error("Error: Tainted Canvas... Are you running locally?");
    alert('Error: Are you running locally?');
  }

  if (blob !== null) {
    $link = $("<a>download</a>").appendTo(".hiddenLink");
    $link.attr("href", "#")
      .get(0).on("click", function(e) {
        e.preventDefault();
        FileSaver.saveAs(blob, "FriendFace.png")
      }).trigger("click");
    $link.remove();
    $link = null;
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
