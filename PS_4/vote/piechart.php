<?php session_start();?>
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        //obtaining results from php
        const votingResults = '<?php
        echo $_SESSION["result"] ?>';
        let txt = JSON.parse(votingResults);

        //transforming into associative array
        txt = Object.entries(txt);
        var data = google.visualization.arrayToDataTable(txt);
        var options = {
          title: 'Languages'
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
  </body>
</html>
