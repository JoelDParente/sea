<?php
require_once __DIR__ . '/env.php';

return [
    'secret_key' => $_ENV['SECRET_KEY'],
    'algorithm' => 'HS256',
    'expire_time' => 3600 // 1 HORA
];
