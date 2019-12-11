<?php
session_start();

date_default_timezone_set ("Europe/Kiev");

function getMsg()
{
    $data = file_get_contents('data/msg.json');
    $data = json_decode($data, true);
    return $data;
}

function prepareCurrentMsg($data)
{
    if(empty($data)) {
        return;
    }
    $response = '';
    // first response
    if(!isset($_SESSION['last_msg_index'])) {
        $current = strtotime(date("H:i:s"));
        foreach($data as $key => $value) {
            if(checkTime($value[0], $current)) {
                $response .= createOneMsg($value);
            }
        }
        $_SESSION['last_msg_index'] = array_key_last($data);
        // next responses
    }  else {
        // nothing to send
        if($_SESSION['last_msg_index'] === array_key_last($data)) {
            return;
        }
        $next_msg = $_SESSION['last_msg_index'] + 1;
        while($next_msg <= array_key_last($data)) {
            $temp = $data[$next_msg];
            $response .= createOneMsg($temp);
            $next_msg++;
        }
        $_SESSION['last_msg_index'] = array_key_last($data);
    }
    return $response;
}

function createOneMsg($message) {
    return "<p>[<span class='time'>" . $message[0] . "</span>]  <span class='user'>"
    . $message[1] .  " : </span>" . makeEmoji($message[2]) . "</p>";
}

function checkTime($time, $current)
{
    $hour = 3600;
    $hourBack = $current - $hour;
    $date_for_check = strtotime($time);
    return $date_for_check >= $hourBack && $date_for_check <= $current;
}

function makeEmoji($msg) {
    $msg = str_replace(":)", "🙂" , $msg);
    $msg = str_replace(":(", "😞", $msg);
    return $msg;
}
