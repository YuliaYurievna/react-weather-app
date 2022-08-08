import React, {useState} from 'react';
import FormattedDate from './FormattedDate';
import axios from 'axios';
import './Weather.css';

export default function Weather(props) {
	/* const [city, setCity] = useState(""); */
	const [weatherData, setWeatherData] = useState({ ready: false });

	function handleResponse(response) {
    setWeatherData({
			ready: true,
			date: 'Wednesday 07:00',
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
			date: new Date(response.data.dt * 1000),
      iconUrl: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`,
      description: response.data.weather[0].description
    });
  }


	if (weatherData.ready) {
		return (
			<div className='Weather rounded'>
				<form className="input-group mb-3 shadow search-form">
					<input
						type="search"
						className="form-control"
						placeholder="Enter a city"
						autoFocus="on"
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

				<div className="current-city">
					<div className="row ml-2">
						<div className="col-6">
							<h2 className="searched-city mb-0">{props.defaultCity}</h2>
							<p className="date-now mb-0"><FormattedDate date={weatherData.date} /></p>
							<p className="description text-capitalize">{weatherData.description}</p>
							<ul className="weather-details list-unstyled">
								<li className="weather-details-list">
									Humidity: {weatherData.humidity}%
								</li>
								<li className="weather-details-list">
									Wind: {Math.round(weatherData.wind)} km/h
								</li>
							</ul>
						</div>
						<div className="col-2 p-0 pt-4 forecast-icon-now">
							<img
								src={weatherData.iconUrl}
								alt={weatherData.description}
								className="forecast-icon-now"
							/>
						</div>
						<div className="col-3 text-center pl-0 pt-4">
							<div className="weather-temperature">
								<strong className="degrees">{Math.round(weatherData.temperature)}</strong>
								<span className="units">
									<a href="/">°C</a> |<a href="/">°F</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		let apiKey = "98f5a37ff9ffddbb3334ee960c2d442a";
		let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

		return 'Loaded ...'
	}
}