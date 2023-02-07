export function escape(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const metodoOririnal = descriptor.value

    descriptor.value = function(...args: any[]) {
        let retorno = metodoOririnal.apply(this, args)

        if (typeof retorno === 'string') {
            // console.log(`@escape em ação na classe ${this.constructor.name} para o método ${propertyKey}`)
            retorno = retorno.replace(/<script>[\s\S/]*?<\/script>/, '')
        }

        return retorno
    }

    return descriptor
}