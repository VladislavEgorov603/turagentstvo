<?php
require_once('dbconfig.php');
if (!isset($_SESSION)) {
    session_start();
}

$userId = $_SESSION['user_id'];

$pas = $_POST['pas'];
$visa = $_POST['visa'];
$fio = $_POST['fio'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$comment = $_POST['comment'];
$date = date("Y-m-d");



$stmt = $mysqli->prepare('INSERT INTO document (`id_user`, `pas`, `visa`, `status`, `fio`, `phone`, `email`, `comment`, `date`) VALUES(?,?,?,1,?,?,?,?,?)');

$stmt->bind_param('ssssssss', $userId, $pas, $visa, $fio, $phone, $email, $comment, $date);

if(!$stmt->execute()) {
  echo(date("H:i:s(d.m)")." Exit->Error: Не удалось выполнить запрос: (".$stmt->errno.") ".$stmt->error);
}