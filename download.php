<?php
if (isset($_REQUEST["f"])){
  // Get parameters
  $file = urldecode($_REQUEST["f"]); // Decode URL-encoded string
  $filePath = sprintf("%s/%s", $_SERVER["DOCUMENT_ROOT"], $file);
  $filePath = preg_replace('/[\/]+/', '/', $filePath);
  $fileType = mime_content_type($filePath);

  switch($fileType) {
    case "image/jpeg":
      $fileName = "FriendlyFace.jpg";
      break;
    case "image/gif":
      $fileName = "FriendlyFace.gif";
      break;
    case "image/png";
      $fileName = "FriendlyFace.png";
      break;
    default:
      $fileName = false;
  }

  // Process download
  if (file_exists($filePath) && $fileName !== false) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $fileName .'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));
    flush(); // Flush system output buffer
    readfile($filePath);
    exit;
  }
}
