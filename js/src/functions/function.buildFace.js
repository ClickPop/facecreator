function buildFace() {
  var $face = $('#faceContainer').empty(),
    srcFormat1 = "img/dist/{0}/{0}_{1}.png",
    srcFormat2 = "img/dist/{0}/{0}_{1}_{2}.png",
    faceHtml = $face.get(0),
    faceCanvas = document.getElementById("faceCanvas");
    faceSettings = getCurrentFaceData();

  $.each(faceSettings, function(key, part) {
    var src = null,
      $obj = null,
      currentColor = part.currentColor,
      currentValue = part.currentValue,
      show = part.show;

    if (currentColor !== null & currentValue !== null) {
      src = srcFormat2.format(key, currentValue, currentColor);
    } else if (currentColor === null && currentValue !== null) {
      src = srcFormat1.format(key, currentValue);
    } else if (currentColor !== null && currentValue === null) {
      src = srcFormat1.format(key, currentColor);
    }

    if (src !== null && part.show) {
      $obj = $("<img>").appendTo($face)
        .addClass("image")
        .attr("id", key)
        .attr("src", src)
    }
  });
}
