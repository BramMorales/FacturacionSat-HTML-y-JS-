class FacturaConQR extends DecoradorFactura {

    // Se manipulan los datos para crear el código QR.
    prepararDatos(datos) {
        const datosPreparados = super.prepararDatos(datos);
        
        // Se genera el QR.
        const qrData = `RFC:${datosPreparados.rfc}|SERIE:${datosPreparados.numeroSerie}|TOTAL:${datosPreparados.total}`;
        
        return {
            ...datosPreparados,
            qrData: qrData
        };
    }
}
