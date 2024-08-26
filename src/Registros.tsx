import { useBoletos } from "./hooks/useBoletos";
import img from './assets/roeario-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-modal'
import { ChangeEvent, FormEvent, useState } from "react";
import { Boleto } from "./models/boletos";




export const Registros = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentBoleto, setCurrentBoleto] = useState<Boleto | undefined>();
  const { boletosCollection } = useBoletos();


  const openModal = (boleto : Boleto) => {
    setCurrentBoleto(boleto);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentBoleto(undefined);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentBoleto) {
      setCurrentBoleto({ ...currentBoleto, [name]: value });
    }
  };

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para actualizar el registro
    console.log('Registro actualizado:', currentBoleto);
    closeModal();
  };
  

  const handleButtonClick = (id: string) => {
    window.open(`/boleto?id=${id}`, '_blank');
  };

  
  const handleEditClick = (id: string) => {
    // Aquí puedes manejar la lógica para editar el registro
    console.log(`Editar registro con id: ${id}`);
    // Por ejemplo, podrías redirigir a una página de edición
    window.location.href = `/editar?id=${id}`;
  };


  return (
    <>
      <header className=" top-0 left-0 p-4 text-center mx-auto bg-gray-100">
         <img src={img} alt="avatar" className=" w-52 object-cover " />
        <h1 className="text-2xl font-semibold">Registros</h1>
      </header>
      <div className=" pt-4 relative overflow-x-auto shadow-md sm:rounded-lg">


        <table className="  w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="px-6 py-3">#</th> */}
              {/* <th scope="col" className="px-6 py-3"></th> */}
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Teléfono</th>
              <th scope="col" className="px-6 py-3">Asistentes</th>
              <th scope="col" className="px-6 py-3">Método de pago</th>
              <th scope="col" className="px-6 py-3">Comprobante de pago</th>
              <th scope="col" className="px-6 py-3">Pagado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {boletosCollection.map(boletos => (
              <tr key={boletos.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {/* <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={img} alt="avatar" className="w-10 h-10 object-cover rounded-full" />
                    
                  </div>
                </td> */}
                <td className="px-6 py-4">{boletos.name}</td>
                <td className="px-6 py-4">{boletos.email}</td>
                <td className="px-6 py-4">{boletos.phone}</td>
                <td className="px-6 py-4">{boletos.attendees}</td>
                <td className="px-6 py-4">{boletos.paymentMethod}</td>
                <td className="px-6 py-4">
                        {boletos.paymentReceipt ? (
                            <img src={boletos.paymentReceipt} alt="Recibo de pago" className="w-20 h-20 object-cover" />
                        ) : (
                            'No disponible'
                        )}
                    </td>
                {/* generar un renglon de tipo checkbox */}
                <td className="px-6 py-4">{boletos.isPaid ? 'Sí' : 'No'}</td>
                <td className="px-6 py-4">
                <button onClick={() => openModal(boletos)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Registro"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Editar Registro</h2>
        {currentBoleto && (
          <form onSubmit={handleEditSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={currentBoleto.name}
                onChange={handleEditChange}
                className="input"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={currentBoleto.email}
                onChange={handleEditChange}
                className="input"
              />
            </label>
            <label>
              Teléfono:
              <input
                type="text"
                name="phone"
                value={currentBoleto.phone}
                onChange={handleEditChange}
                className="input"
              />
            </label>
            <label>
              Asistentes:
              <input
                type="number"
                name="attendees"
                value={currentBoleto.attendees}
                onChange={handleEditChange}
                className="input"
              />
            </label>
            <label>
              Método de pago:
              <input
                type="text"
                name="paymentMethod"
                value={currentBoleto.paymentMethod}
                onChange={handleEditChange}
                className="input"
              />
            </label>
            <label>
              Comprobante de pago:
              <input
                type="text"
                name="paymentReceipt"
                value={currentBoleto.paymentReceipt}
                onChange={handleEditChange}
                className="input"
              />
            </label>
            <label>
              Pagado:
              <input
                type="checkbox"
                name="isPaid"
                checked={currentBoleto.isPaid}
                onChange={(e) => setCurrentBoleto({ ...currentBoleto, isPaid: e.target.checked })}
                className="input"
              />
            </label>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
            <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </form>
        )}
      </Modal>

      
    </>

  )
}
