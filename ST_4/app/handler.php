<?php
$variant = $_GET['name'];
$output = '';
$path =   '..' . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'today.json';
if($variant === 'API') {
    $output = file_get_contents('http://api.openweathermap.org/data/2.5/forecast?q=kropyvnytskyi&APPID=5aa54741590ecf3bdd72cfb0b762cf43&units=metric');
    file_put_contents($path, $output);
    include_once 'Database.php';
    Database::insert($output);
}

if($variant === 'JSON') {
    $output = file_get_contents($path);
}

if($variant === 'DATABASE') {
    include_once 'Database.php';
    $output = Database::prepareForecast();
}

echo ($output);
