function createTags() {
    var elems = [];
    elems.push({text: "Bootstrap", id: "1", weight: 0.1});
    elems.push({text: "PDO", id: "1", weight: 0.1});
    elems.push({text: "SOAP", id: "2", weight: 0.1});
    elems.push({text: "Ajax", id: "3", weight: 0.1});
    elems.push({text: "ExtJs", id: "4", weight: 0.1});
    elems.push({text: "JQuery", id: "5", weight: 0.1});
    elems.push({text: "Git", id: "6", weight: 0.1});
    elems.push({text: "WebServices", id: "7", weight: 0.1});
    elems.push({text: "json", id: "8", weight: 0.1});
    elems.push({text: "XML", id: "9", weight: 0.1});
    elems.push({text: "MySql", id: "9", weight: 0.1});
    elems.push({text: "FireBase", id: "10", weight: 0.1});
    return elems;
} // createTags


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

var p_localisation = document.getElementById('p-localisation'),
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
