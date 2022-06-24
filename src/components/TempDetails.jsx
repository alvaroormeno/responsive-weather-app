import React from 'react'
import {
    UilArrowUp,
    UilArrowdown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../Services/weatherServices'


function TempDetails({
    weather: {
        details, 
        icon, 
        temp, 
        temp_min, 
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
        timezone,
    }
}) {

  return (
    <div>

        <div className='flex items-center justify-center md:py-6 text-xl text-cyan-300'>
            <p>{details}</p>
        </div>

        <div className='flex flex-row items-center justify-between text-white py-3'>
            <img 
                src={iconUrlFromCode(icon)} 
                alt=""
                className='w-20' 
            />
            {/* Note: toFixed() rounds temp number so it has no decimals */}
            <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
            <div className='flex flex-col space-y-2'>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTemperature size={18} className="mr-1"/>
                    Real Feel:
                    <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTear size={18} className="mr-1"/>
                    Humidity:
                    <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilWind size={18} className="mr-1"/>
                    Wind:
                    <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
                </div>
            </div> 
        </div>

        


       

        <div className='flex flex-row items-center justify-between md:justify-center space-x-2  text-white text-sm py-3 '>
            <div className='flex flex-col md:flex-row items-center '>

                <UilSun className="h-[30px] w-[30px] md:mr-1  " />
                <p className='font-light flex flex-col md:flex-row items-center'>
                    <span>
                        Rise:
                    </span>
                    
                    <span className='font-medium ml-1'>
                        {/* Calling formatToLocalTime and passing 3 params  */}
                        {formatToLocalTime(sunrise, timezone, "hh:mm a")}
                    </span>
                </p>

            </div>
            
            <p className='font-light'>|</p>

            <div className='flex flex-col md:flex-row items-center'>

                <UilSunset className="h-[30px] w-[30px] md:mr-1"/>
                <p className='font-light flex flex-col md:flex-row items-center'>
                    Set: 
                    <span className='font-medium ml-1'>
                    {formatToLocalTime(sunset, timezone, "hh:mm a")}
                    </span>
                </p>

            </div>

            
            <p className='font-light'>|</p>

            <div className='flex flex-col md:flex-row items-center '>

                <UilSun className="h-[30px] w-[30px] md:mr-1"/>
                <p className='font-light flex flex-col md:flex-row items-center'>
                    High: 
                    <span className='font-medium ml-1'>
                    {`${temp_max.toFixed()}°`}
                    </span>
                </p>

            </div>

            
            <p className='font-light'>|</p>


            <div className='flex flex-col md:flex-row items-center'>

                <UilSun className="h-[30px] w-[30px] md:mr-1"/>
                <p className='font-light flex flex-col md:flex-row items-center'>
                    Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
                </p>

            </div>

            
        </div>

    </div>
  )
}

export default TempDetails