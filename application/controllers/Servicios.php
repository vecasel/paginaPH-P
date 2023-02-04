<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';
class Servicios extends REST_Controller {

    public function __construct(){
        parent::__construct();
    }

    public function contacto(){
		$n=$this->input->post('nombre');
		$c=$this->input->post('correo');
		$a=$this->input->post('asunto');
		$m=$this->input->post('mensaje');
		$this->sendMessage($n,$c,$a,$m);

	}

	private function sendMessage($n,$c,$m){
        require APPPATH.'/libraries/PHPMailer/PHPMailerAutoload.php';
        $mail = new PHPMailer;
        // $mail->isSMTP();	
        $mail->isSendmail();
        // $mail->SMTPDebug = 2;
        // $mail->Debugoutput = 'html';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "keyvapers@gmail.com";
        $mail->Password = "Keila060621.";
        //Set who the message is to be sent from
        $mail->setFrom('keyvapersg@gmail.com','MEXLEASING');
        // $mail->addReplyTo('replyto@example.com', 'First Last');
        //Set who the message is to be sent to
        $mail->addAddress('keyvapersg@gmail.com');
        //Set the subject line
        $mail->Subject = 'MEXLEASING - '.$a;
        //Read an HTML message body from an external file, convert referenced images to embedded,
        //convert HTML into a basic plain-text alternative body
        $html="¡Hola!<pre>".$m."</pre><br><b>Atentamente:</b>".$n." (".$c.")";
        $mail->msgHTML($html);
        //Replace the plain text body with one created manually
        $mail->AltBody = $m;
        //Attach an image file
        // $mail->addAttachment('images/phpmailer_mini.png');
        //send the message, check for errors
        if (!$mail->send()) {
            return 0;
        } else {
            return 1;
        }
	}
}