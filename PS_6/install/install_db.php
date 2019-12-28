<?php
include_once '../config/config.php';
$servername = DATA_BASE['servername'];
$username = DATA_BASE['username'];
$password = DATA_BASE['password'];
$db_name = DATA_BASE['db_name'];
$login_table = DATA_BASE['login_table'];
$message_table = DATA_BASE['message_table'];
$conn = mysqli_connect($servername, $username, $password);

if(!$conn) {
    die("connect failed " . mysqli_connect_error());
}
echo "connected succesfully<br><br>";


// Create database
$sql = "CREATE DATABASE $db_name";
if (mysqli_query($conn, $sql)) {
    echo "Database created successfully<br><br>";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}
mysqli_close($conn);

$conn = mysqli_connect($servername, $username, $password, $db_name);


$sql = "CREATE TABLE $login_table (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci";

if(mysqli_query($conn, $sql)) {
    echo "table created succesfully<br><br>";
} else {
    echo "error " . mysqli_error($conn);
}

$sql = "CREATE TABLE $message_table (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    time TIMESTAMP,
    message VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci";

if(mysqli_query($conn, $sql)) {
    echo "table created succesfully<br><br>";
} else {
    echo "error " . mysqli_error($conn);
}

mysqli_close($conn);
