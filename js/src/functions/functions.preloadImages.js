var preloader = [];

function registerPreload(key) {
  console.log("loaded", key, this, preloader[key]);
}

function preloadImages() {
  $.ajax({
    url: 'xhrImageList.php',
    success: function(response) {
      var files = [];
      var loaderKey = 0;
      if (typeof response === "object"
      && response.hasOwnProperty("data")
      && response.data instanceof Array
      && response.data.length > 0) {
        files = response.data;
        for (fileKey in files) {
          if (typeof files[fileKey] === "string" && files[fileKey].length > 0) {
            loaderKey = preloader.push(new Image()) - 1;
            preloader[loaderKey].onload = registerPreload(loaderKey);
            preloader[loaderKey].src = files[fileKey];
          }
        }
      }
    }
  });
}
