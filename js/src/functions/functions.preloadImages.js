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
  var files = getPreloaderImages();

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

function initializePreload() {
  preloadPercent = 0;
  $loady = $('.loady');
  $loadyBar = $loady.find('.progress-bar');
  setPreloadBarPercentage(preloadPercent);
  fxPreload();
}

function findOption(searchKey) {
  var section = null,
    option = null,
    rVal = false;
  for (sectionKey in sections) {
    var section = sections[sectionKey];

    if (typeof section === "object"
    && section.hasOwnProperty("options")
    && typeof section.options === "object") {

      if (section.options.hasOwnProperty(searchKey)
      && typeof section.options[searchKey] === "object") {
        rVal = section.options[searchKey];
      }
    }
  }

  return rVal;
}

function getOptionImages(key, option) {

  var choices = null,
    colors = null,
    colorsOption = null,
    srcFormat1 = "img/dist/{0}/{0}_{1}.png",
    srcFormat2 = "img/dist/{0}/{0}_{1}_{2}.png",
    images = Array();

  if (typeof key === "string"
  && key.length > 0
  && typeof option === "object") {


    choices = (option.hasOwnProperty("choices")
    && typeof option.choices === "number"
    && option.choices > 0) ? option.choices : false;

    //Skip if a color selector
    if (!(option.hasOwnProperty("isColors") && option.isColors)) {
      //Has Colors
      if (option.hasOwnProperty("hasColors") && option.hasColors) {
        if (option.hasOwnProperty("colorsKey")
        && typeof option.colorsKey === "string"
        && option.colorsKey.length > 0) {
          colorsOption = findOption(option.colorsKey);

          if (typeof colorsOption === "object"
          && colorsOption.hasOwnProperty("isColors")
          && colorsOption.isColors
          && colorsOption.hasOwnProperty("choices")
          && typeof colorsOption.choices === "number"
          && colorsOption.choices > 0) {

            colors = colorsOption.choices;

            //Count through styles
            if (choices !== false) {
              for(count = 1; count <= choices; count++) {

                //Count through colors
                for (count2 = 1; count2 <= colors; count2++) {
                  tempFile = srcFormat2.format(key, formatValue(count), formatValue(count2));
                  images.push(tempFile);
                }

              }
            } else {
              //Count through styles
              for(count = 1; count <= colors; count++) {
                tempFile = srcFormat1.format(key, formatValue(count));
                images.push(tempFile);
              }
            }

          }
        }
      } else if (choices !== false) { //Everything else

        //Count through styles
        for(count = 1; count <= choices; count++) {
          tempFile = srcFormat1.format(key, formatValue(count));
          images.push(tempFile);
        }

      }
    }
  }

  return images;
}

function getNonOptionImages() {
  var images = Array();
  $("img:not(#faceContainer img)").each(function() {
    var src = $(this).attr("src");
    if (typeof src === "string" && src.length > 0) {
      images.push(src);
    }
  });

  return images;
}

function getPreloaderImages() {
  var images = Array(),
    section = null,
    option = null,
    bodyImages = null;

  for (sectionKey in sections) {
    var section = sections[sectionKey];

    if (typeof section === "object"
    && section.hasOwnProperty("options")
    && typeof section.options === "object") {

      for (optionKey in section.options) {
        option = section.options[optionKey];

        tempImages = getOptionImages(optionKey, option);
        if (typeof tempImages === "object"
        && tempImages instanceof Array
        && tempImages.length > 0) {
          images = images.concat(tempImages);
        }
      }
    }
  }

  for (optionKey in hiddenOptions) {
    option = hiddenOptions[optionKey];

    tempImages = getOptionImages(optionKey, option);
    if (typeof tempImages === "object"
    && tempImages instanceof Array
    && tempImages.length > 0) {
      images = images.concat(tempImages);
    }
  }

  tempImages = getNonOptionImages();
  if (typeof tempImages === "object" && tempImages instanceof Array && tempImages.length > 0) {
    images = images.concat(tempImages)
  }

  return images;
}
