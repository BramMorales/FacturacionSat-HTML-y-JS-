class GeneradorXML extends InterfazGeneradorArchivo {
    validarDatos(datos) {
      super.validarDatos(datos);
      return true;
    }
    
    generar(datos) {
      return `<?xml version="1.0" encoding="UTF-8"?>
  <factura version="${datos.version}" serie="${datos.numeroSerie}">
    <emisor>
      <rfc>${datos.rfc}</rfc>  
      <tipo>${datos.tipo}</tipo>
    </emisor>
    <detalles>
      <fecha>${datos.fecha}</fecha>
      <vendedor>${datos.vendedor}</vendedor>
      <concepto>${datos.concepto}</concepto>
    </detalles>
    <importes>
      <subtotal>${datos.subtotal}</subtotal>
      <impuesto>${datos.impuesto}</impuesto>
      <total>${datos.total}</total>
    </importes>
    ${datos.firmaDigital ? `<firmaDigital>${datos.firmaDigital}</firmaDigital>` : ''}
    ${datos.qrData ? `<qrData>${datos.qrData}</qrData>` : ''}
  </factura>`;
    }
    
    obtenerMimeType() {
      return "application/xml";
    }
    
    obtenerExtensionArchivo() {
      return "xml";
    }
  }
  