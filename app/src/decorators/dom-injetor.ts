export function domInjetor(seletor: string) {
    return function(target: any, propertyKey: any) {
        console.log(`Modificando prototype ${target.constructor.name} 
            e adicionando getter para a propriedade ${propertyKey}`)

        let elemento: HTMLElement 
        
        const getter = function() {
            // Recurso de cache, pra não ficar buscando toda hora
            if (!elemento) {
                elemento = <HTMLElement>document.querySelector(seletor)
                console.log(`buscando elemento do DOM com o ${seletor} para injetar em ${propertyKey}`)
            }

            return elemento
        }

        Object.defineProperty(
            target, // prototype
            propertyKey, // para essa classe
            { get: getter } // crie o getter
        )
    }
}