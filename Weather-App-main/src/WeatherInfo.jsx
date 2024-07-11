
import React from 'react';

function WeatherInfo({ weather, unit, getWeatherIcon }) {
  const temperature = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;

  return (
    <div className="weather-info">
      <h2>Current Weather</h2>
      <div className="weather-details">
        <img src={getWeatherIcon(weather.current.condition.text)} alt="Weather Icon" />
        <div>
          <strong>{temperature}</strong>
        </div>
        <div>
          <p>{weather.location.name}</p>
          <p>{weather.current.condition.text}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
