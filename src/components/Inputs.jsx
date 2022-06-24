import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs({setQuery, units, setUnits}) {

	// USESTATE HOOK to declare state for search input as EMPTY('') for initial state
	const [city, setCity] = useState('')

	const handleSearchClick = () => {
		if (city !== '') setQuery({q: city})
	}

	const handleLocationClick = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;

				setQuery({lat, lon})
			})
		}
	}

	const handleUnitsChange = (event) => {
		const selectedUnit = event.currentTarget.name;
		if(units !== selectedUnit) setUnits(selectedUnit)
	}

	return (

	

		<div className="flex flex-col md:flex-row justify-center my-6 border-4">
			<div className="flex flex-row md:w-3/4 items-center justify-center space-x-4">
				<input
					value={city}
					onChange={(event) => setCity(event.currentTarget.value) }
					type="text"
					placeholder="Search for a city..."
					className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-lg"
				/>
				<UilSearch
					size={25}
					className="text-white cursor-pointer transition ease-out hover:scale-125"
					onClick={handleSearchClick}
				/>
				<UilLocationPoint
					size={25}
					className="text-white cursor-pointer transition ease-out hover:scale-125"
					onClick={handleLocationClick}
				/>
			</div>

            <div className="flex flex-row w-1/4 items-center justify-center">
                <button
                    name="metric"
                    className="text-xl text-white font-light transition ease-out hover:scale-125 "
					onClick={handleUnitsChange}
                >°C</button>
                <p className="text-xl text-white mx-2">|</p>
                <button
                    name="imperial"
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
					onClick={handleUnitsChange}
                >°F</button>
            </div>
		</div>
	);
}

export default Inputs;
