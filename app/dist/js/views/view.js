export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (!elemento)
            throw Error(`Seletor ${seletor} não existe no dom`);
        this.elemento = elemento;
    }
    update(model) {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
//# sourceMappingURL=view.js.map