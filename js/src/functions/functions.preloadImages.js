var preloader = [];

function registerPreload(key) {
  console.log("loaded", key, this, preloader[key]);
}

function preloadImages() {
  $.ajax({
    url: 'xhrImageList.php',
    success: function(response) {
      var files = [];
      var tempImage = null;
      var key = 0;
      if (typeof response === "object"
      && response.hasOwnProperty("data")
      && response.data instanceof Array
      && response.data.length > 0) {
        files = response.data;
        for (file in files) {
          key = preloader.push(new Image()) - 1;
          preloader[key].onload = registerPreload(key);
          preloader[key].src = file;
        }
      }
    }
  });
}
