<?php
session_start();

$filename = 'data/data.json';
$user = $_POST['name'];
$password = $_POST['password'];

// check invalid results
if(!$user || !$password) {
  echo "error Fill all fields";
  return;
}
$data = file_get_contents($filename);
$data = json_decode($data, true);

// check current users
foreach ($data as $key => $value) {
  if($key === $user) {
    if($value !== $password) {
      echo 'error Wrong password';
      return;
    } else {
      $_SESSION['user'] = $user;
      header('Location: chat.php');
      return;
    }
  }
}
//new user
$_SESSION['user'] = $user;
$data[$user] = $password;
$data = json_encode($data);
file_put_contents($filename, $data);
header('Location: chat.php');
