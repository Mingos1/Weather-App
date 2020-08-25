let api_key = "90a2160e298f430b373827c5c8f9aaa2";
let place = 'london';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`;

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

async function getAPI() {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status !== 200) console.log(`looks like there was a problem. Status Code: ${response.status}`);
    console.log(data);
    document.getElementById('root').textContent = JSON.stringify(data);
}

getAPI();


// Get current time
// User can enter a city and see temperature for it
// Can see current weather, current temperature, feels
// like, humidity, maximum temperature, minimum temperature
// sunrise and sunset times
// Has icons for current weather
// background color changes for different times of day
// can toggle the temperature unit (Celsius ot Ferenheit)
// Can view weather in their current location