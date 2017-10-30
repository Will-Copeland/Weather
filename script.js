var arr = [];

function fetch() {

	$.getJSON('https://ipinfo.io', function(data){
		var weatherInfo =  data.loc.split(",");
		var lon = Math.round(weatherInfo[0]);
		var lat = Math.round(weatherInfo[1]);
		console.log(lon, lat);

	//url = "https://fcc-weather-api.glitch.me/api/current?lon=:" + arr[0]
	
	console.log("https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat);
	
		$.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + lon +"&lat=" + lat, function(data) {
			
			var temp = data.main.temp;
			arr.push(data.main.temp);
			$('#temp').append(temp);
			var humidity = data.main.humidity;
			arr.push(data.main.humidity);
			$('#humidity').append(humidity);
			var windSpd = data.wind.speed;
			arr.push(data.wind.speed);
			$('#windSpd').prepend(windSpd);
			var weather = data.weather[0].description;
			arr.push(data.weather[0].description);
			$('#weather').append(weather);
			console.log(arr);
		});
		 
	});

};



function fetchOWM() {

	$.getJSON('https://ipinfo.io', function(data){
	
		var weatherInfo = data.loc.split(",");
		
		var lat = Math.round(weatherInfo[0]);
		var lon = Math.round(weatherInfo[1]);
		
		console.log(lon, lat);
		
		$.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon +"&APPID=ec76489de971d221ea7a5c4e29102371", function(g) {
		
		$('.view').css('background','url("https://source.unsplash.com/1920x1080/?' +	g.weather[0].main.toLowerCase() + '")');
		
			$('#tempK').append(g.main.temp);
			tempCalc();

			$('#weather').append(g.weather[0].main);
			
			$('#humidity').append(g.main.humidity);
			$('#windSpd').append(g.wind.speed);
			
			
		}); 
	
	});
};

function tempCalc() {

	var tempK = $('#tempK').html();
	$('#tempC').html(Math.round((tempK - 273.15), -1));
	var tempC = $('#tempC').html();
	var tempF = 9/5 * tempC +32;
	$('#tempF').html(tempF);
	$('#temp').append(tempC);
	$('#F').prepend(tempF);
	$('#C').prepend(tempC);
};



$(document).ready(function() {
	//alert("Hellow");
	
	//if ($('#temp-unit').
fetchOWM();
//tempCalc();

	$('#temp-unit').on('click', function() {
		if ($('#temp-unit').is(':checked')) {
			$('#F').show();
			$('#C').hide(); console.log('1');
			
		}
		else {
			$('#C').show(); 
			$('#F').hide();
			console.log('2');
			}
			
	});
});
