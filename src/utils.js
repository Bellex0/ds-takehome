// HELPER FUNCTIONS FOR FORMATTING DATE AND TIME

// format date to YYYY-MM-DD
export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
};

// convert time to 00:00:00, takes in startTime, endTime as timeObj
export const convertTimeTo24HourFormat = (timeObj) => {
    let { hour, period } = timeObj;
    hour = parseInt(hour);
  
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:00:00`;
};

// delete the timezone after the last dash ex. 2024-05-19T17:00:00-05:00
export const deleteTimeZoneFromForecastTime = (dateTime) => {
    const lastIndex = dateTime.lastIndexOf('-');
    return dateTime.substring(0, lastIndex);
}

// format date/time ex. 2024-05-30T17:00:00 to weekday, month, day, yr, time in 12hr format
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
   const newDate =  new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);

    return newDate
}