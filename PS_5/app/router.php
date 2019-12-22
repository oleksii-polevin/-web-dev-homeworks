<?php
session_start();

if(isset($_POST['logout'])) {
    session_destroy();
    return;
}

if(isset($_SESSION['user'])) {
    unset($_SESSION['last_msg_index']);
    $msg = '';
    header('Location: chat.php');
}
