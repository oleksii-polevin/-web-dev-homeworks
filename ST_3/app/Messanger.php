<?php

if(isset($_GET['page_loaded'])) {
    $msg = getMsg();
    if($msg) {
        echo json_encode($msg);
    }
}

if(isset($_POST['message'])) {
    $new_msg = json_decode($_POST['message'], true); // object
    $new_msg = sanitateData($new_msg);
    $previous_msg = getMsg();
    $key = $new_msg['id'];
    $previous_msg[$key] = $new_msg;
    file_put_contents('data.json', json_encode($previous_msg));
}

if(isset($_GET['delete'])) {
    $msg = getMsg();
    unset($msg[$_GET['delete']]);
    file_put_contents('data.json', json_encode($msg));
    if(empty($msg)) echo 'empty'; //start counting from beginning
}

function getMsg()
{
    $msg = file_get_contents('data.json');
    return json_decode($msg, true);
}

function sanitateData($msg)
{
    $msg['text'] = strip_tags(trim($msg['text']));
    return $msg;
}
