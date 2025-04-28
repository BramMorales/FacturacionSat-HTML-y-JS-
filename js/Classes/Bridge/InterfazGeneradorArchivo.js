class InterfazGeneradorArchivo {
    generar(datosFactura) {
        throw new Error("Método 'generar()' debe de ser implementado");
    }
    
    validarDatos(datosFactura) {
        // Validación básica común a todos los generadores
        if (!datosFactura.rfc || !datosFactura.fecha || !datosFactura.total) {
            throw new Error("Datos de factura incompletos");
        }
        return true;
    }
    
    obtenerMimeType() {
        throw new Error("Método 'obtenerMimeType()' debe de ser implementado");
    }
    
    obtenerExtensionArchivo() {
        throw new Error("Método 'obtenerExtensionArchivo()' debe de ser implementado");
    }
}
