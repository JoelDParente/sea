<?php
$file = __DIR__ . "/pdfs/teste.pdf";

header("Content-Type: application/pdf");
header("Content-Disposition: inline; filename=\"teste.pdf\"");

// DESATIVA CACHE
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");
header("Pragma: no-cache");

readfile($file);
exit;
