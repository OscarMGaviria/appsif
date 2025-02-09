// auth.js
// Importar las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

import { ref, uploadBytesResumable, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

// Ahora puedes usar las funciones relacionadas con la autenticación
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


import { getFirestore, collection, query, where, onSnapshot, addDoc, doc, deleteDoc, getDoc, getDocs,updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// 🔹 Configuración de Firebase (REEMPLAZA CON TUS CREDENCIALES)
const firebaseConfig = {
  apiKey: "AIzaSyCu-xGv-XYPRURgr663shm-0wVzym0_VXc",
  authDomain: "appsif-78ded.firebaseapp.com",
  projectId: "appsif-78ded",
  storageBucket: "appsif-78ded.firebasestorage.app",
  messagingSenderId: "946349392819",
  appId: "1:946349392819:web:09a04880e9aed24e40c1c6"
};

// 🔹 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
// Obtener la instancia de autenticación

const auth = getAuth(app); // Inicia la autenticación
// Agregar el evento de click al botón
document.getElementById('btn-login').addEventListener('click', autenticar);


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

// Función de autenticación
function autenticar(event) {
  event.preventDefault(); 

  // Obtener los valores del formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Iniciar sesión con el correo y la contraseña
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      
      // Consulta en Firestore para encontrar el usuario con el correo especificado
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const name = doc.data().name;          // Obtener el nombre
              const dependencia = doc.data().dependencia;  // Obtener la dependencia

              // Actualizar los elementos HTML con los valores obtenidos
              document.getElementById("name_user").textContent = name;
              document.getElementById("user_dependecia").textContent = dependencia;

              // Mostrar alerta de éxito
              Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: `Has iniciado sesión correctamente como ${name}.`,
                timer: 1500,
                showConfirmButton: false, 
              });
              document.getElementById("section-login").style.display = "none";
              document.getElementById("encabezado").style.display = "block";
              document.getElementById("tabla-contratos").style.display = "block";

              cargarContratos(dependencia);
            });
          } else {
            // Si no se encuentra el usuario con ese correo
            document.getElementById("name_user").textContent = "Error";
            document.getElementById("user_dependecia").textContent = "Error";

            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'No se encontró un usuario con ese correo electrónico.',
              confirmButtonText: 'Aceptar'
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de consulta',
            text: 'Hubo un problema al obtener los datos del usuario.',
            confirmButtonText: 'Aceptar'
          });
        });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: '¡Error de autenticación!',
        text: 'No se pudo autenticar el usuario. Verifica el correo y la contraseña.',
        confirmButtonText: 'Aceptar'
      });
    });
}




//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

// Escucha el cambio en el estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Si hay un usuario autenticado
    //console.log("Usuario autenticado:", user.email);  // Imprime el correo del usuario activo
    // Puedes acceder a más información del usuario como:
    // user.displayName
    // user.uid
    // user.email
    // user.photoURL
  } else {
    // Si no hay usuario autenticado
    //console.log("No hay usuario autenticado");
  }
});

// Seleccionamos el div con el ID 'miDiv'
const miDiv = document.getElementById('close-contenedor');

// Agregamos un 'eventListener' para escuchar el evento de clic
miDiv.addEventListener('click', function() {
  cerrarSesion();
  location.reload();
});


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// Función para cerrar sesión
function cerrarSesion() {
  signOut(auth) // auth es la instancia de autenticación de Firebase
    .then(() => {
    
      // Redirigir o mostrar un mensaje si es necesario
    })
    .catch((error) => {
      
    });
}

// Evento para cerrar sesión cuando se recarga la página
window.onload = function() {
  cerrarSesion(); // Cierra la sesión cuando la página se recarga
};







//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

const tabla = document.getElementById("cuerpo-tabla");

