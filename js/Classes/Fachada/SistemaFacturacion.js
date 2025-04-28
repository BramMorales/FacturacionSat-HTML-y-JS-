class SistemaFacturacion {
    constructor() {
        this.generadorPDF = new GeneradorPDF();
        this.generadorXML = new GeneradorXML();
        this.generadorTXT = new GeneradorTxt();
    }
    
    // Se crea la factura adecuada según el tipo de contribuyente.
    crearFactura(rfc, conFirma, conQR) {
        let factura;
        
        // Se determina tipo de contribuyente por longitud del RFC.
        if (rfc.length === 13) {
            factura = new FacturaPersonaFisica(this.generadorPDF, rfc);
        } else if (rfc.length === 12) {
            factura = new FacturaPersonaMoral(this.generadorPDF, rfc);
        } else {
            throw new Error("RFC inválido");
        }
        
        // Se aplican decoradores, si es necesario.
        if (conFirma) {
            factura = new FacturaConFirmaDigital(factura, "CERT-SAT-2023");
        }
        
        if (conQR) {
            factura = new FacturaConQR(factura);
        }
        
        return factura;
    }
    
    // Método para cambiar el formato de salida.
    setFormato(factura, formato) {
        switch (formato.toLowerCase()) {
            case "pdf":
                factura.setGenerador(this.generadorPDF);
                break;
            case "xml":
                factura.setGenerador(this.generadorXML);
                break;
            case "txt":
                factura.setGenerador(this.generadorTXT);
                break;
            default:
                throw new Error("Formato no soportado");
        }
        return factura;
    }
    
    
    // Se genera la factura electrónica.
    async generarFactura(rfc, datos, formato, opciones) {
        
        // Se crea factura con decoradores según opciones.
        const factura = this.crearFactura(
            rfc, 
            opciones.conFirma, 
            opciones.conQR
        );

        // Se establece formato.
        this.setFormato(factura, formato);
        
        // Se verifican los datos antes de generar el archivo.
        const datosConFirmaQR = await factura.prepararDatos(datos);
        
        // Se genera la factura.
        const resultado = await factura.descargarFactura(datosConFirmaQR);
        
        return resultado;
    }
}