// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInfo from './WeatherInfo';
import HistoricalWeather from './HistoricalWeather';
import ForecastWeather from './ForecastWeather';

const API_KEY = 'edbb32933912451599c150403240807';
const defaultIcon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2tODZaOmYQ7jPArUXx_26CkDKzxdDWqdzA&s';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [currentDate, setCurrentDate] = useState('');
  const [forecast, setForecast] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [showForecast, setShowForecast] = useState(true); // true for forecast, false for historical

  useEffect(() => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const formattedDate = `${dayName}, ${date.getDate()}, ${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const fetchWeatherData = () => {
    if (!city.trim()) {
      setError(new Error('Please enter a valid city name.'));
      return;
    }

    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`),
      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`),
      ...getPreviousDates(3).map(date =>
        axios.get(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`)
      )
    ])
      .then(responses => {
        setWeather(responses[0].data);
        setForecast(responses[1].data.forecast.forecastday);
        setHistorical(responses.slice(2).map(response => response.data.forecast.forecastday[0]));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error);
        setError(error);
        setLoading(false);
      });
  };

  const getPreviousDates = days => {
    const dates = [];
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    return dates;
  };

  const toggleUnit = () => setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));

  const toggleShowForecast = () => setShowForecast(prev => !prev);

  const getWeatherIcon = condition => {
    switch (condition.toLowerCase()) {
      case 'partly cloudy':
        return defaultIcon; // Replace with actual icon URL
      case 'light rain':
        return defaultIcon; // Replace with actual icon URL
      default:
        return defaultIcon;
    }
  };

  return (
    <div className="App">
      <div className="date-display">{currentDate}</div>

      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button className="search-button" onClick={fetchWeatherData}>
          Search
        </button>
        <div className="toggle-unit">
          <div className={`toggle ${unit === 'F' ? 'active' : ''}`} onClick={toggleUnit}>
            <div className="toggle-ball"></div>
            <span>{unit === 'C' ? 'Celsius' : 'Fahrenheit'}</span>
          </div>
        </div>
        <div className="toggle-forecast">
          <div className={`toggle ${showForecast ? 'active' : ''}`} onClick={toggleShowForecast}>
            <div className="toggle-ball"></div>
            <span>{showForecast ? 'Forecast' : 'Historical'}</span>
          </div>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className='side'>

        {weather && <WeatherInfo weather={weather} unit={unit} getWeatherIcon={getWeatherIcon} />}
        <div className='sidepart'>
          {!showForecast && historical.length > 0 && (
            <HistoricalWeather historical={historical} unit={unit} getWeatherIcon={getWeatherIcon} />
          )}

          {showForecast && forecast.length > 0 && (
            <ForecastWeather forecast={forecast} unit={unit} getWeatherIcon={getWeatherIcon} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

