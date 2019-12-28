<?php
require_once '../config/config.php';


class Login {

    public function checkUser($user, $password) {

        $conn = self::connect();

        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
            exit();
        }

        $db_name = DATA_BASE['login_table'];
        $sql = "SELECT name, password FROM $db_name WHERE name='$user'";
        $res = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($res);

        if(!$row) {
            self::createUser($user, $password, $conn);
        }

        if($row['password'] !== hash('sha256', $password)) {
            mysqli_close($conn);
            echo 'error Wrong password';
            return;
        }
        mysqli_close($conn);
        self::openChat($user);

    }

    private function connect() {
        return mysqli_connect(DATA_BASE['servername'], DATA_BASE['username'],
        DATA_BASE['password'], DATA_BASE['db_name']);
    }

    private function createUser($user, $password, $conn) {
        $password = hash('sha256', $password);
        $table_name = DATA_BASE['login_table'];
        $sql = "INSERT INTO $table_name VALUES (NULL, '$user', '$password')";
        if(mysqli_query($conn, $sql)) {
            mysqli_close($conn);
            self::openChat($user);
        } else {
            echo 'Error: ' . $sql . '<br>' . mysqli_error($conn);
        }
    }

    private function openChat($user) {
        $_SESSION['user'] = $user;
        header('Location: chat.php');
        return;
    }
}
