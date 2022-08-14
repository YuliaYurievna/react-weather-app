import React, { useState, useEffect } from 'react';
import './WeatherForecast.css';
import axios from 'axios';
import WeatherForecastDay from './WeatherForecastDay';

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.list);
    setLoaded(true);
  }

  if (loaded) {
  return (
    <div className='WeatherForecast'>
      <div className='row ms-1 me-1'>
        {forecast.map((dailyForecast, index) => {
          if ((index+1)%8===0) {
            return (
              <div className='col card pt-2 pb-2 WeatherForecast-elements' key={index}>
                <WeatherForecastDay data={dailyForecast} />
              </div>
            );
          }
        })}
        
      </div>
    </div>
  );

  } else {
      let apiKey = "98f5a37ff9ffddbb3334ee960c2d442a";
      let longitude = props.coordinates.lon;
      let latitude = props.coordinates.lat;
      let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleResponse);

      return null;
    }  
}
