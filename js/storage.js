import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getStorage, ref, uploadBytes, listAll,getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCu-xGv-XYPRURgr663shm-0wVzym0_VXc",
    authDomain: "appsif-78ded.firebaseapp.com",
    projectId: "appsif-78ded",
    storageBucket: "appsif-78ded.firebasestorage.app",
    messagingSenderId: "946349392819",
    appId: "1:946349392819:web:09a04880e9aed24e40c1c6"
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


//
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// Esta parte del codigo corresponde a la lista desplegable utilizada para
// cargar las imagenes y la localizacion de cada uno de los proyectos
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

const dropdowns = document.querySelectorAll(".dropdown");

// Mapea el primer y segundo dropdown
const firstDropdown = dropdowns[0];
const secondDropdown = dropdowns[1];

// Obtiene elementos del primer dropdown
const firstSelect = firstDropdown.querySelector(".select");
const firstCaret = firstDropdown.querySelector(".caret");
const firstMenu = firstDropdown.querySelector(".menu");
const firstOptions = firstDropdown.querySelectorAll(".menu li");
const firstSelected = firstDropdown.querySelector(".selected");

// Obtiene elementos del segundo dropdown
const secondSelect = secondDropdown.querySelector(".select");
const secondCaret = secondDropdown.querySelector(".caret");
const secondMenu = secondDropdown.querySelector(".menu");
const secondSelected = secondDropdown.querySelector(".selected");

// Opciones dinámicas para el segundo menú
const opcionesImagen = ["Antes", "En ejecución", "Después"];
const opcionesLocalizacion = ["Localización"];

let sel;

// Función para actualizar las opciones del segundo menú y resetear la selección
const actualizarSegundoMenu = (opciones) => {
    secondMenu.innerHTML = ""; // Limpia las opciones anteriores

    opciones.forEach((opcion, index) => {
        const li = document.createElement("li");
        li.textContent = opcion;
        
        // Si es la primera opción, la marcamos como activa
        if (index === 0) {
            li.classList.add("activa");
            secondSelected.innerText = opcion; // Se actualiza el texto seleccionado
        }

        li.addEventListener("click", () => {
            secondSelected.innerText = opcion;
            secondSelect.classList.remove("select-clicked");
            secondCaret.classList.remove("caret-rotate");
            secondMenu.classList.remove("menu-open");

            // Remueve la clase activa de todas las opciones y la agrega a la seleccionada
            secondMenu.querySelectorAll("li").forEach(li => li.classList.remove("activa"));
            li.classList.add("activa");
            sel = opcion;
            
        });

        secondMenu.appendChild(li);
    });
};




// Evento para el primer menú
firstSelect.addEventListener("click", () => {
    firstSelect.classList.toggle("select-clicked");
    firstCaret.classList.toggle("caret-rotate");
    firstMenu.classList.toggle("menu-open");
});

let dropuno;

// Evento para cambiar las opciones del segundo menú según la selección en el primero
firstOptions.forEach(option => {
    option.addEventListener("click", () => {
        firstSelected.innerText = option.innerText;
        firstSelect.classList.remove("select-clicked");
        firstCaret.classList.remove("caret-rotate");
        firstMenu.classList.remove("menu-open");

        // Remueve la clase activa de todas las opciones y la agrega a la seleccionada
        firstMenu.querySelectorAll("li").forEach(li => li.classList.remove("activa"));
        option.classList.add("activa");
        
        dropuno = option.innerText
        // Cambia las opciones del segundo menú según la selección
        if (option.innerText === "Imagen") {
            actualizarSegundoMenu(opcionesImagen);
        } else {
            actualizarSegundoMenu(opcionesLocalizacion);
        }
        
    });
});


// Evento para el segundo menú
secondSelect.addEventListener("click", () => {
    secondSelect.classList.toggle("select-clicked");
    secondCaret.classList.toggle("caret-rotate");
    secondMenu.classList.toggle("menu-open");
});

// Inicializa el segundo menú con las opciones por defecto
actualizarSegundoMenu(opcionesImagen);

