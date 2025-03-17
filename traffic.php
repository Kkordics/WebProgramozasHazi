<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

// Random szám 
$randomNumber = rand(250, 600);


echo "data: {$randomNumber}\n\n";
flush();
?>