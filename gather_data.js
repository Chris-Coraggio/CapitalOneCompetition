const key = "AIzaSyCYogLb8gewvYr-rCi3vI6owUXJzhQMVWg";
var container, globe;
var countries = ["United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Albania", "Armenia", "Angola", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Åland Islands", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Saint Barthelemy", "Brunei Darussalam", "Bolivia", "Caribbean Netherlands ", "Brazil", "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", "Canada", "Cocos Islands","Central African Republic", "Congo", "Switzerland", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Curaçao", "Christmas Island", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands", "Faroe Islands", "France", "Gabon", "United Kingdom", "Grenada", "Georgia", "French Guiana", "Guernsey", "Ghana", "Gibraltar", "Greenland", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Hong Kong", "Heard and McDonald Islands", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Israel", "Isle of Man", "India", "British Indian Ocean Territory", "Iraq", "Iran", "Iceland", "Italy", "Jersey", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "North Korea", "South Korea", "Kuwait", "Cayman Islands", "Kazakhstan", "Lao People's Democratic Republic", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libya", "Morocco", "Monaco", "Moldova", "Montenegro", "Saint-Martin (France)", "Madagascar", "Marshall Islands", "Macedonia", "Mali", "Myanmar", "Mongolia", "Macau", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "The Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "St. Pierre and Miquelon", "Pitcairn", "Puerto Rico","Portugal", "Palau", "Paraguay", "Qatar", "Réunion", "Romania", "Serbia", "Russian Federation", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Svalbard and Jan Mayen Islands", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "South Sudan", "Sao Tome and Principe", "El Salvador", "Sint Maarten (Dutch part)", "Syria", "Swaziland", "Turks and Caicos Islands", "Chad", "French Southern Territories", "Togo", "Thailand", "Tajikistan", "Tokelau", "Timor-Leste", "Turkmenistan", "Tunisia", "Tonga", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania", "Ukraine", "Uganda", "United States Minor Outlying Islands", "United States", "Uruguay", "Uzbekistan", "Vatican", "Saint Vincent and the Grenadines", "Venezuela", "Virgin Islands", "Vietnam", "Vanuatu", "Wallis and Futuna Islands", "Samoa", "Yemen", "Mayotte", "South Africa", "Zambia", "Zimbabwe"];
var allData = [];

$(document).ready(function(){
	createMap();
	for(var i in countries){
		console.log(countries[i])
		addLatLngFromName(countries[i]);
	}
	//getPopulation('Brazil', '1998', 'total');
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
				   getPopulation(name, '1980', 'males'));
		});
}

function getPopulation(country, year, sex){
	//sex: females, males, total
	var pop_count = 0;
		$.getJSON({
			url: "http://api.population.io:80/1.0/population/" + 
			year + "/" + country + "/",
			async: false},
			function(data){
				pop_count += Math.pow(data[0][sex], 0.05);
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
	for(var i = 2; i < allData.length; i += 3)
	console.log(allData[i]);
	globe.addData(allData, {
			format: 'magnitude',
			name: Math.random(),
			animated: false
			});

		setTimeout(function(){
			globe.createPoints();
			globe.animate();
		}, 5000);
}