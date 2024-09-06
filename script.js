// OpenWeatherMap API Key
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

// Get Weather by User's Geolocation
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon);
      },
      (error) => {
        alert(
          "Unable to retrieve your location. Please enter a location manually."
        );
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Get Weather by User Input
function getWeatherByInput() {
  const location = document.getElementById("locationInput").value;
  if (location) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data))
      .catch((error) => {
        alert("Location not found.");
      });
  } else {
    alert("Please enter a location.");
  }
}

// Fetch Weather Data
function fetchWeatherData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => {
      alert("Unable to fetch weather data.");
    });
}

// Display Weather Information
function displayWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  const { name } = data;
  const { description, icon } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  weatherInfo.innerHTML = `
        <div><strong>Location:</strong> ${name}</div>
        <div><strong>Temperature:</strong> ${temp} °C</div>
        <div><strong>Weather:</strong> ${description} <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon"></div>
        <div><strong>Humidity:</strong> ${humidity}%</div>
        <div><strong>Wind Speed:</strong> ${speed} m/s</div>
    `;
}
