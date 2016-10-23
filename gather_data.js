const key = "AIzaSyCYogLb8gewvYr-rCi3vI6owUXJzhQMVWg";
var container, globe;
var allData = [];

$(document).ready(function(){
	createMap();
	populateMap();

	$("#submitButton").click(function(){
	console.log("You clicked me!");
	$("#container").html(
			"<div id=\"picture-holder\"><img style=\"width: 100%; height: 100%; align-content: center;\" src=\"http://www.owlhatworld.com/wp-content/uploads/2015/12/38.gif\"></div>"
		)
	setTimeout(function(){
		for(var i in countries){
		console.log(countries[i])
		addLatLngFromName(countries[i]);
		}
		populateMap();
	}, 1000)
	})
})

function addLatLngFromName(name, callback){
	$.getJSON({
		url: "https://maps.googleapis.com/maps/api/geocode/json?address="
		+ name.replace(" ", "%20") + "&key=" + key,
		async: false
		},
		function(data){
			console.log(data)
			data = data.results[0].geometry.location;
			allData.push(data.lat, data.lng,
				   getPopulation(name, '1980', 'males'));
		});
}

function getPopulation(country, year, sex){
	//sex: females, males, total
	var pop_count = 0;
	var year = $("#yearInput").val();
	var sex = $("#sexDropdown").val();
		$.getJSON({
			url: "http://api.population.io:80/1.0/population/" + 
			year + "/" + country + "/",
			async: false},
			function(data){
				pop_count += Math.pow(data[0][sex], 0.01);
			})
	console.log("Count for " + country + ": " + pop_count)
	return pop_count;
}

function createMap(){
	// Where to put the globe?
	container = document.getElementById( 'container' );

	// Make the globe
	globe = new DAT.Globe(container);
}

function populateMap(){
	console.log(allData)
	if(allData[0] != null){
		console.log("Adding points")
		$("#container").html("");
		createMap();
		globe.addData(allData, {
				format: 'magnitude',
				name: Math.random(),
				animated: false
				});
		globe.createPoints();
		setTimeout(function(){
			globe.animate();
		}, 2000);
	}
	else globe.animate();

		
}

var countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Angola",
    "Antigua and Barbuda",
    "Azerbaijan",
    "Argentina",
    "Australia",
    "Austria",
    "The Bahamas",
    "Bahrain",
    "Bangladesh",
    "Armenia",
    "Barbados",
    "Belgium",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Belize",
    "Solomon Islands",
    "Brunei Darussalam",
    "Bulgaria",
    "Myanmar",
    "Burundi",
    "Belarus",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cabo Verde",
    "Central African Republic",
    "Sri Lanka",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Mayotte",
    "Congo",
    "Dem Rep of Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Benin",
    "Denmark",
    "Dominican Republic",
    "Ecuador",
    "El Salvador",
    "Equatorial Guinea",
    "Ethiopia",
    "Eritrea",
    "Estonia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Djibouti",
    "Gabon",
    "Georgia",
    "The Gambia",
    "West Bank and Gaza",
    "Germany",
    "Ghana",
    "Kiribati",
    "Greece",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong SAR-China",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Islamic Republic of Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Cote-d-Ivoire",
    "Jamaica",
    "Japan",
    "Kazakhstan",
    "Jordan",
    "Kenya",
    "Rep of Korea",
    "Kuwait",
    "Kyrgyz Republic",
    "Lao PDR",
    "Lebanon",
    "Lesotho",
    "Latvia",
    "Liberia",
    "Libya",
    "Lithuania",
    "Luxembourg",
    "Macao SAR China",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Mongolia",
    "Moldova",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Oman",
    "Namibia",
    "Nepal",
    "The Netherlands",
    "Curacao",
    "Aruba",
    "New Caledonia",
    "Vanuatu",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Federated States of Micronesia",
    "Pakistan",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Guinea-Bissau",
    "Timor-Leste",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "St-Lucia",
    "St-Vincent and the Grenadines",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovak Republic",
    "Vietnam",
    "Slovenia",
    "Somalia",
    "South Africa",
    "Zimbabwe",
    "Spain",
    "South Sudan",
    "Sudan",
    "Western Sahara",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Tajikistan",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "United Arab Emirates",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Uganda",
    "Ukraine",
    "FYR Macedonia",
    "Arab Rep of Egypt",
    "United Kingdom",
    "Channel Islands",
    "Tanzania",
    "United States",
    "US Virgin Islands",
    "Burkina Faso",
    "Uruguay",
    "Uzbekistan",
    "Samoa",
    "Zambia",
  ];