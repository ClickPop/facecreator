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
  if (!$this.hasData('ignore-random') || $this.data('ignore-random') !== 'true') {
    $this.attr('checked', (Math.random() >= 0.5) ? true : false);
  } else { $this.attr('checked', true); }
}

// Make a random face.
function randomFace() {
  $('.slider').each(randomSelectValue);
  $('.toggles').each(randomCheckValue);
  buildFace();
}
