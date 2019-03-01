<?php
$indir = array_filter(scandir('./generated'), function($item) {
    return !is_dir('../pages/' . $item);
});



$genMain = "generated";
$genFull = "generated/full";
$pathMain = sprintf("%s/%s", $_SERVER["DOCUMENT_ROOT"], $genMain);
$pathFull = sprintf("%s/%s", $_SERVER["DOCUMENT_ROOT"], $genFull);

$scanMain = scandir($pathMain);
$scanFull = scandir($pathFull);

$scanMain = array_filter($scanMain, function($item) {
  global $pathMain;
  if (is_dir($pathMain . "/" . $item)) {
    echo "{$item} IS a directory<br>";
  } else {
    echo "{$item} is NOT a directory<br>";
  }
  return !is_dir($pathMain . "/" . $item);
});
$scanFull = array_filter($scanFull, function($item) {
  global $pathFull;
  if (is_dir($pathFull . "/" . $item)) {
    echo "{$item} IS a directory<br>";
  } else {
    echo "{$item} is NOT a directory<br>";
  }
  return !is_dir($pathFull . "/" . $item);
});
echo $pathFull;
echo "<br>";
print_r(is_dir($pathFull));
echo "<br>";
echo "<pre>";
print_r($scanMain);
echo "</pre>";
echo "<br>-----<br>";
echo "<pre>";
print_r($scanFull);
echo "</pre>";
