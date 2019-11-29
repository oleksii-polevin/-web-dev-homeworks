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
$usersLoginData = file_get_contents($filename);
$usersLoginData = json_decode($usersLoginData, true);

// check current users
foreach ($usersLoginData as $key => $value) {
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
$usersLoginData[$user] = $password;
$usersLoginData = json_encode($usersLoginData);
file_put_contents($filename, $usersLoginData);
header('Location: chat.php');
