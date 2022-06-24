import React from 'react'
import { formatToLocalTime } from '../Services/weatherServices'



//  - This component receives weather prop declared in App.js. The weather prop carries loads of data and
//  we only need specific data so we decunstruct it.
function TimeLocation({weather: {dt, timezone, name, country}}) {
  return (

    <div>
        {/* TIME SECTION */}
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                {/* Tueday, 21 June 2022 | Local time: 12:46 PM */}
                {formatToLocalTime(dt, timezone)}
            </p>
        </div>
        {/* LOCATION SECTION */}
        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-3xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
    // NOTE: 
    //  For the time section, we call formatToLocalTime function and pass two props: dt and timezone
    //  which we receieved as "weather" property. formatToLocalTime returns the formated value as a string.
    //
    //  For the location section we use template literals to create a string with the values of 
    //  name and country props.
  )
}

export default TimeLocation