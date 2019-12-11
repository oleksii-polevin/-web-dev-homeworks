<?php
include 'msgFinder.php';
$data = getMsg();
?>

<div class="wrapper">
    <div class="chatForm">
        <div class="hidden welcome"><h2>Welcome <?= $_SESSION['user']?></h2></div>
        <h1>easy chat</h1>
        <div class="msg" id="msg"><?= prepareCurrentMsg($data) ?></div>
        <br>
        <div class="chat">
            <form id="chatForm">
                <input type="text" id="chatMsg" name="message">
                <button type="submit" name="submitMsg" id="send">send</button>
                <br>
            </form>
        </div>
    </div>
</div>
