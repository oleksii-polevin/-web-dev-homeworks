<?php
include 'msgFinder.php';
$data = getMsg();
?>
<div class="wrapper">
<div class="chatForm">
  <h1>easy chat</h1>
  <p class="msg" id="msg"><?= prepareCurrentMsg($data) ?></p>
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
