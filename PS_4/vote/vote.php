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
  $data['Language'] = 'number of voters';
  $data[$_GET['language']] += 1;
  $json_object = json_encode($data);
  $_SESSION['result'] = $json_object;
  $_SESSION['error'] = '';
  file_put_contents('results.json', $json_object);
  header('Location: piechart.php');
