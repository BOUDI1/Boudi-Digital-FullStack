<?php
require_once __DIR__ . '/../vendor/autoload.php'; // Si vous utilisez Composer pour le driver MongoDB

try {
    $mongoClient = new MongoDB\Client("mongodb://mongo-db:27017");
    $nosqlDb = $mongoClient->boudi_nosql;
} catch (Exception $e) {
    echo "Erreur NoSQL : " . $e->getMessage();
}
?>