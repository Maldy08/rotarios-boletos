import { ChangeEvent, FormEvent, useState } from "react";
import { Boleto } from "./models/boletos";

interface ModalEditRegistroProps {
    onShowModal(): void;
    boleto: Boleto;
    onSave(boleto: Boleto, file: File | null, filename: string): void;
}

export const ModalEditRegistro = ({ boleto, onShowModal, onSave }: ModalEditRegistroProps) => {
    const [currentBoleto, setCurrentBoleto] = useState<Boleto | undefined>(boleto);
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState<string>('');

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (currentBoleto) {
            setCurrentBoleto({ ...currentBoleto, [name]: value });
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setFile(event.target.files[0]);
            setFilename(event.target.files[0].name);
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (currentBoleto) {
            setCurrentBoleto({ ...currentBoleto, isPaid: e.target.checked });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (currentBoleto) {
            onSave(currentBoleto, file, filename);
        }
        onShowModal();
    };

    return (
        <>
            <div tabIndex={-1} aria-hidden="true" className="backdrop:bg-gray-700 w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-blue-950 text-zinc-50">
                            <h3 className="text-1xl font-semibold">
                                Editar Registro
                            </h3>
                            <div className="flex justify-end">
                                <button id="closeContactForm" className="text-white hover:text-red-500" onClick={onShowModal}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input value={currentBoleto?.name || ''} readOnly className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="nombre" type="text" placeholder="Nombre" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
                                        Correo Electrónico
                                    </label>
                                    <input value={currentBoleto?.email || ''} readOnly className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="email" type="email" placeholder="Correo Electrónico" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="phone">
                                        Teléfono
                                    </label>
                                    <input value={currentBoleto?.phone || ''} readOnly className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="phone" type="tel" placeholder="Teléfono" />
                                </div>

                                {currentBoleto?.paymentReceipt ? (
                                    <div className="mb-6">
                                        <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="paymentReceipt">
                                            Comprobante de pago
                                        </label>
                                        <img src={currentBoleto.paymentReceipt} alt="Comprobante de pago" className="w-52" />
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="paymentReceipt">
                                            Comprobante de pago
                                        </label>
                                        <input onChange={handleFileChange} className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="paymentReceipt" type="file" placeholder="Comprobante de pago" />
                                    </div>
                                )}

                                <div className="mb-6">
                                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="isPaid">
                                        Pagado
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="isPaid"
                                        name="isPaid"
                                        checked={currentBoleto?.isPaid || false}
                                        onChange={handleCheckboxChange}
                                        className="shadow-md  border border-gray-300 rounded-lg text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex items-center justify-end">
                                    <button 
                                        onClick={() => {
                                            onSave(currentBoleto!, file, filename);
                                        }}
                                        type="button" 
                                        className="bg-blue-950 hover:bg-blue-700 text-zinc-50 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                                        Guardar
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalEditRegistro;