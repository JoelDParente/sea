<?php
require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance()->getConnection();
    echo "✅ Conexão com o banco de dados bem-sucedida!";
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage();
}
