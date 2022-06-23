
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
  const [query, setQuery] = useState({q: 'berlin'})
  // useState for initial unit, C° or F°
  const [units, setUnits] = useState('metric')
  //useState for weather, when we fetch weather we will store it in this state
  const [weather, setWeather] = useState(null)

  useEffect(() => {

    const fetchWeather = async () => {
      // Using spreadOperator (...) to copy all query object
      const weatherData = await getFormattedWeatherData({...query, units}).then(
        (data) => {
          setWeather(data);
        }
      );
      
    };

    fetchWeather();
  }, [query, units])
  // NOTE: useEffect is a hook that carries a function inside and fires/activates every time the page
  //  renders/reloads. By adding [query, units] we instruct that we want useEffect to run everytime
  //  there is a change in state of query or units. Therefore, every time we change query or units by
  //  searching a new city/clicking on top links or clicking on C/F button to change units we want to 
  //  fetch new weather via the fetchWeather function inside useEffect
  

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl">
      <TopButtons/>
      <Inputs/>

      {/* This INLINE CONDITIONAL OPERATOR instructs: If weather is TRUE and not NULL we want to 
      load everything below. */}
      {weather && (

        <div>
          {/* For these two components, we are passing a property/prop named weather by us,
              which carries the weather variable declared in useState that stores weather data  */}
          <TimeLocation weather={weather}/>
          <TempDetails weather={weather}/>

          <Forecast title="hourly forecast"/>
          <Forecast title="daily forecast"/>
        </div>

      )}
    </div>
  );
}

export default App;
