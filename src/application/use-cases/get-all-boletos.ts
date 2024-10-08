import { Boleto } from "../../domain/entities/boletos";
import { BoletosRepository } from "../repositories/boletos-repository";

export class GetAllBoletos {
    constructor(private readonly boletosRepository: BoletosRepository) { }

    async execute(): Promise<Boleto[]> {
        return await this.boletosRepository.getAll();
    }

}