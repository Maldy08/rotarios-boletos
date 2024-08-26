import { useBoletos } from "./hooks/useBoletos";


export const Registros = () => {

  const { boletosCollection } = useBoletos();
  const handleButtonClick = (id: string) => {
    window.open(`/boleto?id=${id}`, '_blank');
  };


  return (
    <>
      <header className=" top-0 left-0 p-4 text-center mx-auto bg-gray-100">
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
                <td className="px-6 py-4">{boletos.paymentReceipt}</td>
                {/* generar un renglon de tipo checkbox */}
                <td className="px-6 py-4">{boletos.isPaid ? 'Sí' : 'No'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleButtonClick(boletos.id)} className="text-indigo-600 hover:text-indigo-900">Boleto</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>

  )
}
