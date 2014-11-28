<?php
/**
 * crudContact.php
 * 
 * @auteur     marc laville
 * @Copyleft 2014
 * @date       14/06/2014
 * @version    0.1
 * @revision   $0$
 *
 * - A Faire : Gestion des erreurs
 *
 * Licensed under the GPL license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

include 'connect.inc.php';

function mailHtml($destinataire, $expediteur, $sujet, $message) {

     // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
	$entete = "MIME-Version: 1.0\n";
	$entete .= "Content-type: text/html; charset=UTF-8\n";
     // En-têtes additionnels
	$entete .= "From: $expediteur\n";
//	$entete .= "X-Sender: <$_SERVER['HTTP_REFERER']>\n";
	$entete .= "X-Mailer: PHP\n";
	$entete .= "X-auth-smtp-user: $expediteur\n";
	$entete .= "X-abuse-contact: $expediteur\n";
	$entete .= "Reply-to:$expediteur ";

//     $headers .= 'To: Mary <marc.laville@polinux.net>, Kelly <vava.laville@voila.fr>' . "\r\n";
//     $headers .= 'Cc: anniversaire_archive@example.com' . "\r\n";
//     $headers .= 'Bcc: anniversaire_verif@example.com' . "\r\n";
	
	// Envoi
	return @mail($destinataire, $sujet, "Commentaire laissé sur le site<br>\n" . $message, $entete) ;
}

	$response["success"] = isset($_POST["cmd"]);
	if( $response["success"] ) {
	
		$cmd = $_REQUEST["cmd"];

		$reqInsertCct = "INSERT INTO $nomTable ( cct_mail, cct_message, cct_ip, cct_date )"
				. " VALUES ( ?, ?, ?, NOW( ) )";
		
		// load or save?
		switch($cmd) {
			case "create":

				$stmt = $dbContact->prepare( $reqInsertCct );
				$tabParam = array( $_POST["mail"],
									$_POST["msg"],
									$_SERVER['REMOTE_ADDR']
								);

				$response = array( "success"=>$stmt->execute( $tabParam ) );
	
				if( !$response["success"] ) {
					$err = $stmt->errorInfo();
					$response["error"] = array( "reason"=>$err[2] );
				}
				
//				mailHtml('therese.laville@voila.fr', $_POST["mail"], 'galerie', $_POST["msg"]);
				mailHtml('vava.laville@voila.fr', $_POST["mail"], 'galerie', $_POST["msg"]);
				
			break;
			
			default;
			break;
		}
	} else {
		$response["error"] = array( "reason"=>"No command" );
	}

// return response to client
header("Content-Type: application/json");
echo htmlspecialchars_decode(json_encode($response), ENT_QUOTES);
?>