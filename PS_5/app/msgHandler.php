<?php
include 'msgFinder.php';
$user = $_SESSION['user'];
$msg = strip_tags($_POST['message']);
$data = getMsg();

// if message is real - add info into json, otherwise just print recent messages
if($msg) {
    empty($data) ? $last_msg_index = 0 : $last_msg_index = array_key_last($data);
    $data[++$last_msg_index] = [date('H:i:s'), $user, $msg];
    file_put_contents('data/msg.json', json_encode($data));
}
echo prepareCurrentMsg($data);
