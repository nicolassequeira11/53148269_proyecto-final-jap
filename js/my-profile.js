const emailLogin = localStorage.getItem("usuario"); // Obtener el email con el que se loguea
const btnSave = document.getElementById("btnSaveProfile"); // Boton Guardar cambios
let imagenSeleccionada = "";

// Obtener inputs del perfil al momento del click
const profileFirstName = document.getElementById("profileFirstName");
const profileSecondName = document.getElementById("profileSecondName");
const profileFirstLastname = document.getElementById("profileFirstLastname");
const profileSecondLastname = document.getElementById("profileSecondLastname");
const profileTel = document.getElementById("profileTel");
const profileEmail = document.getElementById("profileEmail");

// Obtener datos del perfil del localStorage
const FirstName = localStorage.getItem("FirstName");
const SecondName = localStorage.getItem("SecondName");
const FirstLastname = localStorage.getItem("FirstLastName");
const SecondLastname = localStorage.getItem("SecondLastName");
const Tel = localStorage.getItem("Tel");
const imagenProfile = localStorage.getItem("profileImage");

// Obtener elemento HTML de la imagen del perfil
const imgProfile = document.getElementById("selectedProfileImage");

// Valores a mostrar cuando se cargue la página
document.addEventListener("DOMContentLoaded", () => {
  profileEmail.value = emailLogin;
  profileFirstName.value = FirstName;
  profileSecondName.value = SecondName;
  profileFirstLastname.value = FirstLastname;
  profileSecondLastname.value = SecondLastname;
  profileTel.value = Tel;

  // Si no existe el localStorage de la imagen no retorna nada
  if (!imagenProfile) {
    return null;
  } else {
    imgProfile.setAttribute("src", imagenProfile);
  }
});

// Eliminar imagen de perfil
document.getElementById("deleteImgProfile").addEventListener("click", () => {
  localStorage.removeItem("profileImage");
  location.reload();
});

// Validación del formulario con boostrap
(() => {
  'use strict';
  const profileForm = document.getElementById('profileForm');

  profileForm.addEventListener('submit', (e) => {
    if (!profileForm.checkValidity()) {
      e.preventDefault();
    }

    profileForm.classList.add('was-validated');
  }, false);
})();

// Función para previsualizar la foto seleccionada por el usuario
function seleccionarFotoPerfil() {
  const profileImageInput = document.getElementById("profileImageInput");
  const selectedProfileImage = document.getElementById("selectedProfileImage");

  profileImageInput.addEventListener("change", function () {
    const file = profileImageInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagenSeleccionada = e.target.result; // Guardar la imagen actual en una variable
        selectedProfileImage.src = imagenSeleccionada;
        selectedProfileImage.style.display = "block"; // Mostrar la imagen seleccionada
      }

      reader.readAsDataURL(file);
    }
  });
}

// Evento del botón 'Guardar cambios'
btnSave.addEventListener("click", (e) => {
  e.preventDefault();

  // Guardar valores en el localStorage
  localStorage.setItem("FirstName", profileFirstName.value);
  localStorage.setItem("SecondName", profileSecondName.value);
  localStorage.setItem("FirstLastName", profileFirstLastname.value);
  localStorage.setItem("SecondLastName", profileSecondLastname.value);
  localStorage.setItem("Tel", profileTel.value);
  localStorage.setItem("profileImage", imagenSeleccionada);
});