<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="styles/style.css">
	<title>ps_4 warm-up</title>
</head>
<body>
	<div class="count">
		<?php
		session_start();
		isset($_SESSION['counter']) ? $_SESSION['counter'] += 1 : $_SESSION['counter'] = 1;
		echo "<div><h1>number of visits: $_SESSION[counter]</h1></div>";
		 ?>
		 <hr>
	</div>
	<div class="first">
		<h2>The sum of numbers from -1000 to 1000</h2>
		<?php
		$sum = 0;
		for($i = -1000; $i <= 1000; $i++)
		{
			$sum += $i;
		}
		echo "<h3>result is $sum</h3>";
		?>
		<hr>
	</div>
	<div class="">
		<h2>The sum of numbers from -1000 to 1000 which ends on 2, 3 or 7</h2>
		<?php
		$regex = '/(2|3|7)$/';
		$sum = 0;
		for($i = -1000; $i <= 1000; $i++)
		{
			if(preg_match($regex, $i)) {
				$sum += $i;
			}
		}
		echo "<h3>result is $sum</h3>";
		?>
		<hr>
	</div>
	<div class="upload">
		<form action="upload.php" method="post" enctype="multipart/form-data">
			Select file to upload:
			<input type="file" class="upload" name="fileToUpload" id="fileToUpload">
			<br>
			<input type="submit" value="Upload" name="submit_files">
		</form>
		<?php
		if(isset($_SESSION['output_files'])) {
		echo ($_SESSION['output_files']);
	}
		?>
		<hr>
	</div>
	<div class="chessBoard">
		<form class="" action='upload.php' method="post">
			<input type="text" name='chessBoard' placeholder='8x8 format'>
			<button type="submit" action="upload.php" name="button">Go!</button>
		</form>
		<div>
			<?php
			if(isset($_SESSION['chess'])) {
			echo $_SESSION['chess'];
		}
			 ?>
		</div>
	</div>
	<hr>
  <div class="sumOf">
		<h2>Sum of digits from given number</h2>
		<form class="" action="upload.php" method="post">
			<input type="text" name="sumOfDigits" placeholder="enter number">
			<button type="submit" action="upload.php" name="button">Go!</button>
			<?php
			if(isset($_SESSION['sumOfDigits'])) {
				$result = $_SESSION['sumOfDigits'];
				echo "<div>$result</div>";
			}
			?>
		</form>
		<div class="">
			<h2>Array</h2>
			<form class="" action="upload.php" method="get">
				<button type="submit"name="button">Create Array</button>
				<p><?php
				if(isset($_SESSION['array'])) {
				$array = $_SESSION['array'];
				foreach ($array as $item => $value) {
					echo "<div> $item: ";
					echo implode(",", $value);
					echo "</div>";
				}
			}
				?></p>
			</form>
		</div>
  </div>
</body>
</html>
