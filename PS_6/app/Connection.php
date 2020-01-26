<?php

class Connection {

    public function connect() {
        $conn =  mysqli_connect(DATA_BASE['servername'], DATA_BASE['username'],
        DATA_BASE['password'], DATA_BASE['db_name']);
        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
            exit();
        }
        return $conn;
    }
}
