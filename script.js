const apiKey = '3f986598a2dec8a39bd934bdfa79d04c';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorMsg = document.querySelector('.errorMsg');

async function checkWheathe(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector('.errorMsg').style.display = "block"
        document.querySelector('.weather').style.display = "none"
    } else {

        const data = await response.json();
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "/weather-app-img/images/clouds.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "/weather-app-img/images/rain.png";

        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "/weather-app-img/images/drizzle.png";

        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "/weather-app-img/images/mist.png";

        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "/weather-app-img/images/clear.png";
        }

        document.querySelector('.weather').style.display = "block"
        document.querySelector('.errorMsg').style.display = "none"


    }
}

searchBtn.addEventListener('click', () => {
    checkWheathe(searchInput.value);
})

