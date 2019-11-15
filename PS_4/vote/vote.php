<?php
session_start();
$error = "Set your favorite programming language";
//check for language first
if(!$_GET['language']) {
  $_SESSION['error'] = $error;
  header('Location: index.php');
  return;
}

  //show current results
  $json_object = file_get_contents('results.json');
  //parametr true return json as associative array
  $data = json_decode($json_object, true);
  $data['Programming Language'] = 'number of voters';
  if(isset($_SESSION['oldChoise'])) {
    $data[$_SESSION['oldChoise']] -= 1;
  }
  $data[$_GET['language']] += 1;
  $_SESSION['oldChoise'] = $_GET['language'];
  $json_object = json_encode($data);
  $_SESSION['result'] = $json_object;
  $_SESSION['error'] = '';
  file_put_contents('results.json', $json_object);
  header('Location: piechart.php');
