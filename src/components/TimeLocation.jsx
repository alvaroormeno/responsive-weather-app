import React from 'react'



//  - This component receives weather prop declared in App.js. The weather prop carries loads of data and
//  we only need specific data so we decunstruct it.
function TimeLocation({weather: {dt, timezone, name, country}}) {
  return (

    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                {/* Tueday, 21 June 2022 | Local time: 12:46 PM */}
                {`${dt} | ${timezone}`}
            </p>
        </div>

        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-3xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
    // NOTE: 
  )
}

export default TimeLocation