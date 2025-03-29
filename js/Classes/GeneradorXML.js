class GeneradorXML extends InterfazGeneradorArchivo{
  generar(datos) {
      return `<factura>
              <rfc>${datos.rfc}</rfc>  
              <tipo>${datos.tipo}</tipo>
              <fecha>${datos.fecha}</fecha>
              <vendedor>${datos.vendedor}</vendedor>
              <concepto>${datos.concepto}</concepto>
              <subtotal>${datos.subtotal}</subtotal>
              <impuesto>${datos.impuesto}</impuesto>
              <total>${datos.total}</total>
            </factura>`;
  }
}