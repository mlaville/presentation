/**
 * envoiMsg.js
 * 
 * @auteur     marc laville
 * @Copyleft 2014
 * @date       15/06/2014
 * @version    0.1
 * @revision   $0$
 *
 * @date revision   03/01/2016 Utilisation du service ./services/contact
 *
 *  Gestion des messages de contact à partir de polinux.fr
 *
 * Licensed under the GPL license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

var httpRequest = false;

function makeRequest( unMail, unMsg ) {

	httpRequest = false;

	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		httpRequest = new XMLHttpRequest();
		if (httpRequest.overrideMimeType) {
			httpRequest.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
			httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	httpRequest.onreadystatechange = alertContents;
	httpRequest.open('POST', './services/contact', true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send( 'mail=' + encodeURIComponent(unMail) + '&msg='  + encodeURIComponent(unMsg) );

	return;
}

function alertContents() {

	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var rep = JSON.parse( httpRequest.responseText );
			
			if( rep.success ) {
				var evt = document.createEvent("MouseEvents");
				
				alert("Votre message a bien été transmis");
//				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				
//				document.querySelector( 'nav ul li a' ).dispatchEvent(evt);
			}
		} else {
			alert('There was a problem with the request.');
		}
	}

}

document.forms.contact.addEventListener( 'submit', 
	function( e ) {
		e.preventDefault();
		e.stopPropagation();
		
		makeRequest(e.currentTarget.mail.value, e.currentTarget.txtMessage.value );
		
		return;
	}
);
