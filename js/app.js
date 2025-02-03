
const firebaseConfig = {
    apiKey: "AIzaSyCu-xGv-XYPRURgr663shm-0wVzym0_VXc",
    authDomain: "appsif-78ded.firebaseapp.com",
    projectId: "appsif-78ded",
    storageBucket: "appsif-78ded.firebasestorage.app",
    messagingSenderId: "946349392819",
    appId: "1:946349392819:web:09a04880e9aed24e40c1c6"
};


// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

var tabla = document.getElementById("cuerpo-tabla");
var inputText = ""; 



email = "vtobonlopez@gmail.com"
password = "123456"
/*
function iniciarSesion(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // El usuario inició sesión correctamente
            const user = userCredential.user; // Datos del usuario autenticado
            console.log("Usuario autenticado:", user.email);

            // Llamar a la función para consultar contratos después de autenticar
            consultarContratos(user.uid);
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error.message);
            alert("Error: " + error.message); // Mostrar el error al usuario
        });
}
*/

firebase.auth().signInWithEmailAndPassword(usuario, password)
  .then((userCredential) => {
    // Autenticación exitosa, cambiar visibilidad de los elementos
    alert("ok")

    // cargarContratos(); // Descomentar si necesitas cargar contratos después de autenticarse
  })
  .catch((error) => {
    // Si ocurre un error, mostrar mensaje en el DOM
    alert("Noooo")
});




/*
var tabla = document.getElementById("cuerpo-tabla");

db.collection("contratos")
    .where("dependencia", "==", "Dirección Proyectos Especiales")
    .get()
    .then((querySnapshot) => {
        tabla.innerHTML = ""; // Limpia la tabla antes de agregar filas
        querySnapshot.forEach((doc) => {
            const data = doc.data(); // Obtén los datos del documento

            const row = document.createElement('tr'); // Crea una nueva fila
            row.innerHTML = `
                <td>${data.contrato}</td>
                <td>${data.dependencia}</td>
                <td>${data.municipio}</td>
                <td>${data.objeto}</td>
                <td><button class="boton-tabla" disabled onclick="eliminar('${doc.id}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button></td>
                <td><button class="boton-tabla-edit" onclick="editar('${doc.id}')">
                    <i class="fa-solid fa-pencil"></i>
                </button></td>
            `;

            tabla.appendChild(row); // Agrega la fila al cuerpo de la tabla

        });
});

*/

