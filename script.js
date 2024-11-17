let inputBox = document.querySelector(".location-field");
let search = document.querySelector(".fa-magnifying-glass");
let weatherImage = document.querySelector(".weather-img");
let temperature = document.querySelector(".temperature");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
const apiKey = "84210a5d9d02fa72e8739474b49ca8f1";

search.addEventListener('click',() => {
    let city = inputBox.value;

    const getWeather = async () =>{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        console.log(response)
        let data = await response.json()
        console.log(data)
    }
    getWeather()
})