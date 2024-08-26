import { Route, Routes } from "react-router-dom"
import { Registro } from "../Registro"
import { Registros } from "../Registros"
import { Boleto } from "../Boleto"


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/boleto" element={<Boleto/>} />

    </Routes>
  )
}
