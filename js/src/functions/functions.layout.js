/** START: Layout Functions **/
var sectionCount = null;
function buildControls($accordion) {
  sectionCount = 0;
  $.each(sections, function(key, value) {
    sectionCount++;
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
      .addClass("btn btn-block btn-sections text-left btn-secondary control-heading")
      .attr("id", headingID)
      .attr("data-section", key)
      .attr("data-toggle", "collapse")
      .attr("data-target", groupSelector)
      .attr("aria-expanded", (sectionCount === 1 ? "true" : "fase"))
      .attr("aria-controls", groupID)
      .text(section.label);

    $sectionGroup = $("<div></div>").insertAfter($sectionHeading)
      .addClass("collapse control-section" + (sectionCount === 1 ? " show" : ""))
      .attr("id", groupID)
      .attr("aria-labelledby", headingID)
      .attr("data-parent", parentSelector)
      .attr("data-section", key);

    $('#faceGroup').addClass("show");

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
    $optionLabelDiv = null,
    $optionLabel = null,
    $optionField = null,
    $optionToggleLabel = null,
    $optionToggleField = null,
    $optionToggleClassLabel = null,
    $optionToggleClassField = null,
    $optionToggleIgnoreRandom = false;

  if ($parent === null) $parent = $(this);

  if (typeof key === "string"
    && option !== null && typeof option === "object") {
    $optionCol = $("<div></div>").appendTo($parent)
      .addClass("col-sm-6");
    $optionGroup = $("<div></div>").appendTo($optionCol)
      .addClass("form-group")
      .addClass("face-option");
    $optionLabelDiv = $("<div></div>").appendTo($optionGroup)
      .addClass("option-labels");
    $optionLabel = $("<label></label>").appendTo($optionLabelDiv)
      .addClass("option-label")
      .attr("for", "select_" + key)
      .text(option.label);
    if (option.hasOwnProperty("hasToggle") && option.hasToggle) {
      $optionToggleLabel = $("<label>Show: </label>").appendTo($optionLabelDiv).addClass("toggle-label");
      $optionToggleField = $("<input>").appendTo($optionToggleLabel)
        .addClass("toggles")
        .attr("type", "checkbox")
        .attr("id", "toggle_" + key)
        .attr("aria-label", "Show")
        .attr("title", "Show")
        .attr("value", "")
        .on("change", buildFace);

      if (option.hasOwnProperty("toggleIgnoreRandom") && option.toggleIgnoreRandom) {
        $optionToggleField.data("ignore-random", true);
      }

      if (option.hasOwnProperty("hides")
        && typeof option.hides === "string"
        && option.hides.length > 0) {
        $optionToggleField.data("hides", option.hides);
      }
    }

    if (option.hasOwnProperty("hasToggleClass") && option.hasToggleClass
    && option.hasOwnProperty("toggleClass") && typeof option.toggleClass === "string"
    && option.hasOwnProperty("toggleClassLabel") && typeof option.toggleClassLabel === "string") {
      $optionToggleClassLabel = $("<label></label>").appendTo($optionLabelDiv)
        .addClass("toggleClass-label")
        .text(option.toggleClassLabel + " ");

      $optionToggleClassField = $("<input>").appendTo($optionToggleClassLabel)
        .addClass("toggleClass")
        .attr("type", "checkbox")
        .attr("id", "toggleClass_" + key)
        .attr("aria-label", option.toggleClassLabel)
        .attr("title", option.toggleClassLabel)
        .attr("value", "")
        .data("toggle-class", option.toggleClass)
        .on("change", toggleFaceClass);
    }

    $optionField = $("<input>").appendTo($optionGroup)
      .addClass("slider " + key)
      .attr("id", "select_" + key)
      .attr("type", "range")
      .attr("min", 1)
      .attr("max", option.choices)
      .rangeslider({
        polyfill: false,
        rangeClass: "rangeslider " + key,
        onSlide: function(p, v) {updateSlider(p, v, this)}
      })
      .on("change", changeSlider);
  }
}
/** END: Layout Functions **/
