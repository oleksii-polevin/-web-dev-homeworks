<?php
session_start();

define('MAX_LENGTH', '20');

$filename = 'data/users.json';
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

$usersLoginData = file_get_contents($filename);
$usersLoginData = json_decode($usersLoginData, true);

// check current users
foreach ($usersLoginData as $key => $value) {
    if($key === $user && $value !== $password) {
        echo 'error Wrong password';
        return;
    } elseif($key === $user && $value === $password) {
        $_SESSION['user'] = $user;
        header('Location: chat.php');
        return;
    }
}

//new user
$_SESSION['user'] = $user;
$usersLoginData[$user] = $password;
$usersLoginData = json_encode($usersLoginData);
file_put_contents($filename, $usersLoginData);
header('Location: chat.php');
