import React from 'react'
import { iconUrlFromCode } from '../Services/weatherServices'

function Forecast({title, items}) {

    console.log(items)
  return (

    <div>
        {/* TITLE SECTION */}
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>
                {title}
            </p>
        </div>

        
        {/* LINE DIVIDER SECTION */}
        <hr className='my-2' />

        {/* WEATHER CONTAINER SECTION */}
        <div className='flex flex-row items-center justify-between text-white'>
            
            {/* Note: mapping the items param and for each object one of these containers will be created  */}
            {items.map((item) => (
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm'>
                        {item.title}
                    </p>
                    <img 
                        src={iconUrlFromCode(item.icon)}
                        alt=""
                        className='w-12 my-1' 
                    />
                    <p className='font-medium'>
                        {`${item.temp.toFixed()}°`}
                    </p>
                </div> 
            ))}
           

            



        </div>

    </div>
  )
}

export default Forecast