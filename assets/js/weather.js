// Function to fetch weather data from OpenWeatherMap API
function fetchWeather(city) {
  const apiKey = "3d5ea1a77c82a4e2012f71d227541912"; // Replace with your actual API key
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

// Function to display weather conditions for the city
function displayWeather(data) {
  // Implement logic to display current and future weather conditions
  // Example: document.getElementById('current-weather').innerText = JSON.stringify(data);
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
