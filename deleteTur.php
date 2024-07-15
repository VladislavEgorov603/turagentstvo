<?php
require_once('dbconfig.php');
require_once __DIR__."/config.php";

$id = $_POST['id'];

$query = 'UPDATE tur SET quantity = 0 WHERE id = ?';

$stmt = $mysqli->prepare($query);

$stmt->bind_param('s', $id);


if(!$stmt->execute()) {
  echo(date("H:i:s(d.m)")." Exit->Error: Не удалось выполнить запрос: (".$stmt->errno.") ".$stmt->error);
}

echo(true);