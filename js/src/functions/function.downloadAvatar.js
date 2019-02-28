function downloadAvatar(element) {
  var $this = $(element),
    avatarSize = $this.data("size"),
    $faceContainer = $('#faceContainer').eq(0);
    faceHtml = $faceContainer.get(0);
    $faceImage = $('#faceImage').empty(),
    $button = $(this),
    $link = null,
    resizedCanvas = null,
    downloadHref = null;

  avatarSize = (isNaN(avatarSize)) ? 250 : avatarSize;
  html2canvas(faceHtml, {logging: false, allowTain: true, backgroundColor: null}).then(function(canvas) {
      resizedCanvas = resizeCanvas(canvas, avatarSize, avatarSize);
      saveAvatar(resizedCanvas, canvas);
  });


}
