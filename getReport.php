<?php
require_once('dbconfig.php');

header('Content-Type: application/json; charset=utf-8');

$datestart = $_GET['datestart'];
$dateend = $_GET['dateend'];
$type = $_GET['type'];

if ($type == 1) {
    $query = 'SELECT SUM(tur.cost) FROM tur JOIN turreg ON tur.id = turreg.id_tur WHERE turreg.date > "'.$datestart.'" AND turreg.date < "'.$dateend.'"';
}

if ($type == 2) {
    $query = 'SELECT tur.*, users.login FROM tur JOIN turreg ON tur.id = turreg.id_tur JOIN users ON turreg.id_user = users.id WHERE turreg.date > "'.$datestart.'" AND turreg.date < "'.$dateend.'"';
}

if ($type == 3) {
    $query = 'SELECT users.login, document.* FROM users INNER JOIN document ON users.id = document.id_user WHERE status = 3 AND document.date > "'. $datestart .'" AND document.date < "'. $dateend .'"';
}


$stmt = $mysqli->prepare($query);
if(!$stmt->execute()) {
  echo(date("H:i:s(d.m)")." Exit->Error: Не удалось выполнить запрос: (".$stmt->errno.") ".$stmt->error);
  return;
}

$result = $stmt->get_result();

while ($r = $result->fetch_assoc()) {
    $turs_data[] = $r;
}
echo json_encode($turs_data);
