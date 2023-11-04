const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMensaje = document.getElementById("error-mensaje");

formulario.addEventListener("submit", function (e) {
    let valid = true;

    if (nombre.value.trim() === "") {
        errorNombre.textContent = "Por favor, ingrese su nombre.";
        valid = false;
    } else {
        errorNombre.textContent = "";
    }

    if (email.value.trim() === "" || !isValidEmail(email.value)) {
        errorEmail.textContent = "Por favor, ingrese un correo electrónico válido.";
        valid = false;
    } else {
        errorEmail.textContent = "";
    }

    if (mensaje.value.trim() === "") {
        errorMensaje.textContent = "Por favor, ingrese un mensaje.";
        valid = false;
    } else {
        errorMensaje.textContent = "";
    }

    if (!valid) {
        e.preventDefault();
    }
});

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

document.addEventListener("DOMContentLoaded", function() {
    const abrirModalBtn = document.getElementById("abrirModal");
    
    abrirModalBtn.addEventListener("click", function() {
        $('#miModal').modal('show');
    });
});
