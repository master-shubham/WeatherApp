

// NOTE: This API key is for demo/learning purposes only
const apiKey = import.meta.env.VITE_API_KEY;

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMsg = document.querySelector(".errorMsg");

async function checkWheathe(city) {
  if (!city || city.trim() === "") {
    return; // Stop the function from running if there's no city name typed yet
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

 
  // 2. Clear previous error state before starting a new search
  errorMsg.style.display = "none";

  if (!response.ok) {
    errorMsg.style.display = "block";
    weatherIcon.style.display = "none"; 
    document.querySelector(".weather").style.display = "none";
    searchInput.value = "";
    return;
  } else {
    try {
      const data = await response.json();
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".errorMsg").style.display = "none";

    } catch (error) {
      errorMsg.style.display = "block";
    }
  }
}

searchBtn.addEventListener("click", () => {
  checkWheathe(searchInput.value);
});
