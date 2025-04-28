//Se capturan los datos de la URL, para poder determinar el tipo de persona fiscal que es el usuario.
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


//Se calcula el Impuesto al Valor Adquirido y el total de la compra.
document.getElementById("btn_calcular").addEventListener("click", () => {
    //Se obtienen los valores del subtotal.
    const subtotalInput = document.getElementById("subtotal");
    const subtotal = parseFloat(subtotalInput.value);
    
    if (isNaN(subtotal)) {
        alert("Ingrese un subtotal válido");
        return;
    }

    //Operaciones.
    const impuesto = subtotal * 0.16;
    const total = subtotal + impuesto;

    //Imprimir resultado.
    document.getElementById("impuesto").value = impuesto.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
});

// Se convierte Base64 a ArrayBuffer.
function base64ToArrayBuffer(base64) {
    let cleaned = base64.replace(/^[^,]+,/, '').replace(/\s+/g, '');
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(cleaned)) {
      throw new Error('Cadena no es Base64 válida');
    }
    const binary = atob(cleaned);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

//Se genera factura electronica.
  document.getElementById("btn_facturar").addEventListener("click", async () => {
    //Se invoca al patrón Fachada para generar una factura.
    const sistema = new SistemaFacturacion();

    //Se capturan los datos de la factura.
    const rfc = sessionStorage.getItem('rfc');
    const datos = {
      rfc,
      fecha: document.getElementById("fecha-emision").value,
      vendedor: document.getElementById("vendedor").value,
      concepto: document.getElementById("concepto").value,
      subtotal: document.getElementById("subtotal").value,
      impuesto: document.getElementById("impuesto").value,
      total: document.getElementById("total").value
    };
    const formato = document.getElementById("formato").value.toLowerCase();
    const incluirFirma = document.getElementById("incluir-firma").checked;
    const incluirQR = document.getElementById("incluir-qr").checked;
  
    // Se genera la factura utilizando un await para poder manipular el resultado.
    try {
      const resultado = await sistema.generarFactura(rfc, datos, formato, {
        conFirma: incluirFirma,
        conQR: incluirQR
      });
  
      // Se obtiene el contenido como string.
      const contenido = await resultado.contenido;
      let blob;
  
      // Se decodifica el string, en caso de que sea PDF, para que el archivo no resulte corrupto.
      if (formato === "pdf") {

        // Se limpian prefijos y espacios.
        let b64 = contenido.replace(/^[^,]+,/, "").replace(/\s+/g, "");

        // Se transforma
        const binary = atob(b64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
        blob = new Blob([bytes.buffer], { type: "application/pdf" });
  
      } else {

        // Se mantiene como texto plano para los formatos XML y TXT.
        blob = new Blob([contenido], { type: resultado.mimeType });
      }
  
      // Se realiza la descarga.
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resultado.nombreArchivo;
      a.click();
  
    } catch (err) {
      console.error(err);
      alert(`Error al descargar factura: ${err.message}`);
    }
  });
  
// Botón para limpiar los campos.
  document.getElementById("btn_nuevo").addEventListener("click", async () => {
    document.getElementById("fecha-emision").value = ""
    document.getElementById("vendedor").value = ""
    document.getElementById("concepto").value = ""
    document.getElementById("subtotal").value = ""
    document.getElementById("impuesto").value = ""
    document.getElementById("total").value = ""
    document.getElementById("formato").value = "PDF";
    document.getElementById("incluir-firma").checked = false;
    document.getElementById("incluir-qr").checked = false;
});

// Botón para regresar al inicio de sesión.
document.getElementById("btn_salir").addEventListener("click", async () => {
    window.location.href = "./index.html";
});