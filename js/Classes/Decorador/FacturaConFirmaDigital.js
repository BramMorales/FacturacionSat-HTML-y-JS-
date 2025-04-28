class FacturaConFirmaDigital extends DecoradorFactura {
    constructor(facturaBase, certificado) {
        super(facturaBase);
        this.certificado = certificado;
    }
    
    // Se preparan los datos para crear la firma digital.
    prepararDatos(datos) {
        const datosPreparados = super.prepararDatos(datos);
        
        // Se añade la información de firma digital.
        const firmaDigital = this.generarFirmaDigital(datosPreparados);
        
        return {
            ...datosPreparados,
            certificado: this.certificado,
            firmaDigital: firmaDigital
        };
    }
     
    // Se simula una firma digital.
    generarFirmaDigital(datos) {
        const stringToHash = `${datos.rfc}|${datos.numeroSerie}|${datos.total}`;
        return this.hashString(stringToHash);
    }
    
    // Se realiza una simulación básica de hash.
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return `FD-${Math.abs(hash).toString(16).toUpperCase()}`;
    }
}
