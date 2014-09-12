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

window.addEventListener('load', function() {

	var cases = document.querySelectorAll('#div-11 div'),
		divClouder = document.getElementById('clouder');
	
/*	for(var i = cases.length ; i > 0 ; i--) {
	
		var zone = cases[i-1];
		
		zone.dataset.num = i;
		zone.addEventListener('click', function() {
			var divRootCL = document.getElementById('div-root').classList;
			
			divRootCL.toggle('zoom');
//			if(divRootCL.length) {
			if(!divRootCL.contains('zoom')) {
				divRootCL.remove( divRootCL.toString() );
				divClouder.style.display = 'block';
			} else {
				divRootCL.add( 'zoom' + this.dataset.num );
				divClouder.style.display = 'none';
			}
			return;
		});
	}
	*/
    window.clouder = new Clouder({
        container: clouder,
		callback: function() { return; },
        tags: createTags()
    });
	/*
	document.getElementById('a-contact').addEventListener('click', function() {
		document.getElementById('li-contact').classList.remove("hidden");
		document.getElementById('clouder').classList.add("hidden");
		
		return;
	});
	*/
	return;
});
