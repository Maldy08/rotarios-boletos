
import { useState } from 'react';
import { useBoletos } from './hooks/useBoletos';
import img from '../src/assets/noche_bohemia__.jpg';
import { Boleto } from './models/boletos';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';

export const RegistroFormik = () => {

  const { saveBoletos } = useBoletos();
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const [fileError, setFileError] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
      setFilename(event.target.files[0].name);
    }
  }


  return (
    <>
      <header className=" top-0 left-0 p-4 text-center mx-auto bg-gray-100">
        <img src={img} alt="Logo" className=" mx-auto w-fit rounded-lg shadow-xl dark:shadow-gray-800" />
      </header>
      <div className='bg-gray-100'>
        <p className='text-center mx-auto font-bold'>2da. NOCHE BOHEMIA 2024 CLUB ROTARIO MEXICALI OESTE</p>
        <p className='text-center mx-auto'>Duración del evento: 18 de Otubre de 2024 apartir de las 19:00 a la 01:00 am</p>
        <p className='text-center mx-auto'>Escríbenos al whatsapp 686 186 88 15 o al 686 270 40 83</p>
      </div>
      <div className="flex justify-center items-center p-10 bg-gray-100">
        <Formik
          initialValues={{
            nombre: '',
            email: '',
            phone: '',
            socio: '',
            attendees: [],
            paymentMethod: '',
            paymentReceipt: null,
            confirmation: false
          }}
          onSubmit={() => { }}
        >

          {
            ({ }) => (

              <Form className='bg-white p-6 rounded-lg shadow-lg w-full max-w-xl'>
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="nombre">
                    Nombre
                  </label>
                  <input className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="nombre" type="text" placeholder="Nombre" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
                    Correo Electrónico
                  </label>
                  <input className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="email" type="email" placeholder="Correo Electrónico" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="phone">
                    Teléfono
                  </label>
                  <input className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="phone" type="tel" placeholder="Teléfono" />
                </div>
                {/* dropdown socio vendedor  */}
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="socio">
                    Socio Vendedor
                  </label>
                  <select className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="socio" name="socio">
                    <option value="Selecciona un socio">Selecciona un socio</option>
                    <option value="César Ángel Peña Salmón">César Ángel Peña Salmón</option>
                    <option value="Barraza Pérez Ma. Del Socorro">Barraza Pérez Ma. Del Socorro</option>
                    <option value="López Juvera Ramón">López Juvera Ramón</option>
                    <option value="Gilberto Arturo Carranza Paredes">Gilberto Arturo Carranza Paredes</option>
                    <option value="Eduardo Varela Cadena">Eduardo Varela Cadena</option>
                    <option value="Claudia Viviana Álvarez Vega">Claudia Viviana Álvarez Vega</option>
                    <option value="Joel Arias Medina">Joel Arias Medina </option>
                    <option value="María Leonor Cinco Ramírez">María Leonor Cinco Ramírez</option>
                    <option value="Armida Ruíz Salcedo">Armida Ruíz Salcedo</option>
                    <option value="Iván Lechuga">Iván Lechuga</option>
                    <option value="Rosario Torres Zolano">Rosario Torres Zolano</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="attendees">
                    Número de Asistentes
                  </label>
                  <div className="flex flex-col space-y-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="1" onChange={() => { }} />
                      <span className="ml-2 text-gray-700">1</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="2" onChange={() => { }} />
                      <span className="ml-2 text-gray-700">2</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="3" onChange={() => { }} />
                      <span className="ml-2 text-gray-700">3</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="4" onChange={() => { }} />
                      <span className="ml-2 text-gray-700">4</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="5" onChange={() => { }} />
                      <span className="ml-2 text-gray-700">5</span>
                    </label>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="payment-method">
                    Método de Pago
                  </label>
                  <div className="flex flex-col space-y-2">
                    <label className="inline-flex items-center">
                      <input onChange={handlePaymentMethodChange} type="radio" className="form-radio h-5 w-5 text-blue-600" name="payment-method" value="efectivo" />
                      <span className="ml-2 text-gray-700">Efectivo ( boletos fisicos )</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input onChange={handlePaymentMethodChange} type="radio" className="form-radio h-5 w-5 text-blue-600" name="payment-method" value="transferencia" />
                      <span className="ml-2 text-gray-700">Transferencia 64 6020 1464 1464 0572 5631</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input onChange={handlePaymentMethodChange} type="radio" className="form-radio h-5 w-5 text-blue-600" name="payment-method" value="deposito" />
                      <span className="ml-2 text-gray-700">Deposito OXXO 4217 4700 7320 5524</span>
                    </label>
                  </div>
                </div>
                {paymentMethod === 'transferencia' || paymentMethod === 'deposito' ? (
                  <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="payment-receipt">
                      Subir Recibo de Transferencia o Depósito
                    </label>
                    <input type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="payment-receipt" />
                  </div>
                ) : null}
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="attendees">
                    Entiendo que tendré que pagar $750.00 a la llegada por persona en caso de elegir EFECTIVO o el recibo de TRASFERENCIA O DEPOSITO
                  </label>
                  <div className="flex flex-col space-y-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" id='confirmation' />
                      <span className="ml-2 text-gray-700">SI</span>
                    </label>

                  </div>
                </div>
                <div className="flex items-center ">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">
                    Enviar
                  </button>
                </div>

              </Form>
            )
          }

        </Formik>

      </div>
    </>
  )
}
