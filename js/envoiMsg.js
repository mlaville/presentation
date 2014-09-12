/**
 * envoiMsg.js
 * 
 * @auteur     marc laville
 * @Copyleft 2014
 * @date       15/06/2014
 * @version    0.1
 * @revision   $0$
 *
 * - Gere la saisie des message depuis la galerie
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
	httpRequest.open('POST', './php/crudContact.php', true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send( 'cmd=create&mail=' + encodeURIComponent(unMail) + '&msg='  + encodeURIComponent(unMsg) );

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
