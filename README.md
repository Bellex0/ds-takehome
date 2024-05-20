# Getting Started

React is used for this exercise. 

## Installation

 In the terminal, run `npm install`.
```bash
npm install
```

## Starting and running the app
```bash
npm start
```
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view app in your browser.

# Summary

### File structure
1) `App.js` --> Contains the weather form submission functionality and API requests
2) `Form.js` --> Contains the weather form component in which the user inputs their latitude/longitude coordinates, dates, and times. 
3) `WeatherForecast.js` --> Contains the weather forecast component where the forecast API data is rendered and displayed to the user.
4) `utils.js` --> Contains helper functions that format dates and times. 
5) `App.css` --> App styling is found here

### How to use app
1) Enter a location's latitude and longitude coordinates and the time frame you're looking for. For time frame, enter a start date/time and an end date/time.
2) Click "Submit" button to submit the form.
3) You should see the Weather Forecast information displayed. The info will show the hourly forecast based on the provided time frame.

### Error handling
1) If the request is not successful, the user will see an error message displayed on the screen briefly describing the issue. For example: "Error 404: Unable to provide data for requested point 36,115". Or if no data is found, user may see the message "Please check your inputs and try submitting again".
2) Form validations --> If the latitude/longitude coordinates and/or the dates/times are missing/empty, there will be an error message telling the user to fill out those fields. 

## Future Suggestions
1) Allow for other time frames in addition to hourly forecast. For example: allow the user to search for the general 24h forecast (day/night weather for the whole day). This would require making an API call to the "forecast" endpoint (https://api.weather.gov/gridpoints/OKX/36,34/forecast). 
   
     1) User can just search for a location without time/date inputs. By default, the app should show the daily weather for the next 7 days. 

2) A different UX/UI approach --> User would enter a location, then the forecast for the next 7 days is shown (without date/time inputs). If a user wishes to see the hourly forecast for a specific day, they could: 
      1. tap/click on a specific day. Then, the hourly forecast data is displayed for that day.

      2. User should also be able to search/scan for specific time periods. 
3) Add data visualizations such as charts/graphs to display weather data.
4) Add aesthetic elements such as weather icons that dynamically change based on the weather forecast. For example: if sunny, a sun icon would be displayed. If it's raining, a rain cloud would be displayed.

### Optimizations/UX improvements
1) Accessibility --> add aria-labels in the form for screen readers. Ensure app has responsive design for different devices.
2) Form validation --> more robust form validation. For example: stricter and clearer validation for latitude and longitude coordinate values.

   a) Possibly implement geolocation to ensure location's coordinates are accurate.
3) Reset the weather form after successful submission.
4) In the app code, separate the "loading" state into its own Loader component. Could also enhance the loading state by adding animation. 
5) Implement lazy loading, especially to account for large data sets, to improve load times while fetching data. 
6) Another approach would be caching already fetched data to avoid repeat API calls when the same data is requested multiple times.
6) Implement unit/integration testing using Jest or React Testing library.