// Función para cargar los contratos, con dependencia como argumento
async function cargarContratos(dependencia) {
  try {
    // Verificar si la dependencia es "admin" para cargar todos los contratos
    let q;
    if (dependencia === "admin") {
      q = query(collection(db, "contratos")); // Consulta para todos los contratos si es "admin"
    } else {
      q = query(collection(db, "contratos"), where("dependencia", "==", dependencia)); // Filtrar por dependencia
    }

    // Usar onSnapshot para escuchar cambios en la base de datos en tiempo real
    onSnapshot(q, (querySnapshot) => {
      tabla.innerHTML = ""; // Limpiar la tabla antes de agregar filas
      // Contar el número de contratos encontrados
      const numeroContratos = querySnapshot.size;
      //console.log("Número de contratos encontrados: " + numeroContratos);

      // Mostrar el número de contratos en algún lugar (opcional)
      document.getElementById("cantidad-resultados").textContent = numeroContratos;
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const row = document.createElement("tr");
        // Si el usuario es admin, permite eliminar, si no, no se muestra el botón de eliminar
        const eliminarBtn = dependencia === "admin" ? `
        <td><button class="boton-tabla eliminar-btn" data-id="${doc.id}">
            <i class="fa-solid fa-trash"></i>
        </button></td>
        ` : `<td><button class="boton-tabla eliminar-btn" data-id="${doc.id}" disabled>
            <i class="fa-solid fa-trash"></i>
        </button></td>`; // Si no es admin, no muestra el botón de eliminar

        row.innerHTML = `
        <td>${data.contrato}</td>
        <td>${data.dependencia}</td>
        <td>${data.municipio}</td>
        <td>${data.objeto}</td>
        ${eliminarBtn}
        <td><button class="boton-tabla-edit editar-btn" data-id="${doc.id}">
            <i class="fa-solid fa-pencil"></i>
        </button></td>
        `;
        tabla.appendChild(row);
      });
    });
  } catch (error) {
    console.error("Error obteniendo los contratos:", error);
  }
}


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

// Función para eliminar las tildes y otros caracteres especiales
function quitarTildes(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normaliza y elimina los acentos
}


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

// Función para filtrar los contratos en la tabla por contrato, municipio, dependencia y objeto
function filtrarContratos() {
  const filtro = quitarTildes(document.getElementById('filtro-contrato').value.toLowerCase()); // Obtener el texto de búsqueda y pasarlo a minúsculas
  const filas = document.querySelectorAll('#cuerpo-tabla tr'); // Obtener todas las filas de la tabla

  let contratosEncontrados = 0; // Contador para los contratos encontrados

  filas.forEach((fila) => {
    const celdas = fila.getElementsByTagName('td'); // Obtener todas las celdas de la fila
    let mostrarFila = false; // Variable para determinar si la fila debe mostrarse

    // Recorremos las celdas relevantes (Contrato, Dependencia, Municipio, Objeto)
    const contrato = quitarTildes(celdas[0].textContent.toLowerCase());  // Contrato
    const dependencia = quitarTildes(celdas[1].textContent.toLowerCase()); // Dependencia
    const municipio = quitarTildes(celdas[2].textContent.toLowerCase()); // Municipio
    const objeto = quitarTildes(celdas[3].textContent.toLowerCase()); // Objeto

    // Comprobamos si el filtro está contenido en alguna de estas celdas
    if (contrato.includes(filtro) || dependencia.includes(filtro) || municipio.includes(filtro) || objeto.includes(filtro)) {
      mostrarFila = true; // Si alguna celda coincide, mostramos la fila
    }

    if (mostrarFila) {
      fila.style.display = ''; // Mostrar la fila si coincide con el filtro
      contratosEncontrados++;
    } else {
      fila.style.display = 'none'; // Ocultar la fila si no coincide con el filtro
    }
  });

  // Actualizar el contador de contratos encontrados
  document.getElementById("cantidad-resultados").textContent = contratosEncontrados;
}

// Llamar a la función de filtro cada vez que se escriba algo en el campo de búsqueda
document.getElementById('filtro-contrato').addEventListener('input', filtrarContratos);


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const botonGuardar = document.getElementById("guardar-btn");

  if (botonGuardar) {
    botonGuardar.onclick = guardarDatos;
  }
});



//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