// Cerrar los dropdowns si se hace clic fuera de ellos
document.addEventListener("click", (event) => {
    if (!firstDropdown.contains(event.target)) {
        firstSelect.classList.remove("select-clicked");
        firstCaret.classList.remove("caret-rotate");
        firstMenu.classList.remove("menu-open");
    }
    if (!secondDropdown.contains(event.target)) {
        secondSelect.classList.remove("select-clicked");
        secondCaret.classList.remove("caret-rotate");
        secondMenu.classList.remove("menu-open");
    }
    
});

// Cerrar los dropdowns si se presiona la tecla "Esc"
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        firstSelect.classList.remove("select-clicked");
        firstCaret.classList.remove("caret-rotate");
        firstMenu.classList.remove("menu-open");

        secondSelect.classList.remove("select-clicked");
        secondCaret.classList.remove("caret-rotate");
        secondMenu.classList.remove("menu-open");
        
    }
});
const resetearInputFile = () => {
    const fileInput = document.getElementById("fileInput");
    const fileNameLabel = document.getElementById("fileName");

    // Reinicia el valor del input file
    fileInput.value = ""; 

    // Restablece el texto del label
    fileNameLabel.innerText = "¡Archivo subido con éxito! ¿Desea seleccionar otro?";
};

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// cargar archivos
// storage
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// Obtener referencia al botón y al input de archivo
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const NContrato = document.getElementById('Contrato');
const fileNameLabel = document.getElementById("fileName");


let valSelect; // Declaramos la variable

uploadButton.addEventListener('click', () => {
    const contrato = NContrato.value;
    
    // Determinar el valor de 'valSelect'
    if (dropuno === "Localización" || sel === "Localización") {
        valSelect = "Localización";  
    } else {
        if (sel === undefined) {
            valSelect = "Antes"; 
        } else {
            valSelect = sel; 
        }  
    }

    const files = fileInput.files; // Obtener todos los archivos seleccionados

    if (files.length > 0) {
        // Iterar sobre los archivos seleccionados
        Array.from(files).forEach((file) => {
            // Crear una referencia al archivo en Firebase Storage
            const fileRef = ref(storage, `contratos/${contrato}/${valSelect}/${file.name}`);

            // Subir el archivo a Firebase Storage
            uploadBytes(fileRef, file).then((snapshot) => {
                
            }).catch((error) => {
                console.error('Error al subir el archivo:', error);
            });
        });

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Archivos cargados con éxito",
            showConfirmButton: false,
            timer: 1500
          });

        setTimeout(() => {
            obtenerArchivos(contrato); // Llamar a la función después de 3 segundos
        }, 3000);

    } else {
        Swal.fire("No has seleccionado ningun archivo.");
    }

    resetearInputFile();
});


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// mostrar erchivos en tabla
//
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// Importar funciones necesarias desde Firebase SDK
// Función para obtener archivos dentro de un contrato y sus subcarpetas
window.obtenerArchivos = function (contractNumber) {
    
    const folderRef = ref(storage, `contratos/${contractNumber}`);
    listAll(folderRef).then(async (res) => {
        const tablaContenido = document.getElementById('tablaContenido');
        tablaContenido.innerHTML = ''; // Limpiar la tabla antes de llenarla

        // Procesar archivos en la carpeta principal
        res.items.forEach((itemRef) => {
            agregarFilaArchivo(itemRef, contractNumber); 
        });

        // Procesar subcarpetas
        for (const carpetaRef of res.prefixes) {
            await obtenerArchivosDesdeSubcarpeta(carpetaRef, contractNumber);
        }
    }).catch((error) => {
        console.error('Error al obtener archivos:', error);
    });
}

// Función para obtener archivos dentro de una subcarpeta
async function obtenerArchivosDesdeSubcarpeta(carpetaRef, contractNumber) {
    try {
        const res = await listAll(carpetaRef);
        res.items.forEach((itemRef) => {
            agregarFilaArchivo(itemRef, contractNumber, carpetaRef.fullPath);
        });
    } catch (error) {
        console.error(`Error al obtener archivos de la subcarpeta ${carpetaRef.fullPath}:`, error);
    }
}

