//Format number as 2 digit string for filenames
function formatValue(n) {
  if (n !== null && n !== false) {
    n = parseInt(n);
    n = isNaN(n) ? 1 : n;
    n = n > 9 ? "" + n: "0" + n;
  } else { n = null; }

  return n;
}
