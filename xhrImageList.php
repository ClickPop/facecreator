<?php
class Response {
  public $data = array();

  function __construct($files) {
    if (is_array($files) && count($files) > 0) {
      $this->data = $files;
    }
  }
}

$imagesRelative = "img/dist";
$imagesPath = sprintf("%s/%s", $_SERVER["DOCUMENT_ROOT"], $imagesRelative);
$allowedTypes = ["image/jpeg", "image/gif", "image/png"];
function getDirContents($dir, &$results = array()){
  global $imagesRelative, $allowedTypes;
  $files = scandir($dir);
  foreach($files as $key => $value){
    $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
    $relativePath = str_replace($_SERVER["DOCUMENT_ROOT"] . "/", "", $path);

    if(!is_dir($path) && file_exists($path) && in_array(mime_content_type($path), $allowedTypes)) {
          $results[] = $relativePath;
    } else if($value != "." && $value != "..") {
        getDirContents($path, $results);
    }
  }

  return $results;
}
$response = json_encode(new Response(getDirContents($imagesPath)));
header("Content-Type: application/vnd.api+json");
echo $response;
