
import { useState } from 'react';
import { useBoletos } from './hooks/useBoletos';
import img from '../src/assets/noche_bohemia__.jpg';
import { Boleto } from './models/boletos';

export const Registro = () => {

  const { saveBoletos } = useBoletos();
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const [fileError, setFileError] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ nombre?: string; email?: string; phone?: string; attendees?: string; paymentMethod?: string, confirmation?: string, socio? : string }>({});
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

  const handleAttendeesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedAttendees([...selectedAttendees, event.target.value]);
    } else {
      setSelectedAttendees(selectedAttendees.filter(attendee => attendee !== event.target.value));
    }
  };

  


  const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
    const errors: { nombre?: string; email?: string; phone?: string; attendees?: string; paymentMethod?: string, confirmation?: string, socio? : string } = {};
    const name = event.currentTarget['nombre'].value;
    const email = event.currentTarget['email'].value;
    const phone = event.currentTarget['phone'].value;
    const attendees = Array.from(event.currentTarget['attendees']).filter((input: any) => input.checked).map((input: any) => input.value);
    const confirmation = event.currentTarget['confirmation'].checked;
    const socio = event.currentTarget['socio'].value;

    console.log(socio)

    if (!name) {
      errors.nombre = '*El nombre es obligatorio.';
    }

    if (!email) {
      errors.email = '*El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '*El correo electrónico no es válido.';
    }

    if (!phone) {
      errors.phone = '*El teléfono es obligatorio.';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = '*El teléfono debe tener 10 dígitos.';
    }

    if (socio === 'Selecciona un socio') {
      errors.socio = '*Debe seleccionar un socio vendedor.';
    }

    if (attendees.length === 0) {
      errors.attendees = '*Debe seleccionar al menos un asistente.';
    }

    if (!paymentMethod) {
      errors.paymentMethod = '*Debe seleccionar un método de pago.';
    }


    if ((paymentMethod === 'transferencia' || paymentMethod === 'deposito') && !event.currentTarget['payment-receipt'].files?.length) {
      setFileError('*Por favor, sube el recibo de transferencia o depósito.');
    } else {
      setFileError('');
    }

    if (!confirmation) {
      errors.confirmation = 'Debe confirmar que entiende las condiciones.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0 && !fileError;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm(event)) {
      // Aquí puedes manejar el envío del formulario
      const boleto: Boleto = {
        name: event.currentTarget['nombre'].value,
        email: event.currentTarget['email'].value,
        phone: event.currentTarget['phone'].value,
        attendees: selectedAttendees.map(attendee => parseInt(attendee)).reduce((acc, attendee) => acc + attendee, 0),
        paymentMethod: event.currentTarget['payment-method'].value,
        paymentReceipt: filename,
        // paymentMethod === 'transferencia' || paymentMethod === 'deposito' ? event.currentTarget['payment-receipt'].files[0].name : null,
        id: Math.random().toString(36).substr(2, 9),
        isPaid: false,
        socio: event.currentTarget['socio'].value
      }

      saveBoletos(boleto, file!);
      setFile(null);
      setFilename('');
      alert('Registro guardado exitosamente');
      event.currentTarget.reset();
    }
  };

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
        <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="nombre" type="text" placeholder="Nombre" />
            {formErrors.nombre && <p className="text-red-500 text-sm mt-2">{formErrors.nombre}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="email" type="email" placeholder="Correo Electrónico" />
            {formErrors.email && <p className="text-red-500 text-sm mt-2">{formErrors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="phone">
              Teléfono
            </label>
            <input className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="phone" type="tel" placeholder="Teléfono" />
            {formErrors.phone && <p className="text-red-500 text-sm mt-2">{formErrors.phone}</p>}
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
            {formErrors.socio && <p className="text-red-500 text-sm mt-2">{formErrors.socio}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="attendees">
              Número de Asistentes
            </label>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="1" onChange={handleAttendeesChange} />
                <span className="ml-2 text-gray-700">1</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="2" onChange={handleAttendeesChange} />
                <span className="ml-2 text-gray-700">2</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="3" onChange={handleAttendeesChange} />
                <span className="ml-2 text-gray-700">3</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="4" onChange={handleAttendeesChange} />
                <span className="ml-2 text-gray-700">4</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name="attendees" value="5" onChange={handleAttendeesChange} />
                <span className="ml-2 text-gray-700">5</span>
              </label>
            </div>
            {formErrors.attendees && <p className="text-red-500 text-sm mt-2">{formErrors.attendees}</p>}
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
            {formErrors.paymentMethod && <p className="text-red-500 text-sm mt-2">{formErrors.paymentMethod}</p>}
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
            {formErrors.confirmation && <p className="text-red-500 text-sm mt-2">{formErrors.confirmation}</p>}
          </div>
          <div className="flex items-center ">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">
              Enviar
            </button>
          </div>

        </form>
      </div>
    </>
  )
}
