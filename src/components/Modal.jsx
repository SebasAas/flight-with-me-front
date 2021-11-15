import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "../styles/Modal.css";

const Modal = props => {
  const [flightID, setFlightID] = useState("");
  const [destiny, setDestiny] = useState("")
  const [description, setDescription] = useState("")
  const [company, setCompany] = useState("")
  const [timeDeparture, setTimeDeparture] = useState("")
  const [timeArrival, setTimeArrival] = useState("")
  const [airportDeparture, setAirportDeparture] = useState("")
  const [airportArrival, setAirportArrival] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [])

  useEffect(() => {
    setFlightID(props?.data?._id)
    setDestiny(props?.data?.destiny)
    setDescription(props?.data?.description)
    setCompany(props?.data?.company)
    setTimeDeparture(props?.data?.timeDeparture)
    setTimeArrival(props?.data?.timeArrival)
    setAirportDeparture(props?.data?.airportDeparture)
    setAirportArrival(props?.data?.airportArrival)
    setImage(props?.data?.image)
    setPrice(props?.data?.price)
  }, [props]);

  const handleSubmit = () => {
    if (props?.type === "update") {
      if (confirm('¿Esta seguro que desea modificar el registro')) {

        const data = {
          destiny,
          description,
          company,
          timeDeparture,
          timeArrival,
          airportDeparture,
          airportArrival,
          image,
          price
        }

        async function updateFlightById() {
          let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flights/${flightID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          response = await response.json()
          console.log(response)
        }
        updateFlightById()
      }
    } else if (props?.type === "insert") {

      const data = {
        destiny,
        description,
        company,
        timeDeparture,
        timeArrival,
        airportDeparture,
        airportArrival,
        image,
        price,
        carryOn: {
          smallBag: 2,
          bigBag: 2
        }
      }

      console.log(data)

      async function addFlight() {
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flights`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        response = await response.json()
        console.log(response)
      }
      addFlight()
    }


    props.refetch();
    props.onClose();
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Alterar Informacion</h4>
          </div>
          <div className="modal-body">
            <input type="text" placeholder="Destino" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setDestiny(e.target.value)} value={destiny} />
            <input type="text" placeholder="Descripcion" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setDescription(e.target.value)} value={description} />
            <input type="text" placeholder="Compañia Aerea" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setCompany(e.target.value)} value={company} />
            <input type="text" placeholder="Hora Salida" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setTimeDeparture(e.target.value)} value={timeDeparture} />
            <input type="text" placeholder="Hora Llegada" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setTimeArrival(e.target.value)} value={timeArrival} />
            <input type="text" placeholder="Aeropuerto Salida" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setAirportDeparture(e.target.value)} value={airportDeparture} />
            <input type="text" placeholder="Aeropuerto Llegada" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setAirportArrival(e.target.value)} value={airportArrival} />
            <input type="text" placeholder="Nombre de Imagen" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setImage(e.target.value)} value={image} />
            <input type="text" placeholder="Precio" className={`bg-white-200 text-black w-auto mb-4 border-gray-300`} onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>
          <div className="modal-footer flex justify-around">
            <button onClick={() => handleSubmit()} className="button">
              ✓ Confirmar
            </button>
            <button onClick={props.onClose} className="button">
              X Cerrar
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
