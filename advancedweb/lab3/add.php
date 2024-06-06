<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coursesDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];

$sql = "INSERT INTO courses (name, confirmation) VALUES ('$name', 0)";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["success" => true, "id" => $conn->insert_id]);
} else {
  echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
