//Build face images based on values
function getCurrentFaceData() {
  flatObjects = {};
  $.each(sections, function(section, sectionData) {
    $.each(sectionData.options, function(option, optionData) {
      if (optionData.hasOwnProperty("isColors") && optionData.isColors) return true;
      var $field = $("#select_" + option),
        $toggle = (optionData.hasOwnProperty("hasToggle") && optionData.hasToggle)
          ? $("#toggle_" + option) : null,
        $hiddenBy = (optionData.hasOwnProperty("hiddenBy")
          && typeof optionData.hiddenBy === "string" && optionData.hiddenBy.length > 0)
          ? $("#toggle_" + optionData.hiddenBy) : null,
        colorsKey = (optionData.hasOwnProperty("hasColors") && optionData.hasColors)
          ? optionData.colorsKey : false,
        $colors = colorsKey ? $("#select_" + colorsKey) : null,
        currentValue = null,
        currentColor = null,
        show = true,
        data = {};

      if ($toggle !== null && $toggle.length) {
        show = $toggle.is(":checked") ? true : false;
      }
      if ($hiddenBy !== null && $hiddenBy.length) {
        show = $hiddenBy.is(":checked") ? false : show;
      }

      currentValue = formatValue($field.val());
      currentColor = ($colors !== null && $colors.length) ? formatValue($colors.val()) : null;

      //Set original data
      sections[section]["options"][option].show = show;
      sections[section]["options"][option].currentValue = currentValue;
      sections[section]["options"][option].currentColor = currentColor;

      data.show = show;
      data.currentValue = currentValue;
      data.currentColor = currentColor;

      flatObjects[option] = data;
    });
  });

  $.each(hiddenOptions, function(option, optionData) {
    var currentValue = null,
      $hiddenBy = (optionData.hasOwnProperty("hiddenBy")
        && typeof optionData.hiddenBy === "string" && optionData.hiddenBy.length > 0)
        ? $("#toggle_" + optionData.hiddenBy) : null,
      colorsKey = (optionData.hasOwnProperty("hasColors") && optionData.hasColors)
        ? optionData.colorsKey : false,
      $colors = colorsKey ? $("#select_" + colorsKey) : null,
      currentColor = null,
      show = true,
      data = {};

      if ($hiddenBy !== null && $hiddenBy.length) {
        show = $hiddenBy.is(":checked") ? false : show;
      }

      currentColor = ($colors !== null && $colors.length) ? formatValue($colors.val()) : null;

      //Set original data
      hiddenOptions[option].show = show;
      hiddenOptions[option].currentValue = currentValue;
      hiddenOptions[option].currentColor = currentColor;

      data.show = show;
      data.currentValue = currentValue;
      data.currentColor = currentColor;

      flatObjects[option] = data;
  });

  return flatObjects;
}
