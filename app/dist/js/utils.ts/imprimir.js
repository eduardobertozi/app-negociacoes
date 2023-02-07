export function imprimir(...objetos) {
    objetos.forEach(objeto => {
        console.log(objeto.paraTexto());
    });
}
