import {DateTime} from "luxon";

const API_KEY = 'bde2fddb9d1baf4bcf15398e8a8d6454'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// FUNCTION TO CALL TO GET DATA
// infoType will pass what type of call, ONE CALL or WEATHER API
// - we will use this function to call different API,s
// - searchParams is an object which we will automatically convert into a QUERY...
// everything after  ? is a query

// FUNCTION to call/get weather data from API.
///////////////////////////////////////////////
const getWeatherData = (infoType, searchParams) => {

    const url = new URL(BASE_URL + '/' + infoType);
    // Here we use DESTRUCTURING with ...searchParams and add all searchparams
    // and next add our API KEY 
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url)
        .then((res) => res.json()) 
};
//- NOTE: This function reveives two parameters, infotype and searchParams from the getFormattedWeatherData
//  function. Infotype is either "weather" or "onecall" which is used by the API for different calls.
//  SearchParams 



const formatCurrentWeather = (data) => {
    // Destructuring data
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    //weather is an array with 1 object on api call, therefore we add [0] to select first object.
    const {main: details, icon} = weather[0]

    return {
		lat,
		lon,
		temp,
		feels_like,
		temp_min,
		temp_max,
		humidity,
		name,
		dt,
		country,
		sunrise,
		sunset,
		details,
		icon,
		speed,
	};

}

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    
    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly = hourly.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })

    return {timezone, daily, hourly};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        'weather', 
        searchParams
    ).then(formatCurrentWeather)

    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData(
        'onecall', 
        {lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units} 
    ).then(formatForecastWeather)
    
    // Using SpreadOperator (...), to copy both objects
    return {...formattedCurrentWeather, ...formattedForecastWeather}
}


// FUNCTION to format the received API local time to readable format.
/////////////////////////////////////////////////////////////////////
const formatToLocalTime = (
    secs, 
    zone, 
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
// NOTE: This function has 3 parameters: secs, zone and format. Format is declared by us as a string
//  which contains the format we want to show in the app by using LUXON format. Secs and Zone are
//  received from the FormatForecastWeather function title: ( formatToLocalTime(d.dt, timezone) ),
//  it is actually passed as d.dt and timezone but we change it names to secs and zone in this function.
//  Then, the function returns the fomatted time we want by using DateTime which is a LUXON data structure.     



// FUNCTION to get ICON from API
////////////////////////////////
const iconUrlFromCode = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
}
//  -NOTE: iconUrlFromCode function returns an icon URL by inserting the iconcode parameter which contains
// the actual code via template literal into a url string. This iconCode parameter is passed from the
// <img> src in TempDetails.jsx component where we call the iconUrlFromCode function. 



export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}

// My API KEY = bde2fddb9d1baf4bcf15398e8a8d6454

// API CALL REQUEST by city name = 
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// ONE CALL API call =
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}