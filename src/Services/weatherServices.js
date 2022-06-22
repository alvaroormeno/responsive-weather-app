const API_KEY = 'bde2fddb9d1baf4bcf15398e8a8d6454'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// FUNCTION TO CALL TO GET DATA
// infoType will pass what type of call, ONE CALL or WEATHER API
// - we will use this function to call different API,s
// - searchParams is an object which we will automatically convert into a QUERY...
// everything after  ? is a query
const getWeatherData = (infoType, searchParams) => {

    const url = new URL(BASE_URL + '/' + infoType);
    // Here we use DESTRUCTURING with ...searchParams and add all searchparams
    // and next add our API KEY 
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url)
        .then((res) => res.json()) 
}



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

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)

    

    return formattedCurrentWeather
}

export default getFormattedWeatherData

// My API KEY = bde2fddb9d1baf4bcf15398e8a8d6454

// API CALL REQUEST by city name = 
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// ONE CALL API call =
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}