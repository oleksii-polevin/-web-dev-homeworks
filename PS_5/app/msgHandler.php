<?php
include 'msgFinder.php';

$msg = strip_tags($_POST['message']);
$user = $_SESSION['user'];
// if message is real - add info into json, otherwise just print recent messages
$data = getMsg();
if($msg) {
    empty($data) ? $last_msg_index = 0 : $last_msg_index = array_key_last($data);
    $data[++$last_msg_index] = [date('H:i:s'), $user, $msg];
    file_put_contents('data/msg.json', json_encode($data));
}
echo prepareCurrentMsg($data);
