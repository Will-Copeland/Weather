


$(document).ready(function() {


$.getJSON('https://ipinfo.io', function(data){
	var arr =  data.loc.split(",");
	var lon = Math.round(arr[0]);
	var lat = Math.round(arr[1]);
	console.log(lon, lat);

	//url = "https://fcc-weather-api.glitch.me/api/current?lon=:" + arr[0]
	
	console.log("https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat);
	$.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + lon +"&lat=" + lat, function(data) {
			var temp = data.main.temp;
			$('#temp').append(temp);
			var humidity = data.main.humidity;
			$('#humidity').append(humidity);
			var windSpd = data.wind.speed;
			$('#windSpd').append(windSpd);
			var weather = data.weather[0].description;
			$('#weather').append(weather);
	}); 
});

console.log(weather);
//	$.get("https://fcc-weather-api.glitch.me/api/current?lon=: &lat=: ", function(data) {
	//	console.log(data);

	//});
/*
	$.get("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=ec76489de971d221ea7a5c4e29102371", function(g) {
		console.log(g.weather);
	}); 
	*/
	
});