async function guardarDatos() {

  try {
    var valores = value_mupio.getValue()
    var indca = value_indicador.getValue()
    var fnaciacion = value_fuenteFinanciacion.getValue()
    var imp = value_impactos.getValue()
    // Valores de campos simples
    var contrato = document.getElementById("Contrato").value.trim(); // Elimina espacios en blanco
    var estado_cto = document.getElementById("estado-contrato").value || '';
    var objeto = document.getElementById("Objeto").value || '';

    // Verificación previa para evitar duplicados
    const contratosRef = collection(db, "contratos");
    const consulta = query(contratosRef, where("contrato", "==", contrato));
    const querySnapshot = await getDocs(consulta);
    
    if (!querySnapshot.empty) {
      
      Swal.fire({
        icon: 'warning',
        title: '¡Advertencia!',
        text: 'El número de contrato ya existe en la base de datos. No se guardará.',
        confirmButtonText: 'Cerrar',
        timer: 1000
      });
      return;
    }
    
    // Valor del select múltiple para municipios
    var municipio = valores.length > 0 ? valores.join(', ') : '';
    var subregion = document.getElementById("subregion").value || '';
    var vigencia = document.getElementById("vigencia").value || '';



    // Otros valores
    var contratista = document.getElementById("contratista").value || '';
    var interventoria = document.getElementById("interventoria").value || '';
    var unidad = document.getElementById("Unidad").value || '';
    var fecha_inicio = document.getElementById("Fecha_inicio").value || '';
    var fecha_termina = document.getElementById("Fecha_termina").value || '';
    var fecha_actualizacion = document.getElementById("Fecha_actualizacion").value || '';
    var indicadores = indca.length > 0 ? indca.join(', ') : '';
    //------------------------------------------------------------------------------
    // Fuente de Financiación
    var tipo_proyecto = document.getElementById("tipo-proy").value; 
    var fuente_financiacion = fnaciacion.length > 0 ? fnaciacion.join(', ') : '';
    var aporte_dto = parseFloat(document.getElementById("Aporte_dto").value) || 0;
    var aporte_mpio = parseFloat(document.getElementById("Aporte_mpio").value) || 0;
    var aporte_total = parseFloat(document.getElementById("Aporte_total").value) || 0;
    var percen_dtop = document.getElementById("Aporte_dto_percent").value || 0;
    var percen_mpio = document.getElementById("Aporte_mpio_percent").value || 0;

    //------------------------------------------------------------------------------
    // avances
    var meta = document.getElementById("meta").value || 0;
    var avance_meta = document.getElementById("avance-meta").value || 0;
    var desembolso = document.getElementById("desembolsos").value || 0;
    var avance_fisico = parseFloat(document.getElementById("avance_fisico").value) || 0;
    var avance_financiero = parseFloat(document.getElementById("avance_financiero").value) || 0;

    //------------------------------------------------------------------------------
    // Supervision
    var dependencia = document.getElementById("dependencia").value || '';
    var supervisor = document.getElementById("supervisor").value || '';
    var observacion = document.getElementById("observaciones").value;
    var img = document.getElementById("file_img").value || 0; 

   
    //------------------------------------------------------------------------------
    // Impactos
    var impacto = imp.length > 0 ? imp.join(', ') : '';
    var imp_amb = document.getElementById("imp-ambiental").value || '';
    var imp_social = document.getElementById("imp-social").value || '';
    var imp_predial = document.getElementById("imp-predial").value || '';

    // Guardar en la base de datos
    const docRef = await addDoc(contratosRef, {
      contrato: contrato,
      estado_cto: estado_cto,
      objeto: objeto,
      municipio: municipio,
      subregion:subregion,
      contratista: contratista,
      interventoria: interventoria,
      unidad: unidad,
      vigencia:vigencia,
      fecha_inicio: fecha_inicio,
      fecha_actualizacion: fecha_actualizacion,
      fecha_termina: fecha_termina,
      indicadores:indicadores,

      
      tipo_proyecto:tipo_proyecto,
      financiacion: fuente_financiacion,
      aporte_dto: aporte_dto,
      aporte_mpio: aporte_mpio,
      aporte_total: aporte_total,
      percen_dtop:percen_dtop,
      percen_mpio:percen_mpio,


      meta:meta,
      avance_meta:avance_meta,
      desembolso:desembolso,
      avance_fisico: avance_fisico,
      avance_financiero: avance_financiero,


      dependencia: dependencia,
      supervisor: supervisor,
      observacion: observacion,
      img:img,


      impacto: impacto,
      imp_amb: imp_amb,
      imp_social: imp_social,
      imp_predial: imp_predial
    });
    
    // Confirmación de guardado exitoso
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'El contrato se ha guardado exitosamente.',
      confirmButtonText: 'Aceptar',
      timer: 1000
    });
    cerrarModal();

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Hubo un problema al guardar el contrato. Intenta de nuevo.',
      confirmButtonText: 'Cerrar'
    });
  }
}



