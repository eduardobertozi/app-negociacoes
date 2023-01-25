import { Negociacoes } from '../models/negociacoes.js'
import { MensagemView } from '../views/mensagem-view.js'
import { diasDaSemana } from '../enums/dias-da-semana.js'
import { NegociacoesView } from '../views/negociacoes-view.js'
import { Negociacao } from '../models/negociacao.js'
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js'

export class NegociacaoController {
    private inputData: HTMLInputElement
    private inputQuantidade: HTMLInputElement
    private inputValor: HTMLInputElement
    private negociacoes = new Negociacoes()
    private negociacoesView = new NegociacoesView('#negociacoesView', true)
    private mensagemView = new MensagemView('#mensagemView')

    constructor() {
        this.inputData = <HTMLInputElement> document.querySelector('#data')
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement
        this.inputValor = document.querySelector('#valor') as HTMLInputElement
    }

    @logarTempoDeExecucao()
    public adiciona(): void {
        /** Comentário a ser removido */
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value,
        )
        
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociaciacoes em dias úteis são aceitas')
            return 
        }

        this.negociacoes.adiciona(negociacao)
        this.atualizaView()
        this.limparFormulario()
    }

    private ehDiaUtil(data: Date): boolean {
        return data.getDay() > diasDaSemana.DOMINGO && data.getDay() < diasDaSemana.SABADO
    }

    private limparFormulario(): void {
        this.inputData.value = ''
        this.inputQuantidade.value = ''
        this.inputValor.value = ''
        this.inputData.focus()
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes)
        this.mensagemView.update('Negociacao adicionada com sucesso')
    }
}