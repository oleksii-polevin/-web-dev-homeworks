<?php
include_once 'config.php';

class Database {

    private function connect()
    {
        $conn =  mysqli_connect(host, username, password, db_name);
        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
            exit();
        }
        return $conn;
    }

    
    public function insert($input)
    {
        $input = json_decode($input, true);
        $result = $input['list'];
        $today = explode(' ', $result[0]['dt_txt']); // split on y-m-d and time for next selection
        $conn = self::connect();
        $check = "SELECT dt_txt FROM `forecast` WHERE dt_txt LIKE '$today[0]%'";
        $res = mysqli_query($conn, $check); // check for already stored forecast 
        $row = mysqli_fetch_assoc($res);
        if($row === NULL) { // avoiding of storing duplicating values into database
            $sql = '';
            foreach($result as $key => $value) {
                $dt_txt = $value['dt_txt'];
                if(preg_match('/' . $today[0] . '/', $dt_txt)) {
                $temperature = $value['main']['temp'];
                $icon = $value['weather'][0]['icon'];
                $sql .= "INSERT INTO `forecast`(`dt_txt`, `temperature`, `icon`)
                VALUES ('$dt_txt', '$temperature', '$icon');";
                }
            }
            mysqli_multi_query($conn, $sql);
        }
        mysqli_close($conn);

    }

    public function prepareForecast()
    {
        $conn = self::connect();
        $today = date('Y-m-d');
        $sql = "SELECT DISTINCT * FROM `forecast` WHERE dt_txt LIKE '$today%'";
        $forecast = [];
        $counter = 0;
        $res = mysqli_query($conn, $sql);
        while($row = mysqli_fetch_assoc($res)) {
            $forecast['list'][$counter]['dt_txt'] = $row['dt_txt'];
            $forecast['list'][$counter]['main']['temp'] = $row['temperature'];
            $forecast['list'][$counter]['weather'][0]['icon'] = $row['icon'];
            $counter += 1;
        }
        mysqli_close($conn);
        return json_encode($forecast);
    }
}
