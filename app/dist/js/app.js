import { NegociacaoController } from './controllers/negociacao-controller.js';
const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (!form)
    throw Error('Não foi possível inicializar a aplicação');
form.addEventListener('submit', event => {
    event.preventDefault();
    controller.adiciona();
});
const formBtnImporta = document.querySelector('#btn-importar');
if (!formBtnImporta)
    throw Error('Botão importa não foi encontrado');
formBtnImporta.addEventListener('click', () => {
    controller.importaDados();
});
//# sourceMappingURL=app.js.map