<?php
require_once('dbconfig.php');
if (!isset($_SESSION)) {
    session_start();
}

$userId = $_SESSION['user_id'];
$turId = $_POST['id'];

$address = $_POST['address'];
$name = $_POST['name'];
$surname = $_POST['surname'];
$dateofbirth = $_POST['dateofbirth'];
$sex = $_POST['sex'];
$serialpas = $_POST['serialpas'];
$numberpas = $_POST['numberpas'];
$datefrom = $_POST['datefrom'];
$dateto = $_POST['dateto'];


$date = date("Y-m-d");

$stmt = $mysqli->prepare('INSERT INTO turreg (`id_user`, `id_tur`, `quantity`, `date`, `address`,`name`,`surname`,`dateofbirth`, `sex`, `serialpas`,`numberpas`, `datefrom`,`dateto`) VALUES(?,?,1,?,?,?,?,?,?,?,?,?,?)');

$stmt->bind_param('ssssssssssss', $userId, $turId, $date, $address, $name, $surname, $dateofbirth, $sex, $serialpas, $numberpas, $datefrom, $dateto);

if(!$stmt->execute()) {
  echo(date("H:i:s(d.m)")." Exit->Error: Не удалось выполнить запрос: (".$stmt->errno.") ".$stmt->error);
}

$stmt = $mysqli->prepare('UPDATE tur SET quantity = quantity - 1 WHERE id = ?');
$stmt->bind_param('s', $turId);

if(!$stmt->execute()) {
  echo(date("H:i:s(d.m)")." Exit->Error: Не удалось выполнить запрос: (".$stmt->errno.") ".$stmt->error);
}