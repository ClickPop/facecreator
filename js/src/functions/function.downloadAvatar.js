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
