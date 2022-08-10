import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import axios from 'axios';
import './Weather.css';


export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      city: response.data.name
    });
  }

  function search() {
    let apiKey = "98f5a37ff9ffddbb3334ee960c2d442a";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className='Weather rounded'>
        <form className="input-group mb-3 shadow search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-control"
            placeholder="Enter a city"
            autoFocus="on"
            onChange={handleCityChange}
          />
          <button
            className="btn btn-outline-dark ml-1 change-city-button"
            type="submit"
          >
            Search
          </button>
          <button
            className="btn btn-outline-dark ml-1 button-current-city"
            type="button"
          >
            <i className="fa-solid fa-location-dot"></i>
          </button>
        </form>
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    search();
    return 'Loaded ...'
  }
}