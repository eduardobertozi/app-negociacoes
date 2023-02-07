export function escape(target, propertyKey, descriptor) {
    const metodoOririnal = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = metodoOririnal.apply(this, args);
        if (typeof retorno === 'string') {
            retorno = retorno.replace(/<script>[\s\S/]*?<\/script>/, '');
        }
        return retorno;
    };
    return descriptor;
}
//# sourceMappingURL=escape.js.map