//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// Función para eliminar un documento -----------------------------------------------------------------------------------------------------------

// Event delegation para botones de eliminar y editar
const cuerpoTabla = document.getElementById("cuerpo-tabla");
cuerpoTabla.addEventListener("click", async (event) => {
  const target = event.target.closest("button"); // Capturar el botón clickeado

  if (!target) return; // Si no es un botón, salir

  const id = target.getAttribute("data-id"); // Obtener ID del contrato
  if (target.classList.contains("eliminar-btn")) {
    await eliminar(id);
  } else if (target.classList.contains("editar-btn")) {
    
    loadModal(id);
  }
});


export async function eliminar(id) {
  try {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    });

    if (!result.isConfirmed) return;

    await deleteDoc(doc(db, "contratos", id));

    await Swal.fire({
      title: "Eliminado!",
      text: "El contrato ha sido eliminado.",
      icon: "success"
    });
    
    // Opcional: Recargar la página para actualizar la tabla
    // window.location.reload();
  } catch (error) {
    console.error("Error al eliminar el contrato:", error);
    await Swal.fire({
      title: "Error!",
      text: "No se pudo eliminar el contrato.",
      icon: "error"
    });
  }
}


//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
const botonAbrirFormulario = document.getElementById('abrirregistro');
// Agregamos el manejador de eventos 'click'
botonAbrirFormulario.addEventListener('click', abrirformulario);

function mostrarformulario() {
  initTomSelect();
  limpiar_modal();
  document.getElementById('seccion-modal').classList.add('activo');
  document.getElementById('tabla-contratos').style.display = 'block';
  document.getElementById('seccion-modal').style.display = 'block'; 
  all_panel[0].classList.add('active');
  tabs[0].classList.add('active'); 
  var line = document.querySelector(".line");
  line.style.left = 0 + "px";

}



function abrirformulario() {
  initTomSelect();
  limpiar_modal();
  document.getElementById('seccion-modal').classList.add('activo');
  document.getElementById('tabla-contratos').style.display = 'block';
  document.getElementById('seccion-modal').style.display = 'block'; 
  all_panel[0].classList.add('active');
  tabs[0].classList.add('active'); 
  var line = document.querySelector(".line");
  line.style.left = 0 + "px";
  var boton = document.getElementById("guardar-btn");
  boton.innerHTML = "Guardar";

  boton.onclick = function(){guardarDatos()};
}

let value_mupio;
let value_unidad;
let value_estadoContrato;
let value_tipoProy;
let value_indicador;
let value_fuenteFinanciacion;
let value_impactos;
let value_dependencia;
let value_subregion;

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
function initTomSelect() {
  // Verificar si la instancia de 'value_mupio' ya ha sido creada
  if (value_mupio === undefined) {
      value_mupio = new TomSelect("#municipioSelect", {
          maxItems: 125,
          onChange: function(values) {
              // Aquí solo procesas los valores seleccionados
          }
      });
  }
  if (value_dependencia === undefined) {
    value_dependencia = new TomSelect("#dependencia",{
        create: false,
        sortField: {
          field: "text",
          direction: "asc"
        }
    });
  }
  // Inicializar 'Unidad' solo si no está ya creado
  if (value_unidad === undefined) {
      value_unidad = new TomSelect("#Unidad", {
          create: true,
          sortField: {
              field: "text",
              direction: "asc"
          }
      });
  }

  // Inicializar 'Estado Contrato' solo si no está ya creado
  if (value_estadoContrato === undefined) {
      value_estadoContrato = new TomSelect("#estado-contrato", {
          create: false,
          sortField: {
              field: "text",
              direction: "asc"
          }
      });
  }

  // Inicializar 'Tipo Proyecto' solo si no está ya creado
  if (value_tipoProy === undefined) {
      value_tipoProy = new TomSelect("#tipo-proy", {
          create: false,
          sortField: {
              field: "text",
              direction: "asc"
          }
      });
  }

  if (value_subregion === undefined) {
    value_subregion = new TomSelect("#subregion", {
        create: false,
        sortField: {
            field: "text",
            direction: "asc"
        }
    });
  }



  // Inicializar 'Indicador' solo si no está ya creado
  if (value_indicador === undefined) {
      value_indicador = new TomSelect("#Indicador", {
          maxItems: 3
      });
  }

  // Inicializar 'Fuente Financiación' solo si no está ya creado
  if (value_fuenteFinanciacion === undefined) {
      value_fuenteFinanciacion = new TomSelect("#fuente-financiacion", {
          maxItems: 3
      });
  }

  // Inicializar 'Impactos' solo si no está ya creado
  if (value_impactos === undefined) {
      value_impactos = new TomSelect("#impactos", {
          maxItems: 3
      });
  }
}


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

