import React from 'react'
import { formatToLocalTime } from '../Services/weatherServices'



//  - This component receives weather prop declared in App.js. The weather prop carries loads of data and
//  we only need specific data so we decunstruct it.
function TimeLocation({weather: {dt, timezone, name, country}}) {
  return (

    <>
    

    <div>
        {/* TIME SECTION */}
        {/* <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                
                {formatToLocalTime(dt, timezone)}
            </p>
        </div> */}
        {/* LOCATION SECTION */}
        {/* <div className='flex items-center justify-center my-3'>
            <p className='text-white text-3xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div> */}
    </div>


    <div className='flex flex-col items-center border-2 my-6  border-green-500'>
        
        {/* TIME SECTION */}
        <div className='flex flex-col items-center space-y-2  border-2 border-black  '>
            <p className='text-white text-xl md:text-2xl font-extralight md:font-normal'>
                {/* Tueday, 21 June 2022 | Local time: 12:46 PM */}
                {formatToLocalTime(dt, timezone, "cccc, dd LLL yyyy")}
                 
            </p>
            <p className='text-white text-xl md:text-2xl font-extralight md:font-normal'>
                {/* Tueday, 21 June 2022 | Local time: 12:46 PM */}
                Local Time: {formatToLocalTime(dt, timezone, "hh:mm a")}  
            </p>
        </div>

        {/* LOCATION SECTION */}
        <div className=' '>
            <p className='text-white text-3xl md:text-4xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
    





    </>
  )
}

export default TimeLocation


// NOTE: 
    //  For the time section, we call formatToLocalTime function and pass two props: dt and timezone
    //  which we receieved as "weather" property. formatToLocalTime returns the formated value as a string.
    //
    //  For the location section we use template literals to create a string with the values of 
    //  name and country props.