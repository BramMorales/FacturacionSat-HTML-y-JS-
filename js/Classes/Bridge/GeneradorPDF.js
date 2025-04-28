class GeneradorPDF extends InterfazGeneradorArchivo {
    generar(datos) {
        const content = [
            { text: 'FACTURA ELECTRÓNICA', style: 'header' },
            { text: `RFC: ${datos.rfc}` },
            { text: `Tipo: ${datos.tipo}`, style: 'subheader' },
            { text: `Fecha: ${datos.fecha}` }
        ];
        
        content.push(
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
        );
        
        // Se añade sección de firma digital, si está presente.
        if (datos.firmaDigital) {
            content.push(
                { text: 'Firma Digital:', style: 'subheader', margin: [0, 15, 0, 5] },
                { text: `Certificado: ${datos.certificado}` },
                { text: `Firma: ${datos.firmaDigital}` }
            );
        }
        
        // Se añade código QR, si está presente.
        if (datos.qrData) {
            content.push(
                { text: 'Código QR:', style: 'subheader', margin: [0, 15, 0, 5] },
                {
                    qr: datos.qrData,
                    fit: 120,
                    margin: [0, 10, 0, 10]
                }
            );
        }
        
        const docDefinition = {
            content: content,
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

        return new Promise((resolve) => {
            pdfMake.createPdf(docDefinition).getBase64((data) => {
                resolve(data);
            });
        });
    }
    
    obtenerMimeType() {
        return "application/pdf";
    }
    
    obtenerExtensionArchivo() {
        return "pdf";
    }
}
