class GeneradorTxt extends InterfazGeneradorArchivo {
  generar(datos) {
      return `=============================================
        FACTURA ELECTRÓNICA - SAT
=============================================

RFC:                   ${datos.rfc}  
Tipo de Contribuyente: ${datos.tipo}
Fecha de Emisión:      ${datos.fecha}
---------------------------------------------
Vendedor:              ${datos.vendedor}
Concepto:              ${datos.concepto}
---------------------------------------------
Subtotal:              $${datos.subtotal}
Impuesto (16%):        $${datos.impuesto}
Total:                 $${datos.total}
=============================================`;
  }
}