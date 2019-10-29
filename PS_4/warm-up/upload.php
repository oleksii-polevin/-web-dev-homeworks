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

  echo $arr[0];
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
