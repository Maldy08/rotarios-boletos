import { Boleto } from "../../domain/entities/boletos"



export interface BoletosRepository {
    create: (boleto: Boleto) => Promise<void>
    update: (boleto: Boleto) => Promise<void>
    getById: (id: string) => Promise<Boleto>
    getAll: () => Promise<Boleto[]>
}