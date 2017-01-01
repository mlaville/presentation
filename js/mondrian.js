
function initMap() {
	var myCenter=new google.maps.LatLng(46.8252,5.6446),
		mapProp = {
		  center: myCenter,
		  zoom:5,
		  mapTypeId:google.maps.MapTypeId.ROADMAP
		},
		map = new google.maps.Map( document.getElementById("googleMap"), mapProp ),
		marker = new google.maps.Marker( { position: myCenter } );

	marker.setMap(map);
	
	return;
}

window.addEventListener('load', function() {
  var createTags = function () {
      return 'Bootstrap, PDO, SOAP, Ajax, ExtJs, JQuery, WebServices, json, XML, MySql, FireBase'
        .split(',')
          .map( function(str, i) { return {text: str, id: i, weight: 0.1}; });
    },
    p_localisation = document.getElementById('p-localisation'),
    styleMap = document.getElementById('googleMap').classList;

	window.clouder = new Clouder({
    container: clouder,
    callback: function() { return; },
    tags: createTags()
   });
   
	initMap();
	p_localisation.addEventListener("mouseover", function( event ) { return styleMap.remove('transparent');	});
	p_localisation.addEventListener("mouseout", function( event ) { return styleMap.add('transparent'); });

	return;
});
