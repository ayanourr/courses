<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "courses";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application"); 


$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$data = file_get_contents("php://input");
$ddd = json_decode($data, true); 

if (isset($ddd['oldName']) && isset($ddd['newName'])) {
  $oldName = mysqli_real_escape_string($conn, $ddd['oldName']); 
  $newName = mysqli_real_escape_string($conn, $ddd['newName']); 

  $sql = "UPDATE TBL SET text = '$newName' WHERE text = '$oldName'";

  if (mysqli_query($conn, $sql)) {
    echo json_encode(array('success' => true));
  } else {
    echo json_encode(array('success' => false, 'message' => 'Error updating course name: ' . mysqli_error($conn)));
  }
} else {
  echo json_encode(array('success' => false, 'message' => 'Old or new course name not provided'));
}

mysqli_close($conn);

?>