// Función para agregar una fila con los botones "Ver" y "Eliminar"
function agregarFilaArchivo(itemRef, contractNumber, subcarpeta = '') {
    const tablaContenido = document.getElementById('tablaContenido');

    // Obtener el nombre del archivo y su tipo
    const nombreArchivo = itemRef.name;
    const tipoArchivo = nombreArchivo.split('.').pop().toLowerCase(); 
    const estado = obtenerEstado(nombreArchivo); 

    // Crear fila
    const tr = document.createElement('tr');

    // Tipo de archivo
    const tipoTd = document.createElement('td');
    tipoTd.textContent = tipoArchivo.toUpperCase();
    tr.appendChild(tipoTd);

    // Ubicación (Subcarpeta o "Principal")
    const ubicacionTd = document.createElement('td');
    ubicacionTd.textContent = subcarpeta ? subcarpeta.replace(`contratos/${contractNumber}/`, '') : "Principal";
    tr.appendChild(ubicacionTd);

    // Botón "Ver"
    const verTd = document.createElement('td');
    const verBtn = document.createElement('button');
    verBtn.innerHTML = '<i class="fa-regular fa-image"></i>'; // Ícono de ver
    verBtn.classList.add('btn-ver', 'icono-ver'); // Clases personalizadas
    verBtn.addEventListener('click', () => verArchivo(itemRef));
    verTd.appendChild(verBtn);
    tr.appendChild(verTd);
    
    // Botón "Eliminar"
    const eliminarTd = document.createElement('td');
    const eliminarBtn = document.createElement('button');
    eliminarBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'; // Ícono de eliminar
    eliminarBtn.classList.add('btn-eliminar', 'icono-eliminar'); // Clases personalizadas
    eliminarBtn.addEventListener('click', () => eliminarArchivo(itemRef, tr));
    eliminarTd.appendChild(eliminarBtn);
    tr.appendChild(eliminarTd);

    // Agregar la fila a la tabla
    tablaContenido.appendChild(tr);
}

// Función para ver el archivo en una nueva pestaña
function verArchivo(itemRef) {
    getDownloadURL(itemRef).then((url) => {
        const nombreArchivo = itemRef.name;
        const tipoArchivo = nombreArchivo.split('.').pop().toLowerCase();

        if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(tipoArchivo)) {
            // Si es una imagen, mostrarla en SweetAlert2 con tamaño fijo para la imagen
            Swal.fire({
                title: nombreArchivo,
                imageUrl: url,
                imageAlt: "Vista previa",
                imageWidth: 400, // Ajusta el tamaño de la imagen
                imageHeight: 300, // Ajusta el tamaño de la imagen
                showCloseButton: true,
                confirmButtonText: "Cerrar"
            });
        } else {
            // Si no es una imagen, abrir en otra ventana
            window.open(url, "_blank");
        }
    }).catch((error) => {
        console.error("Error al obtener la URL del archivo:", error);
        Swal.fire({
            title: "Error",
            text: "No se pudo abrir el archivo.",
            icon: "error"
        });
    });
}


// Función para eliminar un archivo de Firebase Storage
function eliminarArchivo(itemRef, fila) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: `No podrás revertir esta acción. Se eliminará el archivo: "${itemRef.name}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteObject(itemRef).then(() => {
                Swal.fire({
                    title: "¡Eliminado!",
                    text: `El archivo "${itemRef.name}" ha sido eliminado correctamente.`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                });
                fila.remove(); // Elimina la fila de la tabla
            }).catch((error) => {
                console.error("Error al eliminar el archivo:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el archivo.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            });
        }
    });
}


// Función para obtener el estado del archivo si el nombre lo indica
function obtenerEstado(nombreArchivo) {
    const partes = nombreArchivo.split('_');
    return partes[0]; 
}
