<?php
require_once('dbconfig.php');

$stmt = $mysqli->prepare('UPDATE document SET document.status = '. $_POST["status"] .' WHERE document.id = '. $_POST["id"]);

if(!$stmt->execute()) {
  echo(date("H:i:s(d.m)")." Exit->Error: Не удалось выполнить запрос: (".$stmt->errno.") ".$stmt->error);
}
echo true;