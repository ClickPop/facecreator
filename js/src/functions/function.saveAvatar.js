function saveAvatar(resizedCanvas, fullCanvas = false) {
  var resizedImageData = null,
  fullImageData = null,
  downloadHref = false;

  fullCanvas = (typeof fullCanvas === typeof resizedCanvas) ? fullCanvas : false;

  try {
    resizedImageData = resizedCanvas.toDataURL("image/png").replace("data:image/png;base64,", "");
    fullImageData = fullCanvas.toDataURL("image/png").replace("data:image/png;base64,", "");
  } catch(e) {
    console.error("Error: Tainted canvas, running locally?");
    alert("There was an error saving your file. Try again later.");
    resizedImageData = null;
  }

  if (resizedImageData !== null && fullImageData !== null) {
    $.ajax({
      url: 'save_image.php',
      data: {
        resizedData: resizedImageData,
        fullData: fullImageData
      },
      type: 'post',
      success: function(response) {
        downloadHref = (typeof response === "object"
        && response.hasOwnProperty("download")
        && response.download.search("generated") !== -1) ?
        response.download : false;

        if (downloadHref !== false) {
          $link = $("<a download>download</a>")
          .appendTo(".hiddenLink")
          .attr("target", "_blank")
          .attr("href", downloadHref)
          .get(0).click();
          $link.remove();
          $link = null;
        } else {
          console.error("Error preparing file for download.");
          alert('Unable to prepare file for download. Please try again later.');
        }
      }
    });
  }
}
