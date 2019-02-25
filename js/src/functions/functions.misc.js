//Format number as 2 digit string for filenames
function formatValue(n) {
  if (n !== null && n !== false) {
    n = parseInt(n);
    n = isNaN(n) ? 1 : n;
    n = n > 9 ? "" + n: "0" + n;
  } else { n = null; }

  return n;
}

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
