/** START: Option Functions **/
function colorOption(label, choices) {
  var returnObject = null;

  if (typeof label === "string" && label.length > 0
    && !isNaN(choices) && choices > 0) {
    returnObject = {
      label: label,
      choices: choices,
      isColors: true,
      hasColor: false,
      hasToggle: false,
      currentValue: null,
      currentColor: null,
      shown: true
    }
  }

  return returnObject;
}

function toggleOption(label, choices, hasColors = false, colorsKey = null) {
  var returnObject = null;

  if (typeof label === "string" && label.length > 0
    && !isNaN(choices) && choices > 0
    && ((hasColors == true
      && typeof colorsKey === "string" && colorsKey.length > 0)
      || hasColors == false)) {

    returnObject = {
      label: label,
      choices: choices,
      isColors: false,
      hasColors: (hasColors) ? true : false,
      hasToggle: true,
      currentValue: null,
      currentColor: null,
      show: null,
    }
    if (hasColors) { returnObject.colorsKey = colorsKey; }
  }

  return returnObject;
}

function toggleOptionHiddenBy(label, choices, hiddenByKey, hasColors = false, colorsKey = null) {
  var returnObject = null;

  if (typeof label === "string" && label.length > 0
    && !isNaN(choices) && choices > 0
    && typeof hiddenByKey === "string" && hiddenByKey.length > 0
    && ((hasColors == true
      && typeof colorsKey === "string" && colorsKey.length > 0)
      || hasColors == false)) {

    returnObject = {
      label: label,
      choices: choices,
      isColors: false,
      hasColors: (hasColors) ? true : false,
      hasToggle: true,
      currentValue: null,
      currentColor: null,
      show: null,
      hiddenBy: hiddenByKey
    }
    if (hasColors) { returnObject.colorsKey = colorsKey; }
  }

  return returnObject;
}

function standardOption(label, choices, hasColors = false, colorsKey = null) {
  var returnObject = null;

  if (typeof label === "string" && label.length > 0
    && !isNaN(choices) && choices > 0
    && ((hasColors == true
      && typeof colorsKey === "string" && colorsKey.length > 0)
      || hasColors == false)) {

    returnObject = {
      label: label,
      choices: choices,
      isColors: false,
      hasColors: (hasColors) ? true : false,
      hasToggle: false,
      currentValue: null,
      currentColor: null,
      show: true
    }
    if (hasColors) { returnObject.colorsKey = colorsKey; }
  }

  return returnObject;
}

function standardOptionHiddenBy(label, choices, hiddenByKey, hasColors = false, colorsKey = null) {
  var returnObject = null;

  if (typeof label === "string" && label.length > 0
    && !isNaN(choices) && choices > 0
    && typeof hiddenByKey === "string" && hiddenByKey.length > 0
    && ((hasColors == true
      && typeof colorsKey === "string" && colorsKey.length > 0)
      || hasColors == false)) {

    returnObject = {
      label: label,
      choices: choices,
      isColors: false,
      hasColors: (hasColors) ? true : false,
      hasToggle: true,
      currentValue: null,
      currentColor: null,
      show: null,
      hiddenBy: hiddenByKey
    }
    if (hasColors) { returnObject.colorsKey = colorsKey; }
  }

  return returnObject;
}

function hiddenOption(colorsKey, hiddenByKey = null) {
  var returnObject = null;

  if (typeof colorsKey === "string" && colorsKey.length > 0) {
    returnObject = {
      hasColors: true,
      colorsKey: colorsKey
    };

    if (typeof hiddenByKey === "string" && hiddenByKey.length > 0) {
      returnObject.hiddenBy = hiddenByKey;
    }
  }

  return returnObject;
}
/** END: Option Functions **/
