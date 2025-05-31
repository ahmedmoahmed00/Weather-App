
let api = `https://geocoding-api.open-meteo.com/v1/search?name=Cairo&count=1&language=en&format=json`;

function getWeather()
{
    const cityName = document.getElementById("cityInput").value;

    if (cityName) 
    {
        api = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
    }

    fetch(api)
    .then((respons) => respons.json())
    .then((data) => 
    {
        const cityWeather = document.querySelector(".cityWeather");
        

        
        if (data.results && data.results.length > 0 && data.results[0].name.toLowerCase() === cityName.toLowerCase()) 
        {
            document.getElementById("notification").classList.add("hidden");


            cityWeather.innerHTML = `Weather in <strong>${data.results[0].country}</strong>`;


            getDataWeather(data.results[0].latitude,data.results[0].longitude)
        } 
        else 
        {
            document.getElementById("notification").classList.remove("hidden");

            setTimeout(() => 
            {
            document.getElementById("notification").classList.add("hidden");
            }, 2500)
        }
    }).catch(error => 
    {
        console.error(error);
    })
}


function getDataWeather(latitude,longitude) 
{
    const apiDataWeather =  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    fetch(apiDataWeather)
    .then((respons) => respons.json())
    .then((data) => 
    {
        const temperature = document.querySelector(".temperature"); 
        const windSpeed = document.querySelector(".windSpeed"); 
        const windDirection = document.querySelector(".windDirection"); 
        const Condition = document.querySelector(".Condition"); 
        const time = document.querySelector(".time"); 

        temperature.innerHTML = `${data.current_weather.temperature}<span>°C</span>`;
        windSpeed.innerHTML = `Wind Speed: ${data.current_weather.windspeed} km/h`;
        time.innerHTML = `Time: ${data.current_weather.time}`;

        const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
        const index = Math.round(data.current_weather.winddirection / 45) % 8;
        
        windDirection.innerHTML = `Wind Direction: ${directions[index]}`;


        Condition.innerHTML =`Condition: ${getWeatherCondition(data.current_weather.weathercode)} `;

    }).catch(error => 
    {
        console.error(error);
    })
}


function getWeatherCondition(code) {

    if (code === 0) return "Clear Sky";
    if (code === 1 || code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";
    if (code === 45 || code === 48) return "Fog";
    if (code >= 51 && code <= 67) return "Drizzle";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Unknown";
}

function DarkModeLightMode() 
{
    const darkmode = document.querySelector("#toggleMode")

    document.body.classList.toggle("night");

    darkmode.innerHTML = document.body.classList.contains("night") ?  "☀️" : "🌙";

}