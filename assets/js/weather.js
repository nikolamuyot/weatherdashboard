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
      addToSearchHistory(city);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to display current weather conditions for the city
function displayWeather(data) {
  const cityName = data.city.name;
  const currentWeather = data.list[0]; // Current weather data

  const date = new Date(currentWeather.dt * 1000); // Convert timestamp to date
  const formattedDate = date.toLocaleDateString(); // Format date as string

  const iconCode = currentWeather.weather[0].icon; // Weather icon code
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Weather icon URL

  const temperature = currentWeather.main.temp; // Temperature
  const humidity = currentWeather.main.humidity; // Humidity
  const windSpeed = currentWeather.wind.speed; // Wind speed

  // Update HTML elements with weather information
  document.getElementById("city-name").innerText = cityName;
  document.getElementById("date").innerText = formattedDate;
  document.getElementById("weather-icon").src = iconUrl;
  document.getElementById("temperature").innerText = temperature;
  document.getElementById("humidity").innerText = humidity;
  document.getElementById("wind-speed").innerText = windSpeed;
}

// Function to add searched city to the search history
function addToSearchHistory(city) {
  // Implement logic to add city to search history
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
