

document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;

  // Make sure the city input is not empty
  if (city.trim() !== "") {
    // Fetch weather data from WeatherAPI
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${a}${b}${c}${d}${e}${f}&q=${city}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) => {
        displayWeather(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
        document.getElementById("weatherInfo").innerHTML =
          "City not found. Please try again.";
      });
  } else {
    document.getElementById("weatherInfo").innerHTML =
      "Please enter a city name.";
  }
});

function displayWeather(data) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = "";

  const cityName = document.createElement("h2");
  cityName.textContent = data.location.name + ", " + data.location.country;

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data.current.temp_c}°C`;

  const icon = document.createElement("img");
  icon.src = data.current.condition.icon;

  const currentTime = document.createElement("h4");
  let dats = data.location.localtime;
  // slices off the date returning on the current time
  let result = dats.slice(10);

  // Function to convert 24-hour format time to 12-hour format
  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    let period = "AM";

    let hour = parseInt(hours, 10);
    if (hour >= 12) {
      period = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }
    if (hour === 0) {
      hour = 12; // 12 AM
    }

    return `${hour}:${minutes} ${period}`;
  }

  const time12Hour = convertTo12HourFormat(result);
  console.log(time12Hour); // Output: cuurentTime
  currentTime.textContent = `Current time ${time12Hour}`;

  const condition = document.createElement("p");
  condition.textContent = `Weather: ${data.current.condition.text}`;

  weatherInfoDiv.appendChild(cityName);
  weatherInfoDiv.appendChild(temperature);
  weatherInfoDiv.appendChild(icon);
  weatherInfoDiv.appendChild(currentTime);
  weatherInfoDiv.appendChild(condition);
}
