// Static .js file that generates events
const APIKEY = "f90eaaa700aab37e36330ca9e0e64b07";
const doneBtn = document.querySelector('#doneButton');
const cityValue = document.getElementById('searchinputCity');
const form = document.getElementById('form');
const city = document.getElementById('city');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const weather_description = document.getElementById('weather-description');
const tempMin = document.getElementById('temp-min');
const tempMax = document.getElementById('temp-max');
const wind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const mainContent = document.getElementById('content');
const validPlace = document.getElementById('alert1');

async function getTodayData(city){
    try{                        
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`, {
        mode: 'cors', 
      });
    if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
    const fetchedData = await response.json();
    validPlace.style.display = 'none';
    displayToday(fetchedData);
    }
    catch (error){
        console.log(error);
        // handle error. Tell user to reinput:
        validPlace.style.display = 'inline-block';
    }
}

async function displayToday(apiData){
    city.textContent = apiData.name + ', ' + apiData.sys.country; 
    //rounded to integer
    temp.textContent = `${Math.round(apiData.main.temp)} °C`;
    tempMin.textContent = `min: ${Math.round(apiData.main.temp_min)} °C`;
    tempMax.textContent = `max: ${Math.round(apiData.main.temp_max)} °C`;
    wind.textContent = `wind: ${apiData.wind.speed} m/s`;
    sunrise.textContent = `Sunrise: ${new Date((apiData.sys.sunrise + apiData.timezone) * 1000).toLocaleTimeString().slice(-10, -6)} AM`;
    sunset.textContent = `Sunset: ${new Date((apiData.sys.sunset + apiData.timezone) * 1000).toLocaleTimeString().slice(-10, -6)} PM`;
    description.src = `http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`;
    weather_description.textContent = apiData.weather[0].main; 

    mainContent.style.display = 'block';
}

doneBtn.addEventListener('click', () => {
    event.preventDefault(); // Crucial to prevent redirection, which causes fetch to throw TypeError: failed to fetch
    getTodayData(cityValue.value);
});

/* 
var btn2 = document.querySelector('#rand').addEventListener('click', () => {
  alert("Hello World");
}); */