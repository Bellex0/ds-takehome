import React from 'react';

const Form = ({
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleSubmit,
}) => {

   // generate dates for the next seven days (to be used in the date dropdown menus)
   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const nextSevenDays = Array.from({ length: 7 }, (_, index) => {
     const today = new Date();
     const date = new Date(today);
     date.setDate(date.getDate() + index);
     const dayOfWeek = daysOfWeek[date.getDay()];
     const month = date.toLocaleString('en-US', { month: 'short' });
     const day = date.getDate();
     const year = date.getFullYear();
     return `${dayOfWeek} ${month} ${day}, ${year}`;
   });

    // build arrays for hours and AM/PM to be used in time dropdown menus
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const periods = ['AM', 'PM'];
    
   return (
        <form onSubmit={handleSubmit}>
        <h3>Enter location coordinates</h3>
        <div className='coordinates-container'>
            <div className='latitude'>
            <label htmlFor="latitude">
                Latitude:
                <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g., 36.1716"
                />
            </label>
            </div>
            <div className='longitude'>
            <label htmlFor="longitude">
                Longitude:
                <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g., -115.1391"
                />
            </label>
            </div>
        </div>
        <h3>Enter time frame</h3>
        <div className='start-container'>
            <label htmlFor="start-date">Start Date:</label>
            <select id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)}>
            <option value="" disabled>Select day</option>
            {nextSevenDays.map((date, index) => (
                <option key={index} value={date}>{date}</option>
            ))}
            </select>
        <label htmlFor="start-time-hour">Start Time:</label>
        <select id="start-time-hour" value={startTime.hour} onChange={(e) => setStartTime({ ...startTime, hour: e.target.value })}>
            <option value="" disabled>Select hour</option>
            {hours.map((hour, index) => (
            <option key={index} value={hour}>{hour}</option>
            ))}
        </select>
        <select id="start-time-period" value={startTime.period} onChange={(e) => setStartTime({ ...startTime, period: e.target.value })}>
            <option value="" disabled>Select AM/PM</option>
            {periods.map((period, index) => (
            <option key={index} value={period}>{period}</option>
            ))}
        </select>
        </div>
        <div className='end-container'>
        <label htmlFor="end-date">End Date:</label>
        <select id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)}>
        <option value="" disabled>Select day</option>
        {nextSevenDays.map((date, index) => (
            <option key={index} value={date}>{date}</option>
        ))}
        </select>
        <label htmlFor="end-time-hour">End Time:</label>
        <select id="end-time-hour" value={endTime.hour} onChange={(e) => setEndTime({ ...endTime, hour: e.target.value })}>
        <option value="" disabled>Select hour</option>
        {hours.map((hour, index) => (
            <option key={index} value={hour}>{hour}</option>
        ))}
        </select>
        <select id="end-time-period" value={endTime.period} onChange={(e) => setEndTime({ ...endTime, period: e.target.value })}>
        <option value="" disabled>Select AM/PM</option>
        {periods.map((period, index) => (
            <option key={index} value={period}>{period}</option>
        ))}
        </select>
        </div>
        <button type="submit" className='submit-button'>Submit</button>
        </form>
)}

export default Form;