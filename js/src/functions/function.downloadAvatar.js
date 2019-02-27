function downloadAvatar(element) {
  var $this = $(element),
    avatarSize = $this.data("size"),
    $faceContainer = $('#faceContainer').eq(0);
    faceHtml = $faceContainer.get(0);
    $faceImage = $('#faceImage').empty(),
    $button = $(this),
    $link = null,
    resizedCanvas = null;

  avatarSize = (isNaN(avatarSize)) ? 250 : avatarSize;
  html2canvas(faceHtml, {logging: false, allowTain: true, backgroundColor: null}).then(function(canvas) {
      resizedCanvas = resizeCanvas(canvas, avatarSize, avatarSize);

      try {
        resizedCanvas.toBlob(function(blob) {
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

      saveAvatar(canvas);
  });
}
