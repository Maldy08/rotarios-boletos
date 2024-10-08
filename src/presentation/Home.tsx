import img from '../src/assets/roeario-logo.png';

export const Home = () => {
    return (
        <>
            <header className=" top-0 left-0 p-4 text-center mx-auto bg-gray-100">
                <img src={img} alt="Logo" className=" mx-auto w-fit rounded-lg " />

            </header>
            <div className=" pt-4 relative overflow-x-auto ">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Bienvenido a la plataforma de registros</h1>
                    <p className="text-lg">Registra a tus asistentes y genera boletos para tus eventos</p>
                    {/* ir al registro boton */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        <a href="/registro">Registro</a>
                    </button>
                </div>
            </div>


        </>
    )
}
