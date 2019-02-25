/** START: Layout Functions **/
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
    && ((hasColors == true
      && typeof colorsKey === "string" && colorsKey.length > 0)
      || hasColors == false)) {
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
      show: null,
      hiddenBy: hiddenByKey
    }
    if (hasColors) { returnObject.colorsKey = colorsKey; }
  }

  return returnObject;
}
/** END: Object Functions **/

/** START: Layout Functions **/
function buildControls($accordion) {
  $.each(sections, function(key, value) {
    buildSectionLayout(key, value, $("#controls"));
  });
}

function buildSectionLayout(key, section, $parent = null) {
  var $sectionHeading = null,
    $sectionGroup = null,
    $sectionRow = null,
    headingID = key + "Heading",
    groupID = key + "Group",
    groupSelector = "#" + groupID,
    parentSelector = "#" + $parent.attr("id");

  if ($parent === null) $parent = $(this);

  if (typeof key === "string"
    && section !== null && typeof section === "object") {

    $sectionHeading = $("<button></button>").appendTo($parent)
      .addClass("btn btn-block text-left btn-secondary mb-2 control-heading")
      .attr("id", headingID)
      .attr("data-section", key)
      .attr("data-toggle", "collapse")
      .attr("data-target", groupSelector)
      .attr("aria-expanded", "false")
      .attr("aria-controls", groupID)
      .text(section.label);
    console.log($sectionHeading.data("target"));

    $sectionGroup = $("<div></div>").insertAfter($sectionHeading)
      .addClass("collapse control-section")
      .attr("id", groupID)
      .attr("aria-labelledby", headingID)
      .attr("data-parent", parentSelector)
      .attr("data-section", key);

    $sectionRow = $("<div></div>").appendTo($sectionGroup)
      .addClass("row");

    $.each(section.options, function(key, value) {
      buildOptionLayout(key, value, $sectionRow);
    });
  }
}

function buildOptionLayout(key, option, $parent = null) {
  var $optionCol = null,
    $optionGroup = null,
    $optionLabel = null,
    $optionField = null,
    $optionToggleLabel = null,
    $optionToggleField = null;

  if ($parent === null) $parent = $(this);

  if (typeof key === "string"
    && option !== null && typeof option === "object") {
    $optionCol = $("<div></div>").appendTo($parent)
      .addClass("col-sm-6");
    $optionGroup = $("<div></div>").appendTo($optionCol)
      .addClass("form-group");
    $optionLabel = $("<label></label>").appendTo($optionGroup)
      .attr("for", "select_" + key)
      .text(option.label);
    if (option.hasOwnProperty("hasToggle") && option.hasToggle) {
      $optionToggleLabel = $("<label>Show: </label>").appendTo($optionGroup);
      $optionToggleField = $("<input>").appendTo($optionToggleLabel)
        .addClass("toggles")
        .attr("type", "checkbox")
        .attr("id", "toggle_" + key)
        .attr("aria-label", "Show")
        .attr("title", "Show")
        .attr("value", "")
        .on('change', function() { console.log("execute: build face"); });

      if (option.hasOwnProperty("hides")
        && typeof option.hides === "string"
        && option.hides.length > 0) {
        $optionToggleField.data("hides", option.hides);
      }
    }
    $optionField = $("<input>").appendTo($optionGroup)
      .addClass("slider")
      .attr("id", "select_" + key)
      .attr("type", "range")
      .attr("min", 1)
      .attr("max", option.choices)
      .rangeslider({polyfill: false, onSlide: function(p, v) {updateSlider(p, v, this)}})
      .on('change', changeSlider);
  }
}
/** END: Layout Functions **/

/** START: Face Functions **/
//Set a random slider value
function randomSelectValue() {
  var $this = $(this),
    max = $this.attr("max"),
    min = 1,
    random = null;

  random = Math.floor(Math.random() * (max - min + 1)) + min;
  $this.val(random).rangeslider("update", true);
}

//Set a random checkbox value
function randomCheckValue() {
  var $this = $(this)
  $this.attr('checked', (Math.random() >= 0.5) ? true : false);
}

// Make a random face.
function randomFace() {
  $('.slider').each(randomSelectValue);
  $('.checks').each(randomCheckValue);
  // buildFace();
  console.log("execute: build face");
}
/** END: Face Functions **/

/** START: Slider Functions **/
//Init rangeslider object & handle applicable emoji
function initRangeSlider() {
  var $this = $(this),
    handle = ($this.data("handle")),
    args = (typeof handle === "string") ?
      {polyfill: false, handleClass: 'rangeslider__handle emoji ' + handle, onSlide: function(p, v) {updateSlider(p, v, this)}}:
      {polyfill: false, onSlide: function(p, v) {updateSlider(p, v, this)}};
  $this.rangeslider(args);
}

// Make a face from the values in the dropdowns.
function changeSlider() {
  $(this).rangeslider("update", true);
  // buildFace();
  console.log("execute: build face");
}

//Updates slider value & gemerates face while dragging slider
function updateSlider(position, value, element) {
  var $this = $(element).val(value).change();
  // buildFace();
  console.log("execute: build face");
}
/** END: Slider Functions **/
