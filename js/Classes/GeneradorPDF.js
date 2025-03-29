class GeneradorPDF extends InterfazGeneradorArchivo {
  generar(datos) {
      return new Promise((resolve, reject) => {
          const docDefinition = {
              content: [
                  { text: 'FACTURA ELECTRÓNICA', style: 'header' },
                  { text: `RFC: ${datos.rfc}` },
                  { text: `Tipo: ${datos.tipo}`, style: 'subheader' },
                  { text: `Fecha: ${datos.fecha}` },
                  { text: `Vendedor: ${datos.vendedor}` },
                  { text: `Concepto: ${datos.concepto}` },
                  { text: 'Detalles Financieros:', style: 'subheader' },
                  {
                      table: {
                          widths: ['*', '*', '*'],
                          body: [
                              ['Subtotal', 'Impuesto (16%)', 'Total'],
                              [
                                  `$${datos.subtotal}`,
                                  `$${datos.impuesto}`,
                                  `$${datos.total}`
                              ]
                          ]
                      }
                  }
              ],
              styles: {
                  header: {
                      fontSize: 18,
                      bold: true,
                      margin: [0, 0, 0, 10]
                  },
                  subheader: {
                      fontSize: 14,
                      bold: true,
                      margin: [0, 10, 0, 5]
                  }
              }
          };

          pdfMake.createPdf(docDefinition).download(`factura_${Date.now()}.pdf`, () => {
              resolve(true);
          });
      });
  }
}