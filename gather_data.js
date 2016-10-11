const key = "AIzaSyCYogLb8gewvYr-rCi3vI6owUXJzhQMVWg";

$(document).ready(function(){
	getLatLngFromName('Brazil');
	getPopulation('Brazil', '1998', 'total', ['19']);
	createMap();
})

function getLatLngFromName(name, callbackfn){
	$.getJSON({
		url: "https://maps.googleapis.com/maps/api/geocode/json?address="
		+ name.replace(" ", "%20") + "&key=" + key,
		},
		function(data){
			if(callbackfn) callbackfn(data.results[0].geometry.location);
		})
}

function getPopulation(country, year, sex, ages_array){
	//sex: females, males, total
	var pop_count = 0;
	$.each(ages_array, function(age){
		$.getJSON({
			url: "http://api.population.io:80/1.0/population/" + 
			year + "/" + country + "/" + age + "/",
			async: false},
			function(data){
				pop_count += data[0][sex];
			})
	})
	console.log(pop_count)
	return pop_count;
}

function createMap(){
	// Where to put the globe?
	var container = document.getElementById( 'container' );

	// Make the globe
	var globe = new DAT.Globe(container);

	//getPopulation('Brazil', '1998', 'total', ['19'])
	getLatLngFromName(
		'Brazil', function(data){
			globe.addData([data.lat, data.lng,
				   100000], {
			animated: true,
			format: 'magnitude',
			name: "Shouldn't matter"
			})
		});
    // Create the geometry
    globe.createPoints();

    // Begin animation
    globe.animate();
}