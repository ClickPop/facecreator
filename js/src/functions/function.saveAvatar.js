function savaAvatar(canvas) {
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
      type: 'post',
      success: function(response) {}
    });
  }
}
