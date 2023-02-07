import { Negociacoes } from '../models/negociacoes.js'
import { MensagemView } from '../views/mensagem-view.js'
import { diasDaSemana } from '../enums/dias-da-semana.js'
import { NegociacoesView } from '../views/negociacoes-view.js'
import { Negociacao } from '../models/negociacao.js'
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js'
import { inspecionar } from '../decorators/inspecionar.js'
import { domInjetor } from '../decorators/dom-injetor.js'
import { NegociacoesService } from '../services/negociacoes-service.js'
import { imprimir } from '../utils/imprimir.js'

export class NegociacaoController {
    @domInjetor('#data')
    private inputData: HTMLInputElement
    @domInjetor('#quantidade')
    private inputQuantidade: HTMLInputElement
    @domInjetor('#valor')
    private inputValor: HTMLInputElement

    private negociacoes = new Negociacoes()
    private negociacoesView = new NegociacoesView('#negociacoesView')
    private mensagemView = new MensagemView('#mensagemView')
    private negociacoesService = new NegociacoesService()

    //  removi daqui os seletores e criei um decorator

    public adiciona(): void {
        /** Comentário a ser removido */
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value,
        )

        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociaciacoes em dias úteis são aceitas')
            return
        }

        this.negociacoes.adiciona(negociacao)
        
        imprimir(negociacao, this.negociacoes)

        this.atualizaView()
        this.limparFormulario()
    }

    public async importaDados(): Promise<void> {
        let negociacoesDeHoje = await this.negociacoesService.obterNegociacoes()
        
        negociacoesDeHoje = negociacoesDeHoje
            .filter(negociacaoDeHoje => !this.negociacoes.lista()
            .some(negociacao => negociacao.ehIgual(negociacaoDeHoje)))
                
        negociacoesDeHoje.forEach(negociacao => this.negociacoes.adiciona(negociacao))
        this.negociacoesView.update(this.negociacoes)
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