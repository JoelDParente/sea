<?php
require_once __DIR__ . '/../controllers/authController.php';

$authController = new AuthController();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/login') {
    $authController->login();
}