export async function loadModal(id) {
  const contrato_id = doc(db, "contratos", id);

  const contratoDoc = await getDoc(contrato_id);
  initTomSelect();
  limpiar_modal();
  


  if (contratoDoc.exists()) {
    const datosContrato = contratoDoc.data();
    mostrarformulario();
   
    
    
    // Contrato
    document.getElementById("Contrato").value = datosContrato.contrato;
    
    // Estado del contrato
    value_estadoContrato.setValue(datosContrato.estado_cto);
    // Objeto
    document.getElementById("Objeto").value = datosContrato.objeto;
    obtenerArchivos(datosContrato.contrato);

    // Municipio
    
    if (value_mupio && value_mupio.setValue && datosContrato.municipio) {
      value_mupio.setValue(datosContrato.municipio.split(", "));
      const municipios = datosContrato.municipio.split(", ");
    } else {
      value_mupio.setValue("");
    }
    
    //Subregion
    value_subregion.setValue(datosContrato.subregion);

    // Contratista
 
    document.getElementById("contratista").value = contratoDoc.data().contratista;

    
    // interventoria
    document.getElementById("interventoria").value = datosContrato.interventoria;
    
    // Unidad
    value_unidad.setValue(datosContrato.unidad);
    document.getElementById("vigencia").value = datosContrato.vigencia;
    
    // Fechas
    document.getElementById("Fecha_inicio").value = datosContrato.fecha_inicio;
    document.getElementById("Fecha_termina").value = datosContrato.fecha_termina;
    document.getElementById("Fecha_actualizacion").value = datosContrato.fecha_actualizacion;
    
    // indicadores
    
    const indicadores = (datosContrato && datosContrato.indicadores) ? datosContrato.indicadores.split(", ") : [];
    value_indicador.setValue(indicadores);
    
    //Tipo proyecto
    value_tipoProy.setValue(datosContrato.tipo_proyecto);
    //Fuente de financiacion
    value_fuenteFinanciacion.setValue(datosContrato.financiacion.split(", "));
    

    // Información financiera
    document.getElementById("Aporte_dto").value = datosContrato.aporte_dto;
    document.getElementById("Aporte_mpio").value = datosContrato.aporte_mpio;
    document.getElementById("Aporte_total").value = datosContrato.aporte_total; 
    
    // Aportes porcentaje
    document.getElementById("Aporte_dto_percent").value = datosContrato.percen_dtop;
    document.getElementById("Aporte_mpio_percent").value = datosContrato.percen_mpio;
    
    // Avances
    document.getElementById("meta").value = datosContrato.meta;
    document.getElementById("avance-meta").value = datosContrato.avance_meta;
    document.getElementById("desembolsos").value = datosContrato.desembolso || 0;

    document.getElementById("avance_fisico").value = datosContrato.avance_fisico;
    document.getElementById("avance_financiero").value = datosContrato.avance_financiero;
    
    // Dependencia
    if (value_dependencia) {
      value_dependencia.setValue(datosContrato.dependencia || "");
    }

    // Supervisión
    document.getElementById("supervisor").value = datosContrato.supervisor;

    document.getElementById("observaciones").value = datosContrato.observacion; 


    
    // Otros campos de texto
    if (value_impactos) {
      value_impactos.setValue(datosContrato.impacto.split(", ") || "");
    }


    document.getElementById("imp-ambiental").value = datosContrato.imp_amb;
    document.getElementById("imp-social").value = datosContrato.imp_social;
    document.getElementById("imp-predial").value = datosContrato.imp_predial;
   


    var boton = document.getElementById("guardar-btn");
    boton.innerHTML = "Editar";

    boton.onclick = function(){editar(id)};

  } else {
    console.log("Contrato no encontrado con id:", id);
  }
}


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

