<?php
class Response {
  public $download = false;
  public $full = false;
}

function saveFile($data, $full = false) {
  $full = is_bool($full) ? $full : false;
  $rVal = false;
  if (is_string($data) && strlen($data) > 0) {
    $dataDecoded = base64_decode($data);
    if (base64_encode($dataDecoded) === $data) {
      $genDirectory = $full ? "generated/full" : "generated";
      $genPath = sprintf("%s/%s", $_SERVER["DOCUMENT_ROOT"], $genDirectory);
      if (is_dir($genPath)) {
        if (!is_writable($genPath)) { chmod($genPath, 0755); }
      } else { mkdir($genPath, 0755); }
      $fileName = sprintf("%s-%s.png", date("Ymd"), uniqid());
      $filePath = sprintf("%s/%s", $genPath, $fileName);
      $imageURL = sprintf("/%s/%s", $genDirectory, $fileName);
      if (file_put_contents($filePath, $dataDecoded)) {
        $rVal = $imageURL;
      }
    }
  }
  return $rVal;
}

$response = new Response();
if (isset($_POST["resizedData"]) && isset($_POST["fullData"])) {
  $resizedData = $_REQUEST["resizedData"];
  $fullData = $_REQUEST["fullData"];

  $response->download = saveFile($resizedData);
  $response->full = saveFile($fullData, true);
}

$response = json_encode($response);
header("Content-Type: application/vnd.api+json");
echo $response;
exit;
