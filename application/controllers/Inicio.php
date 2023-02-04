<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {

	public function index()
	{
		$this->load->view('inicio');
	}

	public function contacto(){
		$n=$this->input->post('nombre');
		$c=$this->input->post('correo');
		$a=$this->input->post('asunto');
		$m=$this->input->post('mensaje');
		$enviado = $this->sendMessage($n,$c,$a,$m);
		echo $enviado;
	}

	private function sendMessage($n,$c,$a,$m){
		require APPPATH.'/libraries/PHPMailer/PHPMailerAutoload.php';
		$mail = new PHPMailer;
		// $mail->isSMTP();	
		$mail->isSendmail();
		// $mail->SMTPDebug = 2;
		// $mail->Debugoutput = 'html';
		$mail->Host = 'smtp.gmail.com';
		$mail->Host = 'smtp.dreamhost.com';
		$mail->Port = 587;
		$mail->Port = 465;
		$mail->SMTPSecure = 'SSL';
		$mail->SMTPAuth = true;
		$mail->Username = "envios@mexleasing.mx";
		$mail->Password = "m9x8e75ng";
		// $mail->Username = "mcdm.warning@gmail.com";
		// $mail->Password = "warnings";

		//Set who the message is to be sent from
		// $mail->setFrom('','HMH');
		$mail->setFrom('envios@mexleasing.mx','MexLeasing - Site');

		// $mail->addReplyTo('replyto@example.com', 'First Last');
		//Set who the message is to be sent to
		$mail->addAddress('envios@mexleasing.mx');
		//Set the subject line
		$mail->Subject = $a;
		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		// $html="<b>Mensaje de: </b>".$n."<b><br>Correo: </b>".$c."<br>Mensaje:<br><pre>".$m."</pre><br><b>Atentamente:</b>".$c." ";
		$html="¡Hola!<pre>".$m."</pre><br><b>Atentamente: </b>".$n." (".$c.")";
		$mail->msgHTML($html);
		//Replace the plain text body with one created manually
		$mail->AltBody = $m;
		//Attach an image file
		// $mail->addAttachment('images/phpmailer_mini.png');
		//send the message, check for errors
		if (!$mail->send()) {
			echo $mail->ErrorInfo;
			return 0;
		} else {
			return 1;
		}
	}
}
