<?php
require_once('dbconfig.php');

if (isset($_GET['id'])) {

    $id = $_GET['id'];

    $stmt = $mysqli->prepare('SELECT * FROM tur WHERE id = ?');

    $stmt->bind_param('s', $id);

    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $tur_data = $result->fetch_assoc();
        echo json_encode($tur_data);
    }
}
