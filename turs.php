<?php
require_once('dbconfig.php');

header('Content-Type: application/json; charset=utf-8');

$query = "
SELECT tur.*
FROM `tur` 
WHERE tur.quantity > 0
";

if ($_GET['fromCity'] != null) {
    $query = $query . "AND tur.fromCity LIKE '%" . $_GET['fromCity'] . "%'";
}

if ($_GET['country'] != null) {
    $query = $query . "AND tur.country LIKE '%" . $_GET['country'] . "%'";
}

if ($_GET['date'] != null) {
    $query = $query . "AND tur.date = '" . $_GET['date'] . "'";
}

if ($_GET['days'] != null) {
    $query = $query . "AND tur.days = '" . $_GET['days'] . "'";
}

if ($_GET['cost'] != null) {
    $query = $query . "AND tur.cost < '" . $_GET['cost'] . "'";
}


$stmt = $mysqli->prepare($query);

$stmt->execute();
$result = $stmt->get_result();
while ($r = $result->fetch_assoc()) {
    $turs_data[] = $r;
}
echo json_encode($turs_data);
