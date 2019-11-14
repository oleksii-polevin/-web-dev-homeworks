<?php
session_start();

//uploads and downloads files
if(isset($_FILES["fileToUpload"])) {
  $target_dir = "uploads/";
  $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
  move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);

  $names = array_diff(scandir("uploads"), array('..', '.'));
  if(count($names) > 0) {
    $outputFiles = "<section class='files'>";
    foreach ($names as $item)
    {
      $size = humanFilesize(filesize("uploads/$item"));
      $outputFiles .= "<div><a href='/uploads/$item' download>$item</a><span>$size</span>";
      if(previewImg($item)) {
        $outputFiles .= "<img src='/uploads/$item' style='width: 100px'></div>";
      } else {
        $outputFiles .="</div>";
      }
    }
    $outputFiles .="</section>";
    $_SESSION['output_files'] = $outputFiles;
  }
}

//creates chess board
if(isset($_POST['chessBoard'])) {
  $dimensions = $_POST['chessBoard'];
  $arr = preg_split('/\D/', $dimensions);
  $makeBoard = "";
  for($i = 0; $i < $arr[0]; $i++) {
    $makeBoard .= "<div class='chessBoard'>";
    for($j = 0; $j < $arr[1]; $j++) {
      if($i % 2 === $j % 2) {
        $makeBoard .= "<span style='width: 40px; height: 40px; background-color: black'></span>";
      } else {
        $makeBoard .= "<span style='width: 40px; height: 40px; background-color: white'></span>";
      }
    }
    $makeBoard .="</div>";
  }
  $_SESSION['chess'] = $makeBoard;
}

//sum of digits of given number
if(isset($_POST['sumOfDigits'])) {
  $numericString = $_POST['sumOfDigits'];
  if(!is_numeric($numericString)) {
    $_SESSION['sumOfDigits'] = "enter valid number";
  } else {
    $sum = 0;
    for($i = 0; $i < strlen($numericString); $i++) {
      $sum += (int)$numericString[$i];
    }
    $_SESSION['sumOfDigits'] = $sum;
  }
}
//count number of lines, spaces and symbols
if(isset($_POST['textarea'])) {
  $str = $_POST['textarea'];
  $wrap['text:'] ="<br>" . nl2br($str);
  $length = mb_strlen($str, 'UTF-8');
  $newLines = substr_count($str, "\n");
  $spaces = substr_count($str, " ");
  $wrap['length:'] = $length - $newLines;
  //for non-empty strings without \n symbol
  //also necessary to count last line
  if($length > 0 && $str[strlen($str) - 1] !== "\n") {
    $newLines += 1;
  }
  $wrap['lines:'] = $newLines;
  $wrap['spaces:'] = $spaces;
  $_SESSION['textarea'] = $wrap;
}

//creating arrays
if(isset($_GET['array'])) {
  $_SESSION['array'] = createArray();
}

//return to main page
header('Location: index.php');

//creates arrays from random numbers
function createArray()
{
  //creating multidimensional array for holding results
  $wrapper = array();
  $arr = [];
  for($i = 0; $i < 100; $i++) {
    $arr[$i] = rand(0, 10);
  }
  $wrapper['original'] = $arr;
  sort($arr);
  $wrapper['sorted'] = $arr;
  $arr2 = array_unique($wrapper['sorted']);
  $wrapper['unique'] = $arr2;
  $arr_rev = array_reverse($arr2);
  $wrapper['reversed'] = $arr_rev;
  $arr_multiply = [];
  for($i = 0; $i < count($arr_rev); $i++) {
    $arr_multiply[$i] = $arr_rev[$i] * 2;
  }
  $wrapper['multiplied by two'] = $arr_multiply;
  return $wrapper;
}

//returns file size in convinient format
//borrow this function from php documentation
function humanFilesize($bytes, $decimals = 2)
{
  $sz = 'BKMGTP';
  $factor = floor((strlen($bytes) - 1) / 3);
  (int)$factor === 0 ? $ending = 'y' : $ending = 'b';
  return sprintf("(" . "%.{$decimals}f", $bytes / pow(1024, $factor))  . @$sz[$factor] . $ending . ")";
}

function previewImg($name)
{
  $img = '/(.jpg|.png|.bmp|.jpeg|.svg)$/';
  return preg_match($img, $name);
}
