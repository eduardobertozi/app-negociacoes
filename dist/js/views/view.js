export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elemento = document.querySelector(seletor);
        if (!elemento)
            throw Error(`Seletor ${seletor} não existe no dom`);
        this.elemento = elemento;
        if (escapar)
            this.escapar = escapar;
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar)
            template = template.replace(/<script>[\s\S/]*?<\/script>/, '');
        this.elemento.innerHTML = template;
    }
}
