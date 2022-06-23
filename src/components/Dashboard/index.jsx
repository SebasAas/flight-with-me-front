import { useState, useEffect } from 'react';
import Modal from "../Modal";

function Dashboard() {
  const [flights, setFlights] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [typeAction, setTypeAction] = useState('');
  const [flightModal, setFlightModal] = useState({});

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

    // async function fetchFlightById(id) {
    //   let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flight/${id}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   response = await response.json()
    //   console.log(response)
    // }


    fetchFlights()
    // fetchFlightById("616b4c93e40bd9e806e33d0e")
  }, [])

  useEffect(() => {
    if (refetch === true) {
      async function refetchData() {
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flights`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        response = await response.json()
        setFlights(response)
        setRefetch(false)
      }

      refetchData()
    }

  }, [refetch])

  const handleDeleteFlight = (id) => {
    if (confirm('¿Esta seguro que desea eliminar el registro')) {
      async function deleteFlightById(id) {
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flight/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        response = await response.json()
        console.log(response)
      }
      deleteFlightById(id)
    }
    setRefetch(true)
  }

  const handleUpdateFlight = (flight) => {
    setModalOpen(true)
    setFlightModal(flight)
    setTypeAction('update')
  }

  const handleAddFlight = () => {
    setModalOpen(true)
    setTypeAction('insert')
  }

  return (
    <>
      <Modal refetch={() => setRefetch(true)} type={typeAction} data={flightModal} onClose={() => setModalOpen(false)} show={modalOpen}>
      </Modal>
      <div className='min-h-screen w-full'>
        <h1 className='uppercase tracking-wide text-sm text-gray-900 font-semibold text-xl text-center mt-5'>Dashboard</h1>
        <div className="flex flex-col text-left mt-7">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 text-center">
                    <tr >
                      <th>Destino</th>
                      <th>Descripcion</th>
                      <th>Aerolinea</th>
                      <th>Hora Salida</th>
                      <th>Hora Llegada</th>
                      <th>Aerop Salida</th>
                      <th>Aerop Llegada</th>
                      <th>Imagen</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody className='text-center divide-y divide-gray-200'>
                    {
                      flights.map(flight => (
                        <tr key={flight._id}>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.destiny}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.description}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.company}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.timeDeparture}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.timeArrival}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.airportDeparture}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.airportArrival}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.image}</p></td>
                          <td className='px-6 py-4 whitespace-nowrap'><p> {flight.price}</p></td>
                          <td className="cursor-pointer px-6 py-4 whitespace-nowrap" onClick={() => handleUpdateFlight(flight)}>
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" /></svg></td>
                          <td className="cursor-pointer px-6 py-4 whitespace-nowrap" onClick={() => handleDeleteFlight(flight._id)}>
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" /></svg></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 mb-5 mr-5 z-1000" onClick={() => handleAddFlight()}>
        <div className='text-center flex items-center flex-col justify-center text-pink-500'>
          <svg fill="#cf0582" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z" /></svg>
          Nuevo Registro
        </div>
      </div>
    </>

  )
}

export default Dashboard
