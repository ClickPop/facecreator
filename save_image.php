<?php
$fail = true;
if (isset($_POST["data"])) {
  $data = $_REQUEST["data"];
  if (is_string($data) && strlen($data) > 0) {
    $dataDecoded = base64_decode($data);
    if (base64_encode($data_decoded) === $data) {
      $genDirectory = "generated";
      $genPath = sprintf("%s/%s", $_SERVER["DOCUMENT_ROOT"], $genDirectory);
      if (is_dir($genPath)) {
        if (!is_writable($genPath)) { chmod($genPath, 0755); }
      } else { mkdir($genPath, 0755); }
      $fileName = sprintf("%s-%s.png", date("Ymd"), uniqid());
      $filePath = sprintf("%s/%s", $genPath, $fileName);
      $imageURL = sprintf("/%s/%s", $genDirectory, $fileName);
      file_put_contents($filePath, $dataDecoded);
      echo $imageURL;
    }
  }
}
if ($fail) echo false;
