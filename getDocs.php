<?php
require_once ('dbconfig.php');
if (!isset($_SESSION)) {
  session_start();
}

header('Content-Type: application/json; charset=utf-8');



if (isset($_SESSION['admin']) == 1) {
  $query = 'SELECT users.login, document.* FROM users INNER JOIN document ON users.id = document.id_user WHERE document.status = 1 ';

  $stmt = $mysqli->prepare($query);
  if (!$stmt->execute()) {
    echo (date("H:i:s(d.m)") . " Exit->Error: Не удалось выполнить запрос: (" . $stmt->errno . ") " . $stmt->error);
    return;
  }

  $result = $stmt->get_result();
  while ($r = $result->fetch_assoc()) {
    $turs_data[] = $r;
  }
  echo json_encode($turs_data);
}

