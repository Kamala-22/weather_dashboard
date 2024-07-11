



import React from 'react';

function ForecastWeather({ forecast, unit, getWeatherIcon }) {
  return (
    <div className="forecast-weather">
      <h2>Forecast Weather</h2>
      {forecast.map((day, index) => (
        <div key={index} className="weather-details">
          <img src={getWeatherIcon(day.day.condition.text)} alt="Weather Icon" />
          <div>
            <strong>{unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}</strong>
          </div>
          <div>
            <p>{day.date}</p>
            <p>{day.day.condition.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForecastWeather;
