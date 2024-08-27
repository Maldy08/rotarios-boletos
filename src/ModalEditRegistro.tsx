import { ChangeEvent, useState } from "react";
import { Boleto } from "./models/boletos";

interface ModalEditRegistroProps {
    onShowModal(): void;
    boleto: Boleto;
}

export const ModalEditRegistro = ({ boleto , onShowModal}: ModalEditRegistroProps) => {
    const [currentBoleto, setCurrentBoleto] = useState<Boleto | undefined>();


    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (boleto) {
            setCurrentBoleto({ ...boleto, [name]: value });
        }
    };

    return (

        <>
            <div tabIndex={-1} aria-hidden="true" className="backdrop:bg-gray-700  w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-indigo-700 text-zinc-50">
                            <h3 className="text-1xl font-semibold">
                                Editar Registro
                            </h3>
                            <div className="flex justify-end">
                                <button id="closeContactForm" className="text-white hover:text-red-500" onClick={onShowModal}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
