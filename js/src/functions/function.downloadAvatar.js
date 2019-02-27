function downloadAvatar() {
  var faceHtml = document.getElementById('faceContainer'),
    $faceImage = $('#faceImage').empty(),
    $button = $(this),
    $link = null;
  html2canvas(faceHtml, {logging: false, allowTain: true, backgroundColor: null}).then(function(canvas) {
      $('#download').prop("disabled", true);

      try {
        canvas.toBlob(function(blob) {
          $link = $("<a>download</a>")
            .appendTo(".hiddenLink")
            .attr("href", "#")
            .on("click", function(e) {
              e.preventDefault();
              saveAs(blob, "FriendlyFace.png")
            }).trigger("click");
          $link.remove();
          $link = null;
        });
      } catch(e) {
        console.error("Error: Tainted Canvas... Are you running locally?");
        alert('Error: Are you running locally?');
      }

      saveImage();

      $('#download').prop("disabled", false).removeProp("disabled");
  });
}

function saveImage(canvas) {
  var imageData = null;
  try {
    imageData = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");
  } catch(e) {}

  if (imageData !== null) {
    $.ajax({
      url: 'save_image.php',
      data: {
        data: imageData
      },
      type: 'post'
    });
  }
}
