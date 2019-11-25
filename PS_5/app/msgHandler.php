<?php
include 'msgFinder.php';
$user = $_SESSION['user'];
$msg = $_POST['message'];
$data = getMsg();
// if message is real - add info into json, otherwise just print recent messages
if($msg) {
$data[date("H:i:s")] = " " . "<span>" . $user . "</span>" . " : " . $msg;
file_put_contents('data/msg.json', json_encode($data));
}
echo prepareCurrentMsg($data);
