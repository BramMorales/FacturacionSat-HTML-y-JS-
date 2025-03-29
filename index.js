
function Enviar(event) {

    const RFC = document.getElementById('txt_rfc').value.trim().toUpperCase();
    const Pass = document.getElementById('txt_password').value;

    if (!RFC || !Pass) {
        alert("RFC y contraseña son obligatorios");
        return false;
    }

    let tipo;
    if (RFC.length === 13) {
        tipo = "fisica";
    } else if (RFC.length === 12) {
        tipo = "moral";
    } else {
        alert("RFC inválido");
        return false;
    }

    sessionStorage.setItem('rfc', RFC); 

    window.location.href = `panel.html?tipo=${tipo}`;
    return false;
}

