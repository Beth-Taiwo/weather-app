let appId = '0067c2b5caded038a5aedcd193cc16a2';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm){
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
		searchMethod = 'zip';
	else
		searchMethod = 'q';
}

function searchWeather(searchTerm){
	getSearchMethod(searchTerm);
fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
	return result.json();
}).then(result => {
	init(result);
})
}
function init(resultFromServer){
	switch(resultFromServer.weather[0].main){
		case 'Clear':
			document.body.style.backgroundImage= 'url("img/clear.jpg")';
			break;
		
		case 'Clouds':
			document.body.style.backgroundImage= 'url("img/cloud.jpg")';
			break;
		
		case 'Rain':
		case 'Drizzle':
		case 'Mist':
			document.body.style.backgroundImage= 'url("img/rain.jpg")';
			break;
		
		case 'Thunderstorm':
			document.body.style.backgroundImage= 'url("img/storm.jpg")';
			break;

		case 'Snow':
				document.body.style.backgroundImage= 'url("img/snow.jpg")';
			break;
		
		case 'Haze':
				document.body.style.backgroundImage= 'url("img/haze1.jpg")';
			break;
			
		default:
			break;

	}
	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let windSpeedElement = document.getElementById('windSpeed');
	let cityHeader = document.getElementById('cityHeader');
	let weatherIcon = document.getElementById('documentIconImg');
	
	
	weatherIcon.src = 'https://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
	
	
	let weatherDescription = resultFromServer.weather[0].description;
	 
	weatherDescriptionHeader.innerText = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
	
	 temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
	 windSpeedElement.innerHTML = 'Winds at '+Math.floor(resultFromServer.wind.speed) + 'm/s';
	 cityHeader.innerHTML = resultFromServer.name;
	 humidityElement.innerHTML = 'Humidity levels at '+ resultFromServer.main.humidity + '%';
	
	 console.log(resultFromServer);
	 
	 setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
	let weatherContainer = document.getElementById('weatherContainer');
	let weatherContainerHeight = weatherContainer.clientHeight;
	let weatherContainerWidth = weatherContainer.clientWidth;
	
	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.5}px)`;
	weatherContainer.style.visibility = 'visible';
}
document.getElementById('searchBtn').addEventListener('click',() => {
	let searchTerm = document.getElementById('searchInput').value;
	if(searchTerm)
		searchWeather(searchTerm);
})