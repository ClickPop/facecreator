/** START: Slider Functions **/
// Make a face from the values in the dropdowns.
function changeSlider() {
  $(this).rangeslider("update", true);
  buildFace();
}

//Updates slider value & gemerates face while dragging slider
function updateSlider(position, value, element) {
  var $this = $(element).val(value).change();
  buildFace();
}
/** END: Slider Functions **/
