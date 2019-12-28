<?php
require_once 'msgFinder.php';
$msg = strip_tags($_POST['message']);
// if message is real - add info into json, otherwise just print recent messages
if($msg) {
    Messanger::saveMsg($msg);
}
echo Messanger::prepareCurrentMsg();
