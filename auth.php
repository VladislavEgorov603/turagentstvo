<?php
require_once('dbconfig.php');

if (isset($_POST['login']) && isset($_POST['password'])) {

    $login = $_POST['login'];
    $password = $_POST['password'];

    $stmt = $mysqli->prepare('SELECT * FROM users WHERE login = ? AND password = ?');

    $stmt->bind_param('ss', $login, $password);

    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $user_data = $result->fetch_assoc();
        if (!isset($_SESSION)) {
            session_start();
        }
        if($user_data['admin']){
            $_SESSION['admin'] = true;
        }
        $_SESSION['user_id'] = $user_data['id'];
        $_SESSION['username'] = $user_data['login'];
        echo json_encode(array('status' => true));
    } else
        echo json_encode(array('status' => false));
}
