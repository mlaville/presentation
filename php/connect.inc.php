<?php
/**
 * connect.inc.php
 * 
 * @auteur     marc laville - polinux
 * @Copyleft 2014
 * @date       05/09/2014
 * @version    0.1
 * @revision   $0$
 * 
 *  Connexion  à la base de données
 *
 */
include 'config.inc.php';

try {
    $dbContact = new PDO('mysql:host=' . $loginServeur . ';dbname=' . $nomBase, $loginUsername, $loginPassword);
} catch (PDOException $e) {
	$raisonErreur = str_replace( "'", " ", $e->getMessage() );
	echo "{ success: false, errors: { reason: '" . $raisonErreur . "' } }";
    die();
}

$dbContact->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
$dbContact->exec("SET NAMES 'utf8'");
?>