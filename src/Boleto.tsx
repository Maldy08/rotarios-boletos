import { useLocation } from "react-router-dom"
import QRCode from "qrcode.react";


export const Boleto = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Boleto de Evento</h1>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="text-center">
                    <p className="text-lg font-semibold">ID del Boleto:</p>
                    <p className="text-xl text-blue-600">{id}</p>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="text-center">
                    <p className="text-lg font-semibold">Nombre del Evento:</p>
                    <p className="text-xl">Noche Bohemia 2024</p>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="text-center">
                    <p className="text-lg font-semibold">Fecha:</p>
                    <p className="text-xl">18 de Octubre de 2024</p>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="text-center">
                    <p className="text-lg font-semibold">Hora:</p>
                    <p className="text-xl">18:00 - 24:00 hrs</p>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="text-center">
                    <p className="text-lg font-semibold">Código QR:</p>
                    <div className="flex justify-center">
                        <QRCode value={id || ''} size={150} />
                    </div>

                </div>
            </div>
        </div>
    )
}
