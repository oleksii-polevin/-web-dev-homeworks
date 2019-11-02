<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="styles/style.css">
  <title>vote</title>
</head>
<body>
  <form class="form" action="vote.php" method="get">
    <h3>Which programming language do you like the most?</h3>
    <div class="input">
      <input type="radio" name="language" id="java" value="java">
      <label for="java">java</label>
    </div>
    <div class="input">
      <input type="radio" name="language" id="javaScript" value="javaScript">
      <label for="javaScript">javaScript</label>
    </div>
    <div class="input">
      <input type="radio" name="language" id="php" value="php">
      <label for="php">php</label>
    </div>
    <div class="input">
      <input type="radio" name="language" id="c++" value="c++">
      <label for="c++">c++</label>
    </div>
    <hr>
    <input type="text" name="name" value="" placeholder="enter your name">
    <hr>
    <button type="submit">Submit</button>
    <br>
  </form>
  <div class="error">
    <?php
    if(isset($_SESSION['error'])) {
      echo $_SESSION['error'];
    }
    ?>
  </div>
<script type="text/javascript" src="main.js"></script>
</body>
</html>
