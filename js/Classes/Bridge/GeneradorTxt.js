class GeneradorTxt extends InterfazGeneradorArchivo {
    validarDatos(datos) {
      super.validarDatos(datos);
      return true;
    }
    
    generar(datos) {
      let contenido = `=============================================
  FACTURA ELECTRÓNICA - SAT
  =============================================
  No. Serie:            ${datos.numeroSerie}
  Versión:              ${datos.version}
  RFC:                  ${datos.rfc}
  Tipo de Contribuyente: ${datos.tipo}
  Fecha de Emisión:     ${datos.fecha}
  ---------------------------------------------
  Vendedor:             ${datos.vendedor}
  Concepto:             ${datos.concepto}
  ---------------------------------------------
  Subtotal:             $${datos.subtotal}
  Impuesto (16%):       $${datos.impuesto}
  Total:                $${datos.total}
  =============================================`;
  
      // Se añade sección de firma digital, si está presente.
      if (datos.firmaDigital) {
        contenido += `
  Firma Digital:        ${datos.firmaDigital}`;
      }
  
      // Se añade código QR, si está presente.
      if (datos.qrData) {
        contenido += `
  QR Data:              ${datos.qrData}`;
      }
  
      return contenido;
    }
    
    obtenerMimeType() {
      return "text/plain";
    }
    
    obtenerExtensionArchivo() {
      return "txt";
    }
  }
  