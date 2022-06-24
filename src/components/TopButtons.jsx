import React from 'react'

function TopButtons({setQuery}) {


    const cities = [
        {
            id:1,
            title: 'London'
        },
        {
            id:2,
            title: 'Sydney'
        },
        {
            id:3,
            title: 'Tokyo'
        },
        {
            id:4,
            title: 'Lima'
        },
        {
            id:5,
            title: 'Paris'
        },
    ]

  return (


    <div className='flex items-center justify-around my-6 space-x-4'>
        {cities.map((city) => (

            <button 
                className='text-white text-sm md:font-medium md:text-lg'
                key={city.id}
                onClick={() => setQuery({q: city.title})}
            >
                {city.title}
            </button>

        ))}
    </div>
  )
}

export default TopButtons