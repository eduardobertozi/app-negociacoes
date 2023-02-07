import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

//                       Array<Negociacao> 
export class Negociacoes implements Modelo<Negociacoes> {
    private negociacoes: Negociacao[] = []

    public adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao)
    }

    public lista(): readonly Negociacao[] {
        return this.negociacoes
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 1)
    }

    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista())
    }
}
