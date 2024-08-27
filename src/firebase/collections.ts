import { Boleto } from "../models/boletos";
import { createCollection } from "./helpers";


export const boletosCollectionFirebase = createCollection<Boleto>('boletos');