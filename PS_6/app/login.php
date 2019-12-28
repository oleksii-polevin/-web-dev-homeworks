<?php
session_start();
require_once 'db_login.php';

define('MAX_LENGTH', '20');

$user = strip_tags($_POST['name']);
$password = $_POST['password'];

// check invalid results
if(!$user || !$password) {
    echo "error Fill all fields";
    return;
}

if(strlen($user) > MAX_LENGTH) {
    echo 'error Name is too long';
    return;
}

if(strlen($password) > MAX_LENGTH) {
    echo 'error Password is too long';
    return;
}

Login::checkUser($user, $password);
