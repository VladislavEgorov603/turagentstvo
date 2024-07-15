<?php
require_once('dbconfig.php');

if(isset($_POST['login']) && isset($_POST['password'])){

    $login = $_POST['login'];
    $password = $_POST['password'];

    $stmt = $mysqli->prepare('INSERT INTO users (login, password, admin) VALUES(?,?,0)');

    $stmt->bind_param('ss', $login, $password);

    $stmt->execute();
    if(!isset($_SESSION)){session_start();}

    $_SESSION['user_id'] = $user_data['id'];
    $_SESSION['username'] = $user_data['name'];
}
?>