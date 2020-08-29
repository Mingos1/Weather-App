const api_key = "90a2160e298f430b373827c5c8f9aaa2";
let place = 'san diego';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`;

async function getData() {
    console.log('calling...')

    const response = await fetch(url);
    const obj = await response.json();
    
    if (response.status !== 200) console.log(`looks like there was a problem. Status Code: ${response.status}`)
    
    console.log(obj);

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

        document.getElementById('temperature').textContent = JSON.stringify(`Current Temperature: ${kelToFaren(currentTemp)} F`);
        document.getElementById('feels-like-temp').textContent = JSON.stringify(`Feels Like: ${kelToFaren(feelsLikeTemp)} F`);
        document.getElementById('min-temp').textContent = `Minimum Temperature: ${kelToFaren(minTemp)} F`;
        document.getElementById('max-temp').textContent = `Maximum Temperature: ${kelToFaren(maxTemp)} F`;
    }

    let sunTimes = () => {
        const sunrise = JSON.stringify(obj.sys.sunrise);
        const sunset = JSON.stringify(obj.sys.sunset);

        let unixConvert = (unixTimestamp) => {
            return new Date(unixTimestamp * 1000); 
        }

        document.getElementById('sunrise-time').textContent = `Sunrise: ${unixConvert(sunrise)}`;
        document.getElementById('sunset-time').textContent = `Sunset: ${unixConvert(sunset)}`;
    }

    tempReading();
    sunTimes();
}

getData();






            // Get current time
            // User can enter a city and see temperature for it
            // Can see current weather, current temperature, feels
            // like, humidity, maximum temperature, minimum temperature
            // sunrise and sunset times
            // Has icons for current weather
            // background color changes for different times of day
            // can toggle the temperature unit (Celsius ot Ferenheit)
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