// Function to fetch weather data from OpenWeatherMap API
function fetchWeather(city) {
  const apiKey = "3d5ea1a77c82a4e2012f71d227541912";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Parse data and update HTML elements with weather information
      console.log(data);
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to display current weather conditions and 5-day forecast for the city
function displayWeather(data) {
  // Display current weather conditions
  const cityName = data.city.name;
  const currentWeather = data.list[0]; // Current weather data

  const currentDate = new Date(currentWeather.dt * 1000); // Convert timestamp to date
  const formattedDate = currentDate.toLocaleDateString(); // Format date as string

  const iconCode = currentWeather.weather[0].icon; // Weather icon code
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Weather icon URL

  const temperature = currentWeather.main.temp; // Temperature
  const humidity = currentWeather.main.humidity; // Humidity
  const windSpeed = currentWeather.wind.speed; // Wind speed

  // Update HTML elements with current weather information
  document.getElementById("city-name").innerText = cityName;
  document.getElementById("current-date").innerText = formattedDate;
  document.getElementById("current-weather-icon").src = iconUrl;
  document.getElementById("current-temperature").innerText = temperature;
  document.getElementById("current-humidity").innerText = humidity;
  document.getElementById("current-wind-speed").innerText = windSpeed;

  // Display 5-day forecast
  const forecastList = data.list; // Array of weather data for upcoming days

  // Loop through the forecast list (skipping the current day)
  for (let i = 1; i < forecastList.length; i++) {
    const forecast = forecastList[i];
    const date = new Date(forecast.dt * 1000); // Convert timestamp to date
    const formattedForecastDate = date.toLocaleDateString(); // Format date as string

    const forecastIconCode = forecast.weather[0].icon; // Weather icon code
    const forecastIconUrl = `https://openweathermap.org/img/wn/${forecastIconCode}.png`; // Weather icon URL

    const forecastTemperature = forecast.main.temp; // Temperature
    const forecastHumidity = forecast.main.humidity; // Humidity
    const forecastWindSpeed = forecast.wind.speed; // Wind speed

    // Create HTML element for forecast item
    const forecastElement = document.createElement("div");
    forecastElement.classList.add("forecast-item");
    forecastElement.innerHTML = `
        <p>Date: ${formattedForecastDate}</p>
        <p><img src="${forecastIconUrl}" alt="Weather Icon"></p>
        <p>Temperature: ${forecastTemperature}</p>
        <p>Humidity: ${forecastHumidity}</p>
        <p>Wind Speed: ${forecastWindSpeed}</p>
    `;

    // Append forecast item to the container
    document.getElementById("future-weather").appendChild(forecastElement);
  }
}

// Event listener for form submission
document
  .getElementById("city-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const cityInput = document.getElementById("city-input").value;

    // Call function to fetch weather data for the entered city
    fetchWeather(cityInput);
  });
