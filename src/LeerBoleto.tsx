import { useEffect } from "react"
import { useBoletos } from "./presentation/hooks/useBoletos"
import { useSearchParams } from "react-router-dom"
import { Boleto } from "./models/boletos"



export const LeerBoleto = () => {
    const [searchParams] = useSearchParams();
    const { getBoletoById } = useBoletos();

    let boleto: Boleto | null = null;
    const id = searchParams.get("id");
    useEffect(() => {

        const getBoleto = async () => {
            if (id) {
                boleto = await getBoletoById(id)
                console.log(boleto)
            }
        }

        getBoleto();
    }, [id, getBoletoById])


    return (
        <div>
            <h1>Leer Boleto</h1>
            <p> {JSON.stringify(boleto)}</p>

        </div>
    )
}
