//Does API calls, and controls data functions
function fetchOWM() {
	$.getJSON('https://ipinfo.io', function(data){
		var weatherInfo = data.loc.split(",");
		var lat = Math.round(weatherInfo[0]);
		var lon = Math.round(weatherInfo[1]);

		$.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon +"&APPID=ec76489de971d221ea7a5c4e29102371", function(g) {
			storeData(g); //stores fresh data
			fetchData(); //renders saved data
			tempChange();
		});
	});
};
//Converts epoch and 24 to 12 hour time
function dateConv(unix) {
	date = new Date(unix*1000);
	var hours = date.getHours();
	if (hours > 12){
		hours = hours - 12;
	}
	var minutes = "0" + date.getMinutes();
	var time = hours + ":" + minutes.substr(-2);
	return time;
};
//Fetches data from localStorage
function fetchData() {
	var sunrise = localStorage.getItem("sunrise");
		$('#sunrise').append(sunrise + " AM");
	var sunset = localStorage.getItem("sunset");
		$('#sunset').append(sunset + " PM");
	var city = localStorage.getItem("city");
		$('#city').append(city);
	var lon = localStorage.getItem("lon");
		$('#lon').append(lon);
	var lat = localStorage.getItem("lat");
		$('#lat').append(lat);
	var press = localStorage.getItem("press");
		$('#press').append(press + " hPa");
	var windSpd = localStorage.getItem("windSpd");
		$('#windSpd').append(windSpd);
	var windDir = localStorage.getItem("windDir");
		$('#windDir').append(windDir);
	var icon = localStorage.getItem("icon");
		$('#icon').attr("src","http://openweathermap.org/img/w/" + icon + ".png")
	var weath = localStorage.getItem("weath");
		$('#weath').append(weath);
};
//stores data to localStorage
function storeData(obj) {
		localStorage.setItem("sunrise", dateConv(obj.sys.sunrise));
		localStorage.setItem("sunset", dateConv(obj.sys.sunset));
		localStorage.setItem("city", obj.name);
		localStorage.setItem("lon", obj.coord.lon);
		localStorage.setItem("lat", obj.coord.lat);
		localStorage.setItem("temp", obj.main.temp);
		localStorage.setItem("press", obj.main.pressure);
		localStorage.setItem("low", obj.main.temp_min);
		localStorage.setItem("high", obj.main.temp_max);
		localStorage.setItem("windSpd", obj.wind.speed);
		localStorage.setItem("windDir", obj.wind.deg);
		localStorage.setItem("dt", obj.dt);
		localStorage.setItem("icon", obj.weather[0].icon);
		localStorage.setItem("weath",obj.weather[0].main);
};
/*Converts from K to C & F and appends the DOM*/
function tempCalc(temp) {
	var arr = [];
	var tempK = temp;
	var tempC = Math.round((tempK - 273.15), -1);
	var tempF = Math.round(9/5 * tempC + 32);
	arr.push(tempK);
	arr.push(tempC);
	arr.push(tempF);
	return arr;
};
//Handles F/C toggle
function tempChange() {
	var temp = localStorage.getItem("temp");
		tempArr = tempCalc(temp);
	var low = localStorage.getItem("low");
		lowArr = tempCalc(low);
	var high = localStorage.getItem("high");
		highArr = tempCalc(high);
	if(document.getElementById("unit").checked) {
		$('#low').empty();
		$('#low').append("Low: " + lowArr[2]);
		$('#temp').empty();
		$('#temp').append("Current Temp: " + tempArr[2]);
		$('#high').empty();
		$('#high').append("high: " + highArr[2]);
	} else {
		$('#low').empty();
		$('#low').append("Low: " + lowArr[1]);
		$('#temp').empty();
		$('#temp').append("Current Temp: " + tempArr[1]);
		$('#high').empty();
		$('#high').append("high: " + highArr[1]);
	}
};
$(document).ready(function() {
/*Fetches geo-loc and weather info*/
	fetchOWM();
	//Handles F/C toggle
	$('#unit').click(function(){
		tempChange();
	});
});
