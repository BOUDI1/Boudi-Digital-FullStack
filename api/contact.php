<?php
/**
 * BOUDI DIGITAL - API de contact
 * Ce script traite les données du formulaire et les distribue entre MySQL et MongoDB.
 */

// 1. Entêtes pour autoriser les requêtes JSON (CORS)
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// 2. Inclusion des drivers MongoDB (via Composer)
require_once __DIR__ . '/../vendor/autoload.php';

// 3. Récupération des données envoyées par le script JS
$inputData = file_get_contents("php://input");
$data = json_decode($inputData, true);

// Vérification de la présence des données
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Données incomplètes."]);
    exit;
}

try {
    // --- PARTIE 1 : PERSISTANCE DANS MYSQL (Données structurées) ---
    $host = 'mysql-db';
    $db   = 'boudi_sql';
    $user = 'root';
    $pass = 'root';

    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name'    => htmlspecialchars($data['name']),
        ':email'   => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
        ':message' => htmlspecialchars($data['message'])
    ]);

    // --- PARTIE 2 : LOG DANS MONGODB (Données non-structurées) ---
    $mongoClient = new MongoDB\Client("mongodb://mongo-db:27017");
    $logCollection = $mongoClient->boudi_nosql->activity_logs;

    $logCollection->insertOne([
        'type' => 'contact_form_submission',
        'user_email' => $data['email'],
        'timestamp' => new MongoDB\BSON\UTCDateTime(),
        'status' => 'success'
    ]);

    // 4. Réponse de succès au Front-end
    http_response_code(201);
    echo json_encode(["message" => "Message enregistré avec succès dans les deux systèmes."]);

} catch (Exception $e) {
    // En cas d'erreur, on renvoie un code 500
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
?>