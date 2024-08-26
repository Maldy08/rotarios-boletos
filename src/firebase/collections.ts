import { Boleto } from "../models/boletos";
import { createCollection } from "./helpers";


export const boletosCollection = createCollection<Boleto>('boletos');