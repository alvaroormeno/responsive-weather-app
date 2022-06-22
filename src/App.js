
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeLocation from './components/TimeLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';


import getWeatherData from './Services/weatherServices';
import getFormattedWeatherData from './Services/weatherServices';

function App() {

  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({q: "london"});
    console.log(data)

  }

  fetchWeather();

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl">
      <TopButtons/>
      <Inputs/>
      <TimeLocation/>
      <TempDetails/>
      <Forecast title="hourly forecast"/>
      <Forecast title="daily forecast"/>
    </div>
  );
}

export default App;
