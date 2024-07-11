// import React from 'react';

// function HistoricalWeather({ historical, unit, getWeatherIcon }) {
//   return (
//     <div className="historical-weather">
//       <h2>Historical Weather</h2>
//       {historical.map((day, index) => (
//         <div key={index} className="weather-details">
//           <img src={getWeatherIcon(day.day.condition.text)} alt="Weather Icon" />
//           <div>
//             <strong>{unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}</strong>
//           </div>
//           <div>
//             <p>{day.date}</p>
//             <p>{day.day.condition.text}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default HistoricalWeather;


import React from 'react';

function HistoricalWeather({ historical, unit, getWeatherIcon }) {
  const containerStyle = {
    margin: '20px 0',
    // display: 'flex',
    flexdirection: 'row',
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '10px',
  };

  const weatherDetailsStyle = {
    display: 'flex',
    flexdirection: 'column',
    
    alignItems: 'center',
    justifyContent: 'center',
    // margin: '10px 0',
  };

  const imgStyle = {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  };

  const detailsDivStyle = {
    marginLeft: '10px',
  };

  const tempStyle = {
    fontSize: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Historical Weather</h2>
      {historical.map((day, index) => (
        <div key={index} style={weatherDetailsStyle}>
          <img src={getWeatherIcon(day.day.condition.text)} alt="Weather Icon" style={imgStyle} />
          <div style={detailsDivStyle}>
            <strong style={tempStyle}>{unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}</strong>
          </div>
          <div style={detailsDivStyle}>
            <p>{day.date}</p>
            <p>{day.day.condition.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoricalWeather;