export async function editar(id) {
  var valores = value_mupio.getValue();
  var indca = value_indicador.getValue();
  var fnaciacion = value_fuenteFinanciacion.getValue();
  var imp = value_impactos.getValue();
  
  const contrato_id = doc(db, "contratos", id);

  // Crear un objeto con los datos a actualizar
  const contratoData = {
    contrato: document.getElementById("Contrato").value || '',
    estado_cto: document.getElementById("estado-contrato").value || '', 
    objeto: document.getElementById("Objeto").value || '',
    municipio: valores.length > 0 ? valores.join(', ') : '',
    subregion: document.getElementById("subregion").value || '', 
    contratista: document.getElementById("contratista").value || '',
    interventoria: document.getElementById("interventoria").value || '',

    unidad: document.getElementById("Unidad").value || '',
    vigencia: document.getElementById("vigencia").value || '',
    fecha_inicio: document.getElementById("Fecha_inicio").value || '',
    fecha_termina: document.getElementById("Fecha_termina").value || '',
    fecha_actualizacion: document.getElementById("Fecha_actualizacion").value || '',
    indicadores:indca.length > 0 ? indca.join(', ') : '',

    //------------------------------------------------------------------------------
    // Fuente de Financiación
    tipo_proyecto:document.getElementById("tipo-proy").value || '', 
    financiacion:fnaciacion.length > 0 ? fnaciacion.join(', ') : '',
    aporte_dto: document.getElementById("Aporte_dto").value || 0,
    aporte_mpio: document.getElementById("Aporte_mpio").value || 0,
    aporte_total: document.getElementById("Aporte_total").value || 0,
    percen_dtop: document.getElementById("Aporte_dto_percent").value || 0,
    percen_mpio: document.getElementById("Aporte_mpio_percent").value || 0,
    
    //------------------------------------------------------------------------------
    // avances
    meta: document.getElementById("meta").value || '',
    avance_meta: document.getElementById("avance-meta").value || '',
    desembolso:document.getElementById("desembolsos").value || 0, 
    avance_fisico: document.getElementById("avance_fisico").value || 0,
    avance_financiero: document.getElementById("avance_financiero").value || 0,

    //------------------------------------------------------------------------------
    // Supervision
    dependencia: document.getElementById("dependencia").value || '',
    supervisor: document.getElementById("supervisor").value || '',
    observacion: document.getElementById("observaciones").value || '',
    

    //------------------------------------------------------------------------------
    // Impactos
    impacto: imp.length > 0 ? imp.join(', ') : '',
    imp_amb: document.getElementById("imp-ambiental").value || '',
    imp_social: document.getElementById("imp-social").value || '',
    imp_predial: document.getElementById("imp-predial").value || ''
  };

  try {
    // Actualizar los datos en Firestore
    await updateDoc(contrato_id, contratoData);
    
    // Mostrar notificación de éxito
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Datos actualizados correctamente',
      showConfirmButton: false,
      timer: 500
    });

    // Cerrar el modal después de la actualización
    cerrarModal();
  } catch (error) {
    // Si ocurre un error, mostrar una notificación de error
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Ocurrió un error al actualizar',
      showConfirmButton: false,
      timer: 1500
    });
  }

}


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

function cerrarModal() {
  document.getElementById('seccion-modal').classList.remove('activo');
  document.getElementById('seccion-modal').style.display = 'none'; 

}

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

