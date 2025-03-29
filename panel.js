document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');

    const lblNombre = document.getElementById('lbl_Nombre');

    if (tipo === "fisica") {
        lblNombre.textContent = "Nombre Apellido";
    } else if (tipo === "moral") {
        lblNombre.textContent = "Empresa";
    }

});


//Se calcula el Impuesto al Valor Adquirido
document.getElementById("btn_calcular").addEventListener("click", () => {
    //Se obtienen los valores del subtotal
    const subtotalInput = document.getElementById("subtotal");
    const subtotal = parseFloat(subtotalInput.value);
    
    if (isNaN(subtotal)) {
        alert("Ingrese un subtotal válido");
        return;
    }

    //Operaciones
    const impuesto = subtotal * 0.16;
    const total = subtotal + impuesto;

    //Imprimir resultado
    document.getElementById("impuesto").value = impuesto.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
});

//Se genera factura
document.getElementById("btn_facturar").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get("tipo");
    const RFC = sessionStorage.getItem('rfc');

    // Validar campos requeridos
    const camposRequeridos = ["fecha-emision", "vendedor", "concepto", "subtotal"];
    for (const id of camposRequeridos) {
        if (!document.getElementById(id).value) {
            alert("Complete todos los campos requeridos");
            return;
        }
    }

    // Obtener datos del formulario
    const datosFactura = {
        fecha: document.getElementById("fecha-emision").value,
        vendedor: document.getElementById("vendedor").value,
        concepto: document.getElementById("concepto").value,
        subtotal: document.getElementById("subtotal").value,
        impuesto: document.getElementById("impuesto").value,
        total: document.getElementById("total").value
    };

    // Seleccionar generador según el formato
    const formato = document.getElementById("formato").value;
    let generador;
    switch (formato) {
        case "pdf": generador = new GeneradorPDF(); break;
        case "xml": generador = new GeneradorXML(); break;
        case "txt": generador = new GeneradorTxt(); break;
        default: alert("Formato no válido"); return;
    }

    // Crear factura según el tipo de contribuyente
    let factura;
    if (tipo === "fisica") {
        factura = new FacturaPersonaFisica(generador, RFC);
    } else {
        factura = new FacturaPersonaMoral(generador, RFC);
    }

    // Generar y descargar la factura
    const contenido = factura.generarFactura(datosFactura);
    const blob = new Blob([contenido], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `factura_${Date.now()}.${formato}`;
    a.click();
});