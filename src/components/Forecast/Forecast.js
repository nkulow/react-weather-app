import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {
    let [city, setCity] = useState(''); //set city
    let [unit, setUnit] = useState('imperial'); //set unit (Fahrenheit or Celcius)
    let [error, setError] = useState(false); //set an error if user does not type in the form
    let [loading, setLoading] = useState(false); //set an error if the user does not enter a valid city
    let [icon, setIcon] = useState('');


    const uriEncodedCity = encodeURIComponent(city); //encode city-input to URI
    let [responseObj, setResponseObj] = useState({}); //set response object variable 

   function getForecast(e) {
       e.preventDefault(); //prevent losing current state and information

       if (city.length === 0) {
           return setError(true);
       }

       //clear state in preperation for new data
       setError(false);
       setResponseObj({});

       setIcon()
       setLoading(true);

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": process.env.REACT_APP_API_KEY, //process.env.REACT_APP_API_KEY
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
    .then(response => response.json())
       .then(response => {
            if (response.cod !== 200){
                throw new Error()
            }

           setResponseObj(response)
           setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
   }
   
   return (
    
    <div>
        <h2>Find Current Weather Conditions</h2>
        
        <form onSubmit={getForecast}>
            <input 
                type="text"
                placeholder="Enter City"
                maxLength="50"
                className={classes.textInput}
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <label className={classes.Radio}>
                <input 
                    type="radio"
                    name="units"
                    checked={unit === "imperial"}
                    value="imperial"
                    onChange={(e) => setUnit(e.target.value)}
                />
                Fahrenheit
            </label>
            <label className={classes.Radio}>
                <input 
                    type="radio"
                    name="units"
                    checked={unit === "metric"}
                    value="metric"
                    onChange={(e) => setUnit(e.target.value)}
                />
                Celcius
            </label>
            <button type="submit" className={classes.Button}>Get Forecast</button>
        </form>

        <Conditions
            responseObj={responseObj}
            error={error}
            loading={loading}
            
        />
    </div>

   )
}
export default Forecast;