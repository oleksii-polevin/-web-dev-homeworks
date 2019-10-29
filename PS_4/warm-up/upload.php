<?php
session_start();
if(isset($_FILES["fileToUpload"])) {
  $target_dir = "uploads/";
  $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
  move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
}
$names = array_diff(scandir("uploads"), array('..', '.'));
if(count($names) > 0) {
  $outputFiles = "";
  foreach ($names as $item)
  {
    $size = human_filesize(filesize("uploads/$item"));
    $outputFiles .= "<div><a href='/uploads/$item' download>$item</a><span>$size</span></div>";
    if(previewImg($item)) {
      $outputFiles .= "<img src='/uploads/$item' style='width: 100px'>";
    }
  }
  $_SESSION['output_files'] = $outputFiles;
}

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
        $makeBoard .= "<span style='width: 40px; height: 40px; background-color: red'></span>";
      }
    }
    $makeBoard .="</div>";
  }
  $_SESSION['chess'] = $makeBoard;
}

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

$_SESSION['array'] = createArray();

function createArray()
{
  //creating multidimensional array for holding results
  $wrapper = array();
  $arr = [];
  for($i = 0; $i < 100; $i++) {
    $arr[$i] = rand(0, 10);
  }
  $wrapper['original'] = $arr;
  $arr2 = array_unique($arr);
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

header('Location: index.php');
function human_filesize($bytes, $decimals = 2)
{
  $sz = 'BKMGTP';
  $factor = floor((strlen($bytes) - 1) / 3);
  return sprintf("(" . "%.{$decimals}f", $bytes / pow(1024, $factor))  . @$sz[$factor] . ")";
}

function previewImg($name)
{
  $img = '/(.jpg|.png|.bmp|.jpeg|.svg)$/';
  return preg_match($img, $name);
}



//
