function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '0ab8aabdb122c11edf83a36285f8e331';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather:', error.message);
            document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
        });
}

function setBackground(weatherDescription) {
    const body = document.body;
    let imagePath = '';

    if (weatherDescription.includes('clear sky') || weatherDescription.includes('clear')) {
        imagePath = 'clear.jpeg'; // Path to your clear image
    } else if (weatherDescription.includes('few clouds')) {
        imagePath = 'few-clouds.jpeg'; // Path to your few clouds image
    } else if (weatherDescription.includes('overcast clouds')) {
        imagePath = 'overcast-clouds.jpeg'; // Path to your overcast clouds image
    } else if (weatherDescription.includes('drizzle')) {
        imagePath = 'drizzle.jpeg'; // Path to your drizzle image
    } else if (weatherDescription.includes('rain') || weatherDescription.includes('shower rain')) {
        imagePath = 'rain.jpeg'; // Path to your rain image
    } else if (weatherDescription.includes('thunderstorm')) {
        imagePath = 'thunderstorm.jpeg'; // Path to your thunderstorm image
    } else if (weatherDescription.includes('snow')) {
        imagePath = 'snow.jpeg'; // Path to your snow image
    } else if (weatherDescription.includes('mist')) {
        imagePath = 'mist.jpeg'; // Path to your mist image
    } else if (weatherDescription.includes('haze')) {
        imagePath = 'haze.jpeg'; // Path to your haze image
    } else if (weatherDescription.includes('broken clouds')) {
        imagePath = 'broken-clouds.jpeg'; // Path to your broken clouds image
    } else if (weatherDescription.includes('scattered clouds')) {
        imagePath = 'scattered-clouds.jpeg'; // Path to your scattered clouds image
    }
    else if (weatherDescription.includes('smoke')) {
        imagePath = 'smoke.jpeg'; // Path to your scattered clouds image
    } 

    body.style.backgroundImage = `url('${imagePath}')`;
}



function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherDescription = data.weather[0].description.toLowerCase();
    setBackground(weatherDescription);

    weatherInfo.innerHTML = `
        <div>
            <h2>Temperature</h2>
            <p>${data.main.temp}°C</p>
        </div>
        <div>
            <h2>Description</h2>
            <p>${data.weather[0].description}</p>
        </div>
        <div>
            <h2>Humidity</h2>
            <p>${data.main.humidity}%</p>
        </div>
        <div>
            <h2>Wind Speed</h2>
            <p>${data.wind.speed} m/s</p>
        </div>
        <div>
            <h2>Pressure</h2>
            <p>${data.main.pressure} hPa</p>
        </div>
        <div>
            <h2>Visibility</h2>
            <p>${data.visibility} meters</p>
        </div>
        <div>
            <h2>Sunrise</h2>
            <p>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        </div>
        <div>
            <h2>Sunset</h2>
            <p>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
        <div>
            <h2>Cloudiness</h2>
            <p>${data.clouds.all}%</p>
        </div>
    `;
}
