<?php

	$subject = "Заявка с тарифов seo"; //Заголовок письма
	$to = 'info@willteam.by'; //Куда отправлять письма

	//$headers = "From: ".$_SERVER['SERVER_NAME']."\r\n";  
	//$headers = $headers."Content-type: text/plain; charset=\"utf-8\"\r\n";
	//$headers = $headers."Content-Transfer-Encoding: quoted-printable\r\n\r\n";
	

	$from = 'info@willteam.by';

	$headers = 'From: '.$from . "\r\n" .
        'Reply-To: '.$from . "\r\n" .
        'MIME-Version: 1.0' . "\r\n" .
        'Content-Type: text/html; charset=UTF-8' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
	
		$subject = $subject.' из формы '.$_POST['tokenF'];
		$subject = "=?utf-8?b?". base64_encode($subject) ."?=";

		if (isset($_POST["name"]) && !empty($_POST["name"])) {
		    $message = "Имя: ".$_POST['name']."\n <br> Телефон: ".$_POST['phone'];   
		} else	
			$message = "Телефон: ".$_POST['phone'];

		if (isset($_POST["check"]) && !empty($_POST["check"])) {
			if(($_POST["check"]) == "check")
				$message = $message."\nДелаю заказ первый раз";
		}
		
	
		@mail($to, $subject, $message, $headers) or 
			die("Ошибка при отправке письма.");
  		 echo $_POST['phone'];
	