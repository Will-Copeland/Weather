function fetchOWM() {

	$.getJSON('https://ipinfo.io', function(data){
		var weatherInfo = data.loc.split(",");		
		var lat = Math.round(weatherInfo[0]);
		var lon = Math.round(weatherInfo[1]);	
		
		
		$.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon +"&APPID=ec76489de971d221ea7a5c4e29102371", function(g) {
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
	var tempF = Math.round(9/5 * tempC +32);
	$('#tempF').html(tempF);
	$('#temp').append(tempC);
	$('#F').prepend(tempF);
	$('#C').prepend(tempC);
};


$(document).ready(function() {
	fetchOWM();
	
	$('#temp-unit').on('click', function() {
		if ($('#temp-unit').is(':checked')) {
			$('#C').show();
			$('#F').hide(); 	
		}
		else {
			$('#F').show(); 
			$('#C').hide();
			}	
	});
});
