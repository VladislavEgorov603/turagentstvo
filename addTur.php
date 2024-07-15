<?php
require_once('dbconfig.php');
require_once __DIR__."/config.php";

$fromCity = $_POST['fromCity'];
$country = $_POST['country'];
$date = $_POST['date'];
$days = $_POST['days'];
$cost = $_POST['cost'];
$description = $_POST['description'];
$quantity = $_POST['quantity'];
$query = 'INSERT INTO tur (fromCity, country, date, days, cost, description, quantity) VALUES(?, ? ,?, ?, ?, ?, ?)';

$stmt = $mysqli->prepare($query);

$stmt->bind_param('sssidss', $fromCity, $country, $date, $days, $cost, $description, $quantity);


if(!$stmt->execute()) {
  echo(date("H:i:s(d.m)")." Exit->Error: Не удалось выполнить запрос: (".$stmt->errno.") ".$stmt->error);
}

echo(true);