<?php
session_start();

if(isset($_POST['logout'])) {
    session_destroy();
    return;
}

// page reloaded
if(isset($_SESSION['user'])) {
    unset($_SESSION['last_msg_index']);
    header('Location: chat.php');
}
