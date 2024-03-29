// Static .js file that generates events
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
const tableWeather = document.getElementById("tableWeather");


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTodayData(city, APIKEY){
    try{    
    document.getElementById("titleWrap").className = "navbar-brand mr-0 mr-md-2 animated flash infinite delay-0.5s"                   
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`, {
        mode: 'cors', 
      });
    if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
    const fetchedData = await response.json();
    validPlace.style.display = 'none';
    tableWeather.style.display = 'table';
    description.style.display = "block";
    displayToday(fetchedData);
    await sleep(900); //create at least some delay so my animation can have enough time to run for 1 cycle     
    }
    catch (error){
        console.log(error);
        // handle error. Tell user to reinput:
        validPlace.style.display = 'block';
        tableWeather.style.display = 'none';
        description.style.display = "none";
    }
    finally{
      document.getElementById("titleWrap").className = "navbar-brand mr-0 mr-md-2"
    }
}

async function displayToday(apiData){
    city.textContent = apiData.name + ', ' + apiData.sys.country; 
    //rounded to integer
    temp.textContent = `${Math.round(apiData.main.temp)} °C`;
    tempMin.textContent = `${Math.round(apiData.main.temp_min)} °C`;
    tempMax.textContent = `${Math.round(apiData.main.temp_max)} °C`;
    wind.textContent = `${apiData.wind.speed} m/s`;
    sunrise.textContent = `${new Date((apiData.sys.sunrise + apiData.timezone) * 1000).toLocaleTimeString().slice(-10, -6)} AM`;
    sunset.textContent = `${new Date((apiData.sys.sunset + apiData.timezone) * 1000).toLocaleTimeString().slice(-10, -6)} PM`;
    description.src = `http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`;
    weather_description.textContent = apiData.weather[0].main; 

    mainContent.style.display = 'block';
}

doneBtn.addEventListener('click', async () => {
    event.preventDefault(); // Crucial to prevent redirection, which causes fetch to throw TypeError: failed to fetch
    const get_APIKEY_url = "main/weather/";
    const response = await fetch(get_APIKEY_url);
    const json = await response.json();
    getTodayData(cityValue.value, json.APIKEY);
});
