<?php
include_once 'Messanger.php';

$msg = strip_tags($_POST['message']);
$user = $_SESSION['user'];

// if mesage isn't a service message add info into db,
// otherwise just print recent messages
if($msg !== '__SERVICE__MSG__') {
    Messanger::saveMsg($msg);
}
echo Messanger::prepareCurrentMsg();
