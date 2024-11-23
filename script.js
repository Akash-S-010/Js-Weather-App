let inputBox = document.querySelector(".location-field");
let search = document.querySelector(".fa-magnifying-glass");
let weatherImage = document.querySelector(".weather-img");
let temperature = document.querySelector(".temperature");
let weatherPara = document.querySelector(".weather-para");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let tempContainer = document.querySelector(".weather-info");
let humidityContainer = document.querySelector(".bottom-div");
let video = document.querySelector("video source");

const apiKey = "84210a5d9d02fa72e8739474b49ca8f1";

search.addEventListener("click", () => {
    let city = inputBox.value;

    const getWeather = async () => {
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

            if (!response.ok) {
                // ----If response is not OK, throw  error
                throw new Error("Location not found");
            }

            let data = await response.json();
            console.log(data);

            let cloud = data.weather[0].main;
            console.log(cloud)
            let tempVal = data.main.temp;
            let description = data.weather[0].description;
            let humidityVal = data.main.humidity;
            let windVal = data.wind.speed;

            // --------Show weather details-------
            tempContainer.style.display = "block";
            humidityContainer.style.display = "flex";

            weatherPara.innerHTML = description;
            if (tempVal < 0) {
                video.src = "https://videos.pexels.com/video-files/4419948/4419948-hd_1920_1080_24fps.mp4";
                weatherImage.src = "images/snow.png";
            }
            else if (cloud === "Clouds") {
                video.src = "https://videos.pexels.com/video-files/29496981/12697320_2560_1440_30fps.mp4";
                weatherImage.src = "images/cloud.png";
            } else if (cloud === "Clear") {
                video.src = "https://videos.pexels.com/video-files/29357417/12651084_640_360_30fps.mp4";
                weatherImage.src = "images/clear.png";
            } else if (cloud === "Rain") {
                video.src = "https://videos.pexels.com/video-files/1841455/1841455-hd_1280_720_25fps.mp4";
                weatherImage.src = "images/rain.png";
            } else if (cloud === "Snow") {
                video.src = "https://videos.pexels.com/video-files/4419948/4419948-hd_1920_1080_24fps.mp4";
                weatherImage.src = "images/snow.png";
            } else if (cloud === "Mist") {
                video.src = "https://videos.pexels.com/video-files/3615892/3615892-uhd_2560_1440_25fps.mp4";
                weatherImage.src = "images/mist.png";
            } else if (cloud === "Haze") {
                video.src = "https://videos.pexels.com/video-files/854752/854752-hd_1920_1080_30fps.mp4";
                weatherImage.src = "images/haze.png";
            } else {
                // Default case for any other weather
                video.src = "https://videos.pexels.com/video-files/854002/854002-hd_1920_1080_24fps.mp4";
                weatherImage.src = "images/default.png";
            }

            video.parentElement.load();

            // --fetched data shown in app-------
            temperature.innerHTML = `${tempVal}<span>°C</span>`;
            weatherPara.innerHTML = description;
            humidity.innerHTML = `${humidityVal} %`;
            wind.innerHTML = `${windVal} Km/h`;

        } catch (error) {
            console.error(error);

            tempContainer.style.display = "block";
            humidityContainer.style.display = "none";

            weatherImage.src = "images/404.png";
            weatherPara.innerHTML = "Oops! Invalid Location";
            temperature.innerHTML = "";

        }
    };

    getWeather();
    inputBox.focus()
});

inputBox.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        search.click(); 
    }
});
