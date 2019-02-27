var preloader = Array();
var preloadCount = 0;
var preloadedCount = 0;
var $loadyBar = null;
var $loady = null;
var preloadPercent = 0;

function setPreloadBarPercentage(value) {
  $loadyBar.attr("aria-valuenow", value).css("width", value + "%");
}

function fxPreload() {
  while (preloadPercent < 49) {
    preloadPercent++;
    setPreloadBarPercentage(preloadPercent);
    if (preloadPercent < 49) {
      setTimeout(fxPreload, Math.floor(Math.random()*(10-5+1)+5))
    } else {
      $loady.find('.content').text("Loading images...");
      preloadImages();
    }
  }
}

function registerPreload(key) {
  preloader[key] = null;
  preloadedCount++;
  percentage = (Math.round((preloadedCount / preloadCount) * 50) + 50);
  setPreloadBarPercentage(percentage);
  if (preloadCount > 0 && preloadedCount === preloadCount) {
    $('body').addClass('loaded');
    $loady.fadeOut(250);
  }
}

function preloadImages() {
  $.ajax({
    url: 'xhrImageList.php',
    success: function(response) {
      var files = null;
      var loaderKey = 0;
      if (typeof response === "object"
      && response.hasOwnProperty("data")
      && response.data instanceof Array
      && response.data.length > 0) {
        files = response.data;

        if (preloader.length > 0) {
          for (tempKey in preloader) {
            if (typeof preloader[tempKey] === "object" && preloader[tempKey] instanceof Image) {
              preloader[tempKey].src = "";
              preloader[tempKey] = null;
            }
          }
          preloader = Array();
        }
        preloadCount = files.length;
        preloadedCount = 0;

        for (fileKey in files) {
          if (typeof files[fileKey] === "string" && files[fileKey].length > 0) {
            loaderKey = preloader.push(new Image()) - 1;
            preloader[loaderKey].onload = function() { setTimeout(registerPreload(loaderKey), 5); }
            preloader[loaderKey].src = files[fileKey];
          }
        }
      }
    }
  });
}

function initializePreload() {
  preloadPercent = 0;
  $loady = $('.loady');
  $loadyBar = $loady.find('.progress-bar');
  setPreloadBarPercentage(preloadPercent);
  fxPreload();
}
