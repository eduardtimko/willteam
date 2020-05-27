<?php

$subject = "Заявка на на seo 100 руб"; //Заголовок письма
$to = 'info@willteam.by'; //Куда отправлять письма
$from = 'info@willteam.by';
$headers = "MIME-Version: 1.0" . $nl;
$headers .= "From: " . $from . $nl . "Reply-To: " . $from . $nl;
$headers .= "From: " . $from . $nl . "Reply-To: " . $from . $nl;
$headers .= "Content-Type: multipart/mixed;boundary=" . $boundary . $nl;
//$headers = "From: ".$_SERVER['SERVER_NAME']."\r\n";
//$headers = $headers."Content-type: text/plain; charset=\"utf-8\"\r\n";
//$headers = $headers."Content-Transfer-Encoding: quoted-printable\r\n\r\n";


$subject = $subject . ' из формы ' . $_POST['tokenF'];
$subject = "=?utf-8?b?" . base64_encode($subject) . "?=";

$message = "Имя: " . $_POST['name'] . "\nТелефон: " . $_POST['phone'] . "\nE-mail: " . $_POST['email'] . "\nСайт: " . $_POST['site'];

//save log

$logFile = __DIR__ . '/maillog/' . date("Y-m-d_H-i-s") . '.json';
$browser = $_SERVER['HTTP_USER_AGENT'];
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$dataLOg = array("formData" => $_POST, "browser" => $browser,"ip"=>$ip);

file_put_contents($logFile, json_encode($dataLOg, JSON_UNESCAPED_UNICODE));

@mail($to, $subject, $message, $headers) or
die("Ошибка при отправке письма.");
echo $_POST['phone'];
	