<?php
include 'msgFinder.php';

$msg = strip_tags($_POST['message']);
$user = $_SESSION['user'];

// if mesage isn't a service message add info into json,
// otherwise just print recent messages
$data = Messanger::getMsg();
if($msg !== '__SERVICE__MSG__') {
    empty($data) ? $last_msg_index = 0 : $last_msg_index = array_key_last($data);
    $data[++$last_msg_index] = [date('H:i:s'), $user, $msg];
    file_put_contents('data/msg.json', json_encode($data));
}
echo Messanger::prepareCurrentMsg($data);
