import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import WeatherForecast from './WeatherForecast';
import { formatDate, convertTimeTo24HourFormat, deleteTimeZoneFromForecastTime } from './utils';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState({ hour: '', period: '' });
  const [endTime, setEndTime] = useState({ hour: '', period: '' });
  const [filteredWeatherData, setFilteredWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

   // HANDLE API CALLS
  const fetchWeatherData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${errorData.status}: ${errorData.detail}` || `Error: ${response.status}`);
    }
    return response.json();
  };

   // handleSubmit logic to retrieve weather data, filter data based on date/time, display info
  const fetchAndFilterHourlyWeatherData = async () => {
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);

     // if latitude or longitude is not entered, show error
     if (!latitude || !longitude) {
      setError('Please enter latitude and longitude');
      setIsLoading(false); 
      return;
    }

    // if dates or times are not selected, show error
    if (!startDate || !endDate || !startTime.hour || !startTime.period || !endTime.hour || !endTime.period) {
      setError('Please select date and/or time');
      setIsLoading(false);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // 1ST API CALL TO GET HOURLY FORECAST ENDPOINT
      const data = await fetchWeatherData(`https://api.weather.gov/points/${lat},${long}`);
      // 2ND API CALL TO GET HOURLY FORECAST
      const forecastData = await fetchWeatherData(data.properties.forecastHourly);

      // convert user input dates and times to match API data's startTime, endTime values ex. 2024-05-30T17:00:00
      const startDateTime = `${formatDate(startDate)}T${convertTimeTo24HourFormat(startTime)}`;
      const endDateTime = `${formatDate(endDate)}T${convertTimeTo24HourFormat(endTime)}`;

      // filter data based on start date/time and end date/time
      const filteredPeriods = forecastData.properties.periods.filter(period => {
        const periodStartTime = deleteTimeZoneFromForecastTime(period.startTime);
        return (periodStartTime >= startDateTime && periodStartTime <= endDateTime);
      });

      setFilteredWeatherData(filteredPeriods);
      setIsLoading(false);

    } catch (error) {
      setError(error.message);
      setFilteredWeatherData(null);
      setIsLoading(false);
    }
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchAndFilterHourlyWeatherData();
  };

  return (
    <div className="App">
      <h1>How's the weather? 🌡️</h1>
      <Form  
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        handleSubmit={handleSubmit}
      />
      {error && <p className='error'>{error}</p>}
      {isLoading ? <h4><span className='loading-sun'>☀️</span> Loading...</h4> : 
      <WeatherForecast filteredWeatherData={filteredWeatherData} latitude={latitude} longitude={longitude}/>
      }
    </div>
  );
}

export default App;

 