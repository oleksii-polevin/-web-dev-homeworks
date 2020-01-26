<?php

define('MAX_LENGTH', '20');

$user = strip_tags(trim($_POST['name']));
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

require_once 'Validator.php';

Validator::checkUser($user, $password);
