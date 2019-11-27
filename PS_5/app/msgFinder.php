<?php
session_start();

date_default_timezone_set ("Europe/Kiev");

function getMsg()
{
  $data = file_get_contents('data/msg.json');
  $data = json_decode($data, true);
  return $data;
}

function prepareCurrentMsg($data)
{
  $response = '';
  if(!empty($data)) {
    $current = strtotime(date("H:i:s"));
      foreach($data as $key => $value) {
    if(checkTime($key, $current) === true) {
      $value = makeEmoji($value);
      $response .= "[" . $key . "] " . $value .  "<br>";
    }
  }
}
  return $response;
}

function checkTime($time, $current)
{
  $hourBack = $current - 3600; //
  $date_for_check = strtotime($time);
  return $date_for_check >= $hourBack && $date_for_check <= $current;
}

function makeEmoji($message) {
  $message = str_replace(":)", "🙂" , $message);
  $message = str_replace(":(", "😞", $message);
  return $message;
}
