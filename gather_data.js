const key = "AIzaSyCYogLb8gewvYr-rCi3vI6owUXJzhQMVWg";
var container, globe;
var countries = ['Brazil', 'Colombia', 'United States', 'Spain'];
var allData = [];

$(document).ready(function(){
	createMap();
	for(var i in countries){
		console.log(countries[i])
		addLatLngFromName(countries[i]);
	}
	//getPopulation('Brazil', '1998', 'total', ['19']);
	populateMap();
})

function addLatLngFromName(name, callback){
	$.getJSON({
		url: "https://maps.googleapis.com/maps/api/geocode/json?address="
		+ name.replace(" ", "%20") + "&key=" + key,
		async: false
		},
		function(data){
			data = data.results[0].geometry.location;
			allData.push(data.lat, data.lng,
				   getPopulation(name, '1980', 'males', ['18', '19', '20']));
		});
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
	return pop_count;
}

function createMap(){
	// Where to put the globe?
	container = document.getElementById( 'container' );

	// Make the globe
	globe = new DAT.Globe(container);
}

function populateMap(){
	console.log(allData);
	globe.addData(allData, {
			format: 'magnitude',
			name: Math.random(),
			animated: false
			});

		setTimeout(function(){
			globe.createPoints();
			globe.animate();
		}, 2000);
}