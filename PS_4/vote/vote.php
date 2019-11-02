<?php
session_start();
$error = "Set your favorite language and enter your name";
//check for language first
if(!$_GET['language']) {
  $_SESSION['error'] = $error;
  header('Location: index.php');
  return;
}
//check name
if(!$_GET['name']) {
  $_SESSION['error'] = $error;
  header('Location: index.php');
  return;
  } else {
    // setting arrays of names
  if(!isset($_SESSION['name'])) {
    $_SESSION['name'][0] = $_GET['name'];
  } else {
    // refuse duplicate voting
    foreach($_SESSION['name'] as $item) {
      if($_GET['name'] === $item) {
        $_SESSION['error'] = "You've already voted";
        header('Location: index.php');
        return;
      }
    }
    //adding each unique name into 'database'
    array_push( $_SESSION['name'], $_GET['name']);
  }
  //show current results
  $json_object = file_get_contents('results.json');
  //parametr true return json as associative array
  $data = json_decode($json_object, true);
  $data[$_GET['language']] += 1;
  $json_object = json_encode($data);
  $_SESSION['result'] = $json_object;
  $_SESSION['error'] = '';
  file_put_contents('results.json', $json_object);
  header('Location: piechart.php');
}
