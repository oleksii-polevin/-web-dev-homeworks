<?php
include_once 'msgFinder.php';
?>

    <div class='chatForm'>
        <div class='hidden welcome'><h2>Welcome<span id='username'> <?= $_SESSION['user']?></span></h2></div>
        <h1>easy chat</h1>
        <div class='msg' id='msg'><?=Messanger::prepareCurrentMsg();?></div>
        <br>
        <div class='chat'>
            <form id='chatForm'>
                <input type='text' id='chatMsg' name='message'>
                <button type='submit' id='send'>send</button>
                <br>
            </form>
        </div>
    </div>
