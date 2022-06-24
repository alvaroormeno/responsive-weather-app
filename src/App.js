
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeLocation from './components/TimeLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';


import getFormattedWeatherData from './Services/weatherServices';

import {useState , useEffect} from "react"

function App() {

  // REACT USESTATE HOOKS
  // useState for initial query, what city shows up when loading app
  const [query, setQuery] = useState({q: 'lima'})
  // useState for initial unit, C° or F°
  const [units, setUnits] = useState('metric')
  //useState for weather, when we fetch weather we will store it in this state
  const [weather, setWeather] = useState(null)




  //// FUNCTION that starts the app once the page reloads
  useEffect(() => {

    const fetchWeather = async () => {
      await getFormattedWeatherData({
        // Using spreadOperator (...) to copy all query object
        ...query, 
        units
        }).then((data) => {setWeather(data);}
      );
    };
    //-NOTE: Once useEffect is triggered, it calls the async fetchWeather function which then calls 
    //  getFormattedWeatherData function with two parameters: query and units. Once getFormattedWeatherData
    //  delivers its "promise", then by using .then the response value which we call data is passed as a
    //  parameter to the setWeather function wich is a state for weather.   
    fetchWeather();
  
  }, [query, units])
  // NOTE: useEffect is a hook that carries a function inside and fires/activates every time the page
  //  renders/reloads. By adding [query, units] we instruct that we want useEffect to run everytime
  //  there is a change in state of query or units. Therefore, every time we change query or units by
  //  searching a new city/clicking on top links or clicking on C/F button to change units we want to 
  //  fetch new weather via the fetchWeather function inside useEffect



  // FUNCTION that changes the background color depending on weather
  const formatBackground = () => {
    if(!weather) {
      return 'from-cyan-700 to-blue-700'
    } else {
      const threshold = (units === 'metric' ? 20 : 60)
      if (weather.temp <= threshold) {
        return 'from-cyan-700 to-blue-700'
      } else {
        return 'from-yellow-700 to-orange-700'
      }
    }
  }
  

  return (
    <div className={`mx-auto max-w-screen-md mt-4  py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl rounded-lg`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {/* This INLINE CONDITIONAL OPERATOR instructs: If weather is TRUE and not NULL we want to 
      load everything below. */}
      {weather && (

        <div>
          {/* For these two components, we are passing a property/prop named weather by us,
              which carries the weather variable declared in useState that stores weather data  */}
          <TimeLocation weather={weather}/>
          <TempDetails weather={weather}/>

          <Forecast title="hourly forecast" items={weather.hourly}/>
          <Forecast title="daily forecast" items={weather.daily}/>
        </div>

      )}
    </div>
  );
}

export default App;
