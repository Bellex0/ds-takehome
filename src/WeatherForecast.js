import React from 'react';
import { deleteTimeZoneFromForecastTime, formatDateTime } from './utils';

const WeatherForecast = ({ filteredWeatherData, latitude, longitude }) => (
  <div>
      {filteredWeatherData ? (
          filteredWeatherData.length > 0 ? (
            <h2>🌤️ Weather Forecast for {latitude}, {longitude}</h2>
          ) : (
            <p className='error'>Please check your inputs and try submitting again.</p>
          )
        ) : null}
          <div className='main-container'>
          {filteredWeatherData?.map((period, index) => (
            <div key={index} className='weather-container'>
              <h3>{formatDateTime(deleteTimeZoneFromForecastTime(period.startTime))}</h3>
              <p><b>{period.temperature} &deg;{period.temperatureUnit}</b></p>
              <p>{period.shortForecast}</p>
              <p>Precipitation: {period.probabilityOfPrecipitation.value}%</p>
            </div>
          ))}
          </div>
  </div>
);

export default WeatherForecast;
