function toggleFaceClass() {
  var $this = $(this),
    $face = $('#faceContainer'),
    toggleClass = $this.data("toggle-class");

  if ($this.is(":checked")) {
    $face.addClass(toggleClass);
  } else {
    $face.removeClass(toggleClass);
  }
}