function limpiar_modal(){
    
    document.getElementById("Contrato").value = "";// Contrato
    value_estadoContrato.setValue("");// Estado del contrato
    document.getElementById("Objeto").value = ""; // Objeto
    value_mupio.setValue(""); //municipio
    value_subregion.setValue("");// subregion
    document.getElementById("contratista").value = "";// Contratista
    document.getElementById("interventoria").value = "";// interventoria
    value_unidad.setValue("");// Unidad
    document.getElementById("vigencia").value = "";// vigencia

    
    // Fechas
    document.getElementById("Fecha_inicio").value =  "";
    document.getElementById("Fecha_termina").value =  "";
    document.getElementById("Fecha_actualizacion").value =  "";
    value_indicador.setValue("");// indicadores
    value_tipoProy.setValue("");//Tipo proyecto
    value_fuenteFinanciacion.setValue("");//Fuente de financiacion
      
    // Información financiera
    document.getElementById("Aporte_dto").value = 0;
    document.getElementById("Aporte_mpio").value = 0;
    document.getElementById("Aporte_total").value = 0; 
    
    // Aportes porcentaje
    document.getElementById("Aporte_dto_percent").value = 0;
    document.getElementById("Aporte_mpio_percent").value = 0;
    
    // Avances
    document.getElementById("meta").value = 0;
    document.getElementById("avance-meta").value = 0;
    document.getElementById("desembolsos").value = 0;

    document.getElementById("avance_fisico").value = 0;
    document.getElementById("avance_financiero").value = 0;
    
    value_dependencia.setValue("");// Dependencia
    document.getElementById("supervisor").value = "";// Supervisión
    document.getElementById("observaciones").value = ""; 
    value_impactos.setValue("")

    document.getElementById("imp-ambiental").value = "";
    document.getElementById("imp-social").value = "";
    document.getElementById("imp-predial").value = ""; 

}


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

// Función para descargar todos los contratos en un archivo Excel
async function descargarContratosExcel() {
  // Verificar si hay un usuario autenticado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Si el usuario está autenticado, proceder con la descarga

      // Obtener la referencia a la colección "contratos"
      const q = query(collection(db, "contratos")); // Obtener todos los contratos

      // Obtener los contratos desde Firestore
      getDocs(q).then((querySnapshot) => {
        // Crear una matriz para almacenar los datos de los contratos
        let contratosData = [];

        // Iterar sobre los documentos y agregar los datos a la matriz
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Agregar cada contrato a la matriz
          contratosData.push({
            contrato: data.contrato || '',
            estado_cto: data.estado_cto || '',
            objeto: data.objeto || '',
            municipio: data.municipio || '',
            subregion: data.subregion || '',
            contratista: data.contratista || '',
            interventoria: data.interventoria || '',
            unidad: data.unidad || '',
            vigencia: data.vigencia || '',
            fecha_inicio: data.fecha_inicio || '',
            fecha_actualizacion: data.fecha_actualizacion || '',
            fecha_termina: data.fecha_termina || '',
            indicadores: data.indicadores || '',
            tipo_proyecto: data.tipo_proyecto || '',
            financiacion: data.financiacion || '',
            aporte_dto: data.aporte_dto || 0,
            aporte_mpio: data.aporte_mpio || 0,
            aporte_total: data.aporte_total || 0,
            percen_dtop: data.percen_dtop || 0,
            percen_mpio: data.percen_mpio || 0,
            meta: data.meta || '',
            avance_meta: data.avance_meta || '',
            desembolso: data.desembolso || 0,
            avance_fisico: data.avance_fisico || 0,
            avance_financiero: data.avance_financiero || 0,
            dependencia: data.dependencia || '',
            supervisor: data.supervisor || '',
            observacion: data.observacion || '',
            impacto: data.impacto || '',
            imp_amb: data.imp_amb || '',
            imp_social: data.imp_social || '',
            imp_predial: data.imp_predial || ''
          });
        });

        // Si no hay datos para exportar
        if (contratosData.length === 0) {
          alert("No hay datos para exportar.");
          return;
        }

        // Crear una hoja de trabajo usando SheetJS
        var ws = XLSX.utils.json_to_sheet(contratosData);

        // Crear un libro de trabajo
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Contratos");

        // Descargar el archivo Excel
        XLSX.writeFile(wb, "contratos.xlsx");
      }).catch((error) => {
        console.error("Error obteniendo los contratos:", error);
      });

    } else {
      // Si no hay usuario autenticado, mostrar un mensaje de alerta
      
    }
  });
}

window.descargarExcel = descargarContratosExcel;


