import { useState, useEffect } from 'react';

function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {

    async function fetchFlights() {
      let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flights`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      response = await response.json()
      setFlights(response)
    }

    async function fetchFlightById(id) {
      let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flight/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      response = await response.json()
      console.log(response)
    }


    fetchFlights()
    fetchFlightById("616b4c93e40bd9e806e33d0e")
  }, [])


  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-100">
        {flights.length ?
          flights.map(flight => (
            <div key={flight._id} className="mt-5 mb-5 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl h-96 w-100 pb-5">
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:flex-shrink-0">
                  <img className="h-96 w-full object-cover md:w-96" loading="lazy" src={`https://source.unsplash.com/random/1200x800/?${flight.image}`} alt="Man looking at item at a store" />
                </div>
                <div className="flex flex-col p-6">
                  {/* Destinity and Description Section */}
                  <div>
                    <div className="uppercase tracking-wide text-sm text-gray-900 font-semibold text-xl text-center">{flight.destiny}</div>
                    <p href="#" className="block mt-4 text-lg leading-tight text-base text-black">{flight.description}</p>
                  </div>
                  {/* Flight Company Section */}
                  <div className="mt-4">
                    <div className="tracking-wide text-sm text-black font-semibold">Compañia Aerea</div>
                    <p href="#" className="tracking-wide text-sm text-gray-600">{flight.company}</p>
                  </div>

                  {/* Tiket Information Section */}
                  <h2 className="mt-4 tracking-wide text-sm text-black font-semibold">Informacion Pasaje</h2>
                  <div className="flex flex-row mt-2 justify-between items-center">
                    <div className="w-2/4">
                      <p className="tracking-wide text-sm text-black">Salida</p>
                      <p className="tracking-wide text-sm text-gray-400">
                        {flight.airportDeparture}
                      </p>
                      <p className="tracking-wide text-sm text-gray-400">
                        {flight.timeDeparture}
                      </p>
                    </div>
                    <div className="w-2/4">
                      <p className="tracking-wide text-sm text-black">Llegada</p>
                      <p className="tracking-wide text-sm text-gray-400">
                        {flight.airportArrival}
                      </p>
                      <p className="tracking-wide text-sm text-gray-400">
                        {flight.timeArrival}
                      </p>
                    </div>
                  </div>
                  {/* Carryon Section */}
                  <div className="mt-4">
                    <p className="tracking-wide text-sm text-black font-semibold">Carry on </p>
                    <span className="text-sm text-gray-400 font-normal"> {flight.carryOn.smallBag} Valija Pequeña </span> <span className="text-sm text-gray-400 font-normal"> - {flight.carryOn.bigBag} Valija Grande</span>
                  </div>
                  {/* Price Section */}
                  <div className="mt-4 flex flex-end justify-end">
                    <p className="tracking-wide text-sm text-green-400 font-bold">${flight.price}</p>
                  </div>
                </div>
              </div>
            </div>

          ))
          :
          <div>Cargando ...</div>}
      </div>

    </div>
  )
}

export default Flights
