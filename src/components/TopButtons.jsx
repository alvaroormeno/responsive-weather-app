import React from 'react'

function TopButtons() {


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
            id:1,
            title: 'New York'
        },
        {
            id:1,
            title: 'Paris'
        },
    ]

  return (


    <div className='flex items-center justify-around my-6'>
        {cities.map((city) => (

            <button 
                className='text-white text-lg font-medium'
                key={city.id}>
                {city.title}
            </button>

        ))}
    </div>
  )
}

export default TopButtons