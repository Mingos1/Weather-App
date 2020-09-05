const api_key = "90a2160e298f430b373827c5c8f9aaa2";

let place = () => {
    let citySearch = document.getElementById('city-search').value;
    console.log(citySearch);
    return citySearch;
}

const url = `https://api.openweathermap.org/data/2.5/weather?q=${place()}&appid=${api_key}`;

async function getData() {
    console.log('calling...')

    const response = await fetch(url);
    const obj = await response.json();
    
    if (response.status !== 200) console.log(`looks like there was a problem. Status Code: ${response.status}`)
    
    console.log(obj);


    let currentTime = () => {
        const newTime = new Date();

        let month = newTime.toLocaleString('default', { month: 'long' });
        let day = newTime.getDay();
        let hours = newTime.getHours();
        let minutes = newTime.getMinutes();
        let session = 'AM';

        if (hours == 0) hours = 12;
        if (hours > 12) { hours = hours - 12; session = "PM";}
        if (minutes < 10) minutes = '0' + minutes;
        if (day < 10) day = '0' + day;
        
        document.getElementById('current-month-day').textContent = (`${month} ${day} | ${hours}:${minutes} ${session} `);
        document.getElementById('current-time').textContent = (``);
    }

    let cityIdent = () => {
        let cityName = JSON.stringify(obj.name);
        let country = JSON.stringify(obj.sys.country);
        // const timezone = JSON.stringify(obj.timezone);
        country = country.replace(/['"]+/g, '');
        cityName = cityName.replace(/['"]+/g, '');

        document.getElementById('city-name').textContent = `${cityName}, ${country}`;
    }

    let currentWeather = () => {
        let weatherCond = JSON.stringify(obj.weather[0].main); // icon

        weatherCond = weatherCond.replace(/['"]+/g, '');
        
        document.getElementById('weather-condition').textContent = `${weatherCond}`;
    }

    let tempReading = () => {
        const currentTemp = JSON.stringify(obj.main.temp);
        const feelsLikeTemp = JSON.stringify(obj.main.feels_like);
        const minTemp = JSON.stringify(obj.main.temp_min);
        const maxTemp = JSON.stringify(obj.main.temp_max);
        const humidity = JSON.stringify(obj.main.humidity);

        let kelToFaren = function(temp) {
            return Math.ceil((temp - 273.15) * 9/5 + 32);
        }

        let kelToCel = function(temp) {
            return Math.ceil(temp - 273.15);
        }

        document.getElementById('temperature').textContent = `${kelToFaren(currentTemp)}°`;
        document.getElementById('feels-like-temp').textContent = `${kelToFaren(feelsLikeTemp)}°`;
        document.getElementById('min-temp').textContent = `L: ${kelToFaren(minTemp)}°`;
        document.getElementById('max-temp').textContent = `H: ${kelToFaren(maxTemp)}°`;
        document.getElementById('humidity').textContent = `${humidity} %`;
    }

    let sunTimes = () => {
        const sunrise = JSON.stringify(obj.sys.sunrise);
        const sunset = JSON.stringify(obj.sys.sunset);

        let unixConvert = (unixTimestamp) => {
            const dateObj = new Date(unixTimestamp * 1000); 

            let hours = dateObj.getHours();

            let minutes = dateObj.getMinutes();

            let session = 'AM';

            // Time formatting for JS
            if (hours == 0) hours = 12;
            if (hours > 12) hours = hours - 12; session = "PM";
            if (minutes < 10) minutes = '0' + minutes;

            return `${hours}:${minutes} ${session}`;
        }
        
        // Displaying odd minute numbers and only EST time
        document.getElementById('sunrise-time').textContent = `${unixConvert(sunrise)}`;
        document.getElementById('sunset-time').textContent = `${unixConvert(sunset)}`;
    }
    
    currentTime();
    cityIdent();
    currentWeather();
    tempReading();
    sunTimes();
}

const input = document.getElementById('city-search');

if (!input.value) {
    input.value = '';
} else {
    getData();
}






            // Get current time
            // User can enter a city and see temperature for it
            // Can see current weather, current temperature, feels
            // like, humidity, maximum temperature, minimum temperature
            // sunrise and sunset tim***
            // Has icons for current weather
            // background color changes for different times of day
            // can toggle the temperature unit (Celsius ot Farenheit)
            // Can view weather in their current location

            // Below Snippet modified from Google fetch Doc
            /*
            let promise = fetch(url)
                .then(
                    function (response) {
                        if (response.status !== 200) console.log(`looks like there was a problem. Status Code: ${response.status}`)
                        response.json()
                        .then(function (data) {
                            let root = document.getElementById('root');
                        
                        });
                    }
                )

                .catch(function (
                    err
                 ) {
                    console.log('Fetch Error :-S', err);
                });
            */