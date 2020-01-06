<?php
session_start();

// case: logout
if(isset($_POST['logout'])) {
    session_destroy();
    return;
}

// case: page reloaded
if(isset($_SESSION['user'])) {
    unset($_SESSION['last_msg_index']);
    header('Location: chat.php');
}
