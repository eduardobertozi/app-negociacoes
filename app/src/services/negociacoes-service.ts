import { NegociacoesDoDia } from "../interfaces/negociacoes-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
    public async obterNegociacoes(): Promise<Negociacao[]> {
        const res = await fetch('http://localhost:8080/dados')
        const dados: NegociacoesDoDia[] = await res.json()
        const negociacoesDeHoje = dados.map(dadoDeHoje => new Negociacao(
            new Date(), 
            dadoDeHoje.vezes, 
            dadoDeHoje.montante
        ))

        return negociacoesDeHoje
    }
}