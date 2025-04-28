class FacturaElectronica {
    constructor(generador) {
        if (new.target === FacturaElectronica) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this.generador = generador;
        this.metadatos = {
            fechaGeneracion: null,
            numeroSerie: this.generarNumeroSerie(),
            version: "4.0"
        };
    }

    setGenerador(generador) {
        this.generador = generador;

        // Se establece el return para permitir encadenamiento.
        return this; 
    }
    
    generarNumeroSerie() {
        return `FE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    validarDatos(datos) {
        // Validación específica de la factura
        return true;
    }

    prepararDatos(datos) {
        // Método para preparar datos antes de generar la factura
        this.metadatos.fechaGeneracion = new Date();
        return {
            ...datos,
            numeroSerie: this.metadatos.numeroSerie,
            version: this.metadatos.version,
            fechaGeneracion: this.metadatos.fechaGeneracion.toISOString()
        };
    }

    generarFactura(datos) {
        if (!this.validarDatos(datos)) {
            throw new Error("Datos inválidos para la factura");
        }
        
        const datosPreparados = this.prepararDatos(datos);
        
        return this.generador.generar(datosPreparados);
    }
    
    descargarFactura(datos) {
        const contenido = this.generarFactura(datos);
        const mimeType = this.generador.obtenerMimeType();
        const extension = this.generador.obtenerExtensionArchivo();
        
        return {
            contenido,
            mimeType,
            nombreArchivo: `factura_${this.metadatos.numeroSerie}.${extension}`
        };
    }
}