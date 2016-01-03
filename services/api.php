<?php
/**
 * api.php
 * 
 * @auteur     marc laville
 * @Copyleft 2016
 * @date       03/01/2016
 * @version    0.1
 * @revision   $0$
 *
 *
 * REST api de gestion des messages de contact à partir de polinux.fr
 *
 *
 * Licensed under the GPL license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
 require_once 'config.php'; // Database setting constants [DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD]
 require_once("Rest.inc.php");
	
class API extends REST {

	private $db = NULL;
	
	public function __construct(){
		parent::__construct();				// Init parent contructor
		$this->dbConnect();					// Initiate Database connection
	}
	
	/*
	 *  Connect to Database
	*/
	private function dbConnect(){
        $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';

        try {
            $this->db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $e) {
            $response["status"] = "error";
            $response["message"] = 'Connection failed: ' . $e->getMessage();
            $response["data"] = null;
            //echoResponse(200, $response);
            exit;
        }
		
		$this->db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
		$this->db->exec("SET NAMES 'utf8'");
	}
		
	/*
	 * Dynmically call the method based on the query string
	 */
	public function processApi(){
		$func = strtolower( trim( str_replace("/", "", $_REQUEST['x']) ) );

		if( (int)method_exists($this, $func) > 0 )
			$this->$func();
		else
			$this->response('',404); // If the method not exist with in this class "Page not found".
	}
			
	private function mailHtml($destinataire, $expediteur, $sujet, $message) {

		 // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
		$entete = "MIME-Version: 1.0\n";
		$entete .= "Content-type: text/html; charset=UTF-8\n";
		 // En-têtes additionnels
		$entete .= "From: $expediteur\n";
		$entete .= "X-Mailer: PHP\n";
		$entete .= "X-auth-smtp-user: $expediteur\n";
		$entete .= "X-abuse-contact: $expediteur\n";
		$entete .= "Reply-to:$expediteur ";

		// Envoi
		return @mail($destinataire, $sujet, $message, $entete) ;
	}
			
	private function contact(){
		
		if($this->get_request_method() != "POST"){
			$this->response('',406);
		}
		$query = "INSERT INTO " . TABLE_NAME . " ( cct_mail, cct_message, cct_ip, cct_date ) VALUES ( ?, ?, ?, NOW( ) )";
		
       try {
          $stmt = $this->db->prepare($query);
          $response["success"] = $stmt->execute( array($_POST["mail"], $_POST["msg"], $_SERVER['REMOTE_ADDR']) );

		  if( $response["success"] ){
			$response["status"] = "success";
			$response["message"] = "Données Modifiées";
			
			$this->mailHtml(
				'vava.laville@gmail.com', 
				$_POST["mail"],
				'galerie',
				"Commentaire laissé sur le site polinux.fr<hr>\n" . $_POST["msg"]
			);
			$this->mailHtml(
				'vava.laville@voila.fr', 
				$_POST["mail"],
				'galerie',
				"Commentaire laissé sur le site polinux.fr<hr>\n" . $_POST["msg"]
			);
			
		 } else {
			$response["status"] = "warning";
			$response["message"] = "No data found.";
		 }

		 } catch(PDOException $e) {
			$response["status"] = "error";
			$response["message"] = 'Record Failed: ' . $e->getMessage();
		}

		$this->response( json_encode($response), 200 );
	}
}

// Initiiate Library
$api = new API;
$api->processApi();
