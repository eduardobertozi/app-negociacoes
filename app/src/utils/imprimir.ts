import { Negociacao } from "../models/negociacao";
import { Imprimivel } from "./imprimivel";

export function imprimir(...objetos: Imprimivel[]): void {
    objetos.forEach(objeto => {
        console.log(objeto.paraTexto())
    })
}