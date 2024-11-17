let inputBox = document.querySelector(".location-field");
let search = document.querySelector(".fa-magnifying-glass");
let weatherImage = document.querySelector(".weather-img");
let temperature = document.querySelector(".temperature");
let weatherPara = document.querySelector(".weather-para");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let tempContainer = document.querySelector(".weather-info");
let humidityContainer = document.querySelector(".bottom-div");


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
            let tempVal = data.main.temp;
            let description = data.weather[0].description;
            let humidityVal = data.main.humidity;
            let windVal = data.wind.speed;

            // --------Show weather details-------
            tempContainer.style.display = "block";
            humidityContainer.style.display = "flex";

            //------ Arrange the cloud image as per weather
            if (cloud === "Clouds") {
                weatherImage.src = "images/cloud.png";
            } else if (cloud === "Clear") {
                weatherImage.src = "images/clear.png";
            } else if (cloud === "Rain") {
                weatherImage.src = "images/rain.png";
            } else if (cloud === "Snow") {
                weatherImage.src = "images/snow.png";
            } else if (cloud === "Mist") {
                weatherImage.src = "images/mist.png";
            } else if (cloud === "Haze") {
                weatherImage.src = "images/haze.png";
            }


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
        }
    };

    getWeather();
    inputBox.focus()
});
