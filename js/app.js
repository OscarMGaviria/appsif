
const firebaseConfig = {
    apiKey: "AIzaSyDdjYoi4BSBFFAuXumLxj-NMQWUVSFdSv4",
    authDomain: "contratos-5e932.firebaseapp.com",
    projectId: "contratos-5e932",
    storageBucket: "contratos-5e932.firebasestorage.app",
    messagingSenderId: "945849105278",
    appId: "1:945849105278:web:f0291a411b8e33327a112f"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);




const db = firebase.firestore();
var tabla = document.getElementById("cuerpo-tabla");
var inputText = ""; // Variable global para el texto del filtro


// Función que filtra los datos
function filtrarDatos() {
  const rows = [];
  let resultadosCoincidentes = 0;  // Variable para contar los resultados filtrados
  const inputText = removeAccents(document.getElementById("filtro-contrato").value.toString().toLowerCase()); // El texto del filtro

  db.collection("contratos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Eliminar acentos de los datos que se están mostrando en la tabla
      const contrato = removeAccents(data.contrato.toLowerCase());
      const dependencia = removeAccents(data.dependencia.toLowerCase());
      const municipio = removeAccents(data.municipio.toLowerCase());
      const objeto = removeAccents(data.objeto.toLowerCase());

      // Verificar si el filtro coincide con alguno de los campos
      if (contrato.indexOf(inputText) !== -1 || dependencia.indexOf(inputText) !== -1 || municipio.indexOf(inputText) !== -1 || objeto.indexOf(inputText) !== -1) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td scope="row">${data.contrato}</td>
          <td>${data.dependencia}</td>
          <td>${data.municipio}</td>
          <td>${data.objeto}</td>
          <td><button class="boton-tabla" onclick="eliminar('${doc.id}')"><i class="fa-solid fa-trash-can"></i></button></td>
          <td><button class="boton-tabla-edit" onclick="editar('${doc.id}')"><i class="fa-solid fa-pencil"></i></button></td>
        `;
        rows.push(row);
        resultadosCoincidentes++;  // Incrementar el contador cuando se encuentra una coincidencia
      }
    });

    // Actualizar el número de resultados filtrados en el contador
    document.getElementById("cantidad-resultados").textContent = resultadosCoincidentes;

    // Una sola vez, agregar todas las filas a la tabla
    tabla.innerHTML = '';  // Limpiar la tabla antes de añadir las filas filtradas
    rows.forEach(row => tabla.appendChild(row)); // Agregar las filas filtradas
  });
}



function borrar(){
  document.getElementById("filtro-contrato").value = ''; // Eliminar texto del campo de filtro
  // Recargar la tabla con todos los datos sin aplicar el filtro
  cargarDatos(); 
}



function cargarDatos() {
  const rows = [];
  let resultadosCoincidentes = 0; // Resetear el contador de resultados

  db.collection("contratos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const row = document.createElement('tr');
      row.innerHTML = `
        <td scope="row">${data.contrato}</td>
        <td>${data.dependencia}</td>
        <td>${data.municipio}</td>
        <td>${data.objeto}</td>
        <td><button class="boton-tabla" onclick="eliminar('${doc.id}')"><i class="fa-solid fa-trash-can"></i></button></td>
        <td><button class="boton-tabla-edit" onclick="editar('${doc.id}')"><i class="fa-solid fa-pencil"></i></button></td>
      `;
      rows.push(row);
      resultadosCoincidentes++;  // Incrementar el contador por cada fila
    });

    // Actualizar el número de resultados encontrados
    document.getElementById("cantidad-resultados").textContent = resultadosCoincidentes;

    // Limpiar la tabla y agregar todas las filas
    tabla.innerHTML = ''; 
    rows.forEach(row => tabla.appendChild(row));
  });
}




// Función para guardar los datos------------------------------------------------------------------------------------------
function guardar() {
  borrar();
  // Obtener los valores de los campos del formulario
  var contrato = document.getElementById("Contrato").value;
  var objeto = document.getElementById("Objeto").value;
  var contratista = document.getElementById("contratista").value;
  var unidad = document.getElementById("Unidad").value;
  var indicador = document.getElementById("Indicador").value;
  var fecha_inicio = document.getElementById("Fecha_inicio").value;
  var fecha_actualizacion = document.getElementById("Fecha_actualizacion").value;
  var municipio = document.getElementById("municipioSelect").value;
  var subregion = document.getElementById("Subregion").value;
  var estado_cto = document.getElementById("estado-contrato").value;
  var aporte_dto = parseFloat(document.getElementById("Aporte_dto").value) || 0;
  var aporte_mpio = parseFloat(document.getElementById("Aporte_mpio").value) || 0;
  var aporte_total = parseFloat(document.getElementById("Aporte_total").value) || 0;
  var percen_dtop = parseFloat(document.getElementById("Aporte_dto_percent").value) || 0;
  var percen_mpio = parseFloat(document.getElementById("Aporte_mpio_percent").value) || 0;
  var meta = parseFloat(document.getElementById("meta").value) || 0;
  var avance_meta = parseFloat(document.getElementById("avance-meta").value) || 0;
  var pago_contratista = parseFloat(document.getElementById("pago-contratista").value) || 0;
  var avance_fisico = parseFloat(document.getElementById("Avance_fisico").value) || 0;
  var avance_financiero = parseFloat(document.getElementById("Avance_financiero").value) || 0;
  var dependencia = document.getElementById("dependencia").value;
  var supervisor = document.getElementById("Supervisor").value;
  var observacion = document.getElementById("Observaciones").value;
  var imp_amb = document.getElementById("imp-ambiental").value;
  var imp_social = document.getElementById("imp-social").value;
  var imp_predial = document.getElementById("imp-predial").value;


  // Obtener los valores de los checkboxes (financiación)
  var financiacion = [];
  if (document.getElementById("cbx-A").checked) financiacion.push("Recursos propios");
  if (document.getElementById("cbx-B").checked) financiacion.push("Regalías");
  if (document.getElementById("cbx-C").checked) financiacion.push("Valorización");
  if (document.getElementById("cbx-D").checked) financiacion.push("Mixta");


  // Obtener los valores de los checkboxes (impacto)
  var impacto = [];
  if (document.getElementById("cbx-1").checked) impacto.push("Ambiental");
  if (document.getElementById("cbx-2").checked) impacto.push("Social");
  if (document.getElementById("cbx-3").checked) impacto.push("Predial");

  if (!contrato) {
    Swal.fire({
      icon: "warning",
      title: "Campos de contrato obligatorios faltantes",
      text: "Por favor, ingresa el numero del contrato",
    });
    return; // Detiene la ejecución si las fechas están vacías
  }

  // Verificar que las fechas no estén vacías
  if (!fecha_inicio || !fecha_actualizacion ) {
    Swal.fire({
      icon: "warning",
      title: "Campos de fecha obligatorios faltantes",
      text: "Por favor, ingresa las fechas de inicio y actualización.",
    });
    return; // Detiene la ejecución si las fechas están vacías
  }


  // Convertir fechas a Timestamp de Firestore
  var fecha_inicio_timestamp = firebase.firestore.Timestamp.fromDate(new Date(fecha_inicio));
  var fecha_actualizacion_timestamp = firebase.firestore.Timestamp.fromDate(new Date(fecha_actualizacion));

  // Crear el objeto con todos los datos
  const datosFormulario = {
    contrato: contrato,
    objeto: objeto,
    contratista: contratista,
    unidad: unidad,
    indicador: indicador,
    fecha_inicio: fecha_inicio_timestamp,
    municipio: municipio,
    subregion: subregion,
    estado_cto: estado_cto,
    financiacion: financiacion,  // Guardando los valores seleccionados de los checkboxes de financiación
    impacto: impacto,  // Guardando los valores seleccionados de los checkboxes de impacto
    aporte_dto: aporte_dto,
    aporte_mpio: aporte_mpio,
    aporte_total: aporte_total,
    percen_dtop: percen_dtop,
    percen_mpio: percen_mpio,
    meta: meta,
    avance_meta: avance_meta,
    pago_contratista: pago_contratista,
    avance_fisico: avance_fisico,
    avance_financiero: avance_financiero,
    dependencia: dependencia,
    supervisor: supervisor,
    fecha_actualizacion: fecha_actualizacion_timestamp,
    observacion: observacion,
    imp_amb: imp_amb,
    imp_social: imp_social,
    imp_predial:imp_predial,
  };

  // Verificar si el contrato ya existe en Firestore
 
  const contratoRef = db.collection("contratos").where("contrato", "==", contrato);

  contratoRef.get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        // Si no existe, agregar los datos
        db.collection("contratos").add(datosFormulario)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Los datos han sido guardados correctamente",
              showConfirmButton: false,
              timer: 3000
            });
            document.getElementById("form-multipasos").reset();
            filtrarDatos();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Hubo un error",
              text: "No se pudo guardar los datos. Intenta nuevamente.",
            });
            console.error("Error al guardar los datos: ", error);
          });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Este número de contrato ya está registrado",
          text: "Por favor, verifica el número del contrato.",
        });
      }
    })
    .catch((error) => {
      console.error("Error al verificar el contrato: ", error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error al verificar el contrato",
        text: "Intenta nuevamente más tarde.",
      });
    });
}




// Obtener datos y actualizar la tabla ------------------------------------------------------------------------


var tabla = document.getElementById("cuerpo-tabla");

db.collection("contratos").onSnapshot((querySnapshot) => {
  const rows = [];
  let resultadosCoincidentes = 0;  // Variable para contar los resultados filtrados
  const inputText = removeAccents(document.getElementById("filtro-contrato").value.toString().toLowerCase()); // El texto del filtro

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    // Eliminar acentos de los datos que se están mostrando en la tabla
    const contrato = removeAccents(data.contrato.toLowerCase());
    const dependencia = removeAccents(data.dependencia.toLowerCase());
    const municipio = removeAccents(data.municipio.toLowerCase());
    const objeto = removeAccents(data.objeto.toLowerCase());

    // Verificar si el filtro coincide con alguno de los campos
    if (contrato.indexOf(inputText) !== -1 || dependencia.indexOf(inputText) !== -1 || municipio.indexOf(inputText) !== -1 || objeto.indexOf(inputText) !== -1) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td scope="row">${data.contrato}</td>
        <td>${data.dependencia}</td>
        <td>${data.municipio}</td>
        <td>${data.objeto}</td>
        <td><button class="boton-tabla" onclick="eliminar('${doc.id}')"><i class="fa-solid fa-trash-can"></i></button></td>
        <td><button class="boton-tabla-edit" onclick="editar('${doc.id}')"><i class="fa-solid fa-pencil"></i></button></td>
      `;
      rows.push(row);
      resultadosCoincidentes++;  // Incrementar el contador cuando se encuentra una coincidencia
    }
  });

  // Actualizar el número de resultados filtrados en el contador
  document.getElementById("cantidad-resultados").textContent = resultadosCoincidentes;

  // Una sola vez, agregar todas las filas a la tabla
  tabla.innerHTML = '';
  rows.forEach(row => tabla.appendChild(row));
});




// Obtener los datos de un documento específico -------------------------------------------------------------

function obtenerDatosPorId(id) {
  const db = firebase.firestore();
  return db.collection("contratos").doc(id).get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No se encontró el documento con el ID proporcionado");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error al obtener el documento:", error);
      return null;
    });
}



// Función para mostrar la tabla con los contratos
function mostrarTabla() {
  const db = firebase.firestore();
  const tabla = document.getElementById("cuerpo-tabla");
  const inputText = removeAccents(document.getElementById("filtro-contrato").value.toString().toLowerCase()); // El texto del filtro

  db.collection("contratos").onSnapshot((querySnapshot) => {
    const rows = [];
    let resultadosCoincidentes = 0; // Variable para contar los resultados filtrados

    // Iterar sobre los documentos de Firestore
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Eliminar acentos de los datos que se están mostrando en la tabla
      const contrato = removeAccents(data.contrato.toLowerCase());
      const dependencia = removeAccents(data.dependencia.toLowerCase());
      const municipio = removeAccents(data.municipio.toLowerCase());
      const objeto = removeAccents(data.objeto.toLowerCase());
      
      // Verificar si el filtro coincide con alguno de los campos
      if (contrato.indexOf(inputText) !== -1 || dependencia.indexOf(inputText) !== -1 || municipio.indexOf(inputText) !== -1 || objeto.indexOf(inputText) !== -1) {
        // Crear una nueva fila con los datos del contrato
        const row = document.createElement('tr');
        fila.setAttribute("data-id", contrato.id);
        row.innerHTML = `
          <td scope="row">${data.contrato}</td>
          <td>${data.dependencia}</td>
          <td>${data.municipio}</td>
          <td>${data.objeto}</td>
          <td><button class="boton-tabla" onclick="eliminar('${doc.id}')"><i class="fa-solid fa-trash-can"></i></button></td>
          <td><button class="boton-tabla-edit" onclick="editar('${doc.id}')"><i class="fa-solid fa-pencil"></i></button></td>
        `;
        rows.push(row);
        resultadosCoincidentes++;  // Incrementar el contador cuando se encuentra una coincidencia
      }
    });

    // Actualizar el número de resultados filtrados en el contador
    document.getElementById("cantidad-resultados").textContent = resultadosCoincidentes;

    // Limpiar la tabla y agregar las nuevas filas
    tabla.innerHTML = '';
    rows.forEach(row => tabla.appendChild(row));
  });
}

// Función para eliminar un documento -----------------------------------------------------------------------------------------------------------
function eliminar(id) {
  borrar();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "¡Eliminado!",
        text: "Tu archivo ha sido eliminado.",
        icon: "success"
      });


      const db = firebase.firestore();
  
      // Eliminar el contrato de Firestore
      db.collection("contratos").doc(id).delete()
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Contrato eliminado correctamente",
            showConfirmButton: false,
            timer: 3000
          });
        })
        .catch((error) => {
          console.error("Error al eliminar el contrato: ", error);
        });
      

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });

}










  











// Función para editar los datos
function editar(id) {
  borrar();



  activarPrimerTab();
  mostrarformulario(); // Asumo que esta función muestra el formulario de edición
  const db = firebase.firestore();

  obtenerDatosPorId(id)
    .then((datos) => {
      if (datos) {
        // Asignar los valores a los campos del formulario
        document.getElementById("Contrato").value = datos.contrato || '';
        document.getElementById("Objeto").value = datos.objeto || '';
        document.getElementById("contratista").value = datos.contratista || '';
        document.getElementById("Unidad").value = datos.unidad || '';
        document.getElementById("Indicador").value = datos.indicador || '';
        document.getElementById("Fecha_inicio").value = datos.fecha_inicio.toDate().toISOString().split('T')[0] || '';
        document.getElementById("Fecha_actualizacion").value = datos.fecha_actualizacion.toDate().toISOString().split('T')[0] || '';
        document.getElementById("municipioSelect").value = datos.municipio || '';
        document.getElementById("Subregion").value = datos.subregion || '';
        document.getElementById("estado-contrato").value = datos.estado_cto || '';
        document.getElementById("imp-ambiental").value = datos.imp_amb || '';
        document.getElementById("imp-social").value = datos.imp_social || '';
        document.getElementById("imp-predial").value = datos.imp_predial || '';


        
        // Manejo de los checkboxes de financiación (asignar según los datos)
        const financiacion = datos.financiacion || [];
        document.getElementById("cbx-A").checked = financiacion.includes("Recursos propios");
        document.getElementById("cbx-B").checked = financiacion.includes("Regalias");
        document.getElementById("cbx-C").checked = financiacion.includes("Valorización");
        document.getElementById("cbx-D").checked = financiacion.includes("Mixta");


        // Manejo de los checkboxes de impacto (asignar según los datos)
        const impacto = datos.impactos || [];
        document.getElementById("cbx-1").checked = impacto.includes("Ambiental");
        document.getElementById("cbx-2").checked = impacto.includes("Social");
        document.getElementById("cbx-3").checked = impacto.includes("Predial");

        // Rellenar los campos restantes
        document.getElementById("Aporte_dto").value = datos.aporte_dto || 0;
        document.getElementById("Aporte_mpio").value = datos.aporte_mpio || 0;
        document.getElementById("Aporte_total").value = datos.aporte_total || 0;
        document.getElementById("Aporte_dto_percent").value = datos.percen_dtop || 0;
        document.getElementById("Aporte_mpio_percent").value = datos.percen_mpio || 0;
        document.getElementById("meta").value = datos.meta || 0;
        document.getElementById("avance-meta").value = datos.avance_meta || 0;
        document.getElementById("pago-contratista").value = datos.pago_contratista || 0;
        document.getElementById("Avance_fisico").value = datos.avance_fisico || 0;
        document.getElementById("Avance_financiero").value = datos.avance_financiero || 0;
        document.getElementById("dependencia").value = datos.dependencia || '';
        document.getElementById("Supervisor").value = datos.supervisor || ''; 
        document.getElementById("Observaciones").value = datos.observacion || '';
        document.getElementById("tipo-proy").value = datos.tipo_proyecto || '';  // Para el tipo de proyecto
      }
    });

  // Cambiar el texto del botón a "Editar"
  const avFisico = parseFloat(document.getElementById("Avance_fisico").value) || 0;
  const avFinanciero = parseFloat(document.getElementById("Avance_financiero").value) || 0;
  crearGraficos(avFisico, avFinanciero);
  var boton = document.getElementById("guardar-data");
  boton.innerHTML = "Editar";

  boton.onclick = function() {
    // Obtener los valores del formulario
    var contrato = document.getElementById("Contrato").value || '';
    var objeto = document.getElementById("Objeto").value || '';
    var contratista = document.getElementById("contratista").value || '';
    var unidad = document.getElementById("Unidad").value || '';
    var indicador = document.getElementById("Indicador").value || '';
    var fecha_inicio = document.getElementById("Fecha_inicio").value || '';
    var fecha_actualizacion = document.getElementById("Fecha_actualizacion").value || '';
    var municipio = document.getElementById("municipioSelect").value || '';
    var subregion = document.getElementById("Subregion").value || '';
    var estado_cto = document.getElementById("estado-contrato").value || '';
    var imp_amb = document.getElementById("imp-ambiental").value || '';
    var imp_social = document.getElementById("imp-social").value || '';
    var imp_predial = document.getElementById("imp-predial").value || '';

    
    
    // Obtener los valores de los checkboxes de financiación
    var financiacion = [];
    if (document.getElementById("cbx-A").checked) financiacion.push("Recursos propios");
    if (document.getElementById("cbx-B").checked) financiacion.push("Regalias");
    if (document.getElementById("cbx-C").checked) financiacion.push("Valorización");
    if (document.getElementById("cbx-D").checked) financiacion.push("Mixta");

    

    // Obtener los valores de los checkboxes de impacto
    var impacto = [];
    if (document.getElementById("cbx-1").checked) impacto.push("Ambiental");
    if (document.getElementById("cbx-2").checked) impacto.push("Social");
    if (document.getElementById("cbx-3").checked) impacto.push("Predial");

    var aporte_dto = parseFloat(document.getElementById("Aporte_dto").value) || 0;
    var aporte_mpio = parseFloat(document.getElementById("Aporte_mpio").value) || 0;
    var aporte_total = parseFloat(document.getElementById("Aporte_total").value) || 0;
    var percen_dtop = parseFloat(document.getElementById("Aporte_dto_percent").value) || 0;
    var percen_mpio = parseFloat(document.getElementById("Aporte_mpio_percent").value) || 0;
    var meta = parseFloat(document.getElementById("meta").value) || 0;
    var avance_meta = parseFloat(document.getElementById("avance-meta").value) || 0;
    var pago_contratista = parseFloat(document.getElementById("pago-contratista").value) || 0;
    var avance_fisico = parseFloat(document.getElementById("Avance_fisico").value) || 0;
    var avance_financiero = parseFloat(document.getElementById("Avance_financiero").value) || 0;
    var dependencia = document.getElementById("dependencia").value || '';
    var supervisor = document.getElementById("Supervisor").value || '';
    var observacion = document.getElementById("Observaciones").value || '';
    var tipo_proyecto = document.getElementById("tipo-proy").value || '';
    crearGraficos(avance_fisico, avance_financiero);

    // Validar las fechas
    if (!fecha_inicio || !fecha_actualizacion) {
      alert("Por favor, complete ambos campos de fecha.");
      return;
    }

    // Convertir las fechas a timestamp
    var fecha_inicio_timestamp = firebase.firestore.Timestamp.fromDate(new Date(fecha_inicio));
    var fecha_actualizacion_timestamp = firebase.firestore.Timestamp.fromDate(new Date(fecha_actualizacion));

    // Crear el objeto con los datos del formulario
    const datosFormulario = {
      contrato: contrato,
      objeto: objeto,
      contratista: contratista,
      unidad: unidad,
      indicador: indicador,
      fecha_inicio: fecha_inicio_timestamp,
      fecha_actualizacion: fecha_actualizacion_timestamp,
      municipio: municipio,
      subregion: subregion,
      estado_cto: estado_cto,
      financiacion: financiacion,  // Guardar los valores de los checkboxes de financiación
      impactos: impacto,  // Guardar los valores de los checkboxes de impacto
      aporte_dto: aporte_dto,
      aporte_mpio: aporte_mpio,
      aporte_total: aporte_total,
      percen_dtop: percen_dtop,
      percen_mpio: percen_mpio,
      meta: meta,
      avance_meta: avance_meta,
      pago_contratista: pago_contratista,
      avance_fisico: avance_fisico,
      avance_financiero: avance_financiero,
      dependencia: dependencia,
      supervisor: supervisor,
      observacion: observacion,
      tipo_proyecto: tipo_proyecto,
      imp_amb: imp_amb,
      imp_social: imp_social,
      imp_predial:imp_predial,
    };

    // Actualizar los datos en Firestore
    db.collection("contratos").doc(id).update(datosFormulario)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Los datos han sido actualizados correctamente",
          showConfirmButton: false,
          timer: 3000
        });
        document.getElementById("form-multipasos").reset();
        cerrarModal();
      })
      .catch((error) => {
        console.error("Error al actualizar los datos: ", error);
      });
  };
}


function leerdata (){
  var tabla = document.getElementById("cuerpo-tabla");
  db.collection("contratos").get().then((querySnapshot) => {
    document.getElementById("filtro-contrato").value = "";
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
      row.innerHTML = `
      <td scope="row">${data.contrato}</td>
      <td>${data.dependencia}</td>
      <td>${data.municipio}</td>
      <td>${data.objeto}</td>
      <td><button class="boton-tabla" onclick="eliminar('${doc.id}')"><i class="fa-solid fa-trash-can"></i></button></td>
      <td><button class="boton-tabla-edit" onclick="editar('${doc.id}')"><i class="fa-solid fa-pencil"></i></button></td>
    `;
    });
});
alert("funcion ejecutada");
}




//login ------------------------------------------------------------------------------------------------------

document.getElementById('iniciar-seccion').addEventListener('submit', autenticar);

function autenticar(event) {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página

  var usuario = event.target.email.value;
  var password = event.target.password.value;

  // Usamos Firebase para autenticar
  firebase.auth().signInWithEmailAndPassword(usuario, password)
    .then((userCredential) => {
      // Autenticación exitosa
      Swal.fire({
        title: '¡Autenticación exitosa!',
        icon: 'success',
        draggable: true,
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Después de mostrar la alerta, cambiar la visibilidad de los elementos
        const elemento = document.getElementById('iniciar-seccion');
        const elemento2 = document.getElementById('tabla-contratos');
        const elemento3 = document.getElementById('formulario');
        elemento.style.display = 'none';
        elemento2.style.display = 'block';
        elemento3.style.display = 'none';


        // cargarContratos();
      });
    })
    .catch((error) => {
      // Si ocurre un error, mostramos un mensaje con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: "Verifica tus credenciales",
        footer: '<p>Contacta al administrador</p>',
        showConfirmButton: true,
      });

      // Mostrar mensaje de error adicional
      document.getElementById('error-message').style.display = 'block'; // Muestra el mensaje de error en el DOM
    });
}


document.getElementById("filtro-contrato").addEventListener("input", inputchange);

function removeAccents(str) {
  // Normaliza el texto y elimina las tildes
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function inputchange() {
  let inputText = removeAccents(document.getElementById("filtro-contrato").value.toString().toLowerCase());
  let tableBody = document.getElementById("cuerpo-tabla");
  let tableRow = tableBody.getElementsByTagName("tr");
  let resultadosCoincidentes = 0; // Variable para contar los resultados

  for (let i = 0; i < tableRow.length; i++) {
    let contrato = removeAccents(tableRow[i].cells[0].textContent.toString().toLowerCase()); // Contrato
    let dependencia = removeAccents(tableRow[i].cells[1].textContent.toString().toLowerCase()); // Dependencia
    let municipio = removeAccents(tableRow[i].cells[2].textContent.toString().toLowerCase());   // Municipio
    let objeto = removeAccents(tableRow[i].cells[3].textContent.toString().toLowerCase());   // Objeto

    // Verifica si el texto de búsqueda está en el contrato, dependencia, municipio o el objeto
    if (contrato.indexOf(inputText) === -1 && dependencia.indexOf(inputText) === -1 && municipio.indexOf(inputText) === -1 && objeto.indexOf(inputText) === -1) {
      tableRow[i].style.visibility = "collapse"; // Ocultar fila si no coincide
    } else {
      tableRow[i].style.visibility = ""; // Mostrar fila si coincide
      resultadosCoincidentes++; // Aumenta el contador si la fila es visible
    }
  }

  // Mostrar la cantidad de resultados coincidentes en la consola
  document.getElementById("cantidad-resultados").textContent = resultadosCoincidentes;
}








// Función para descargar los datos de Firestore en Excel
function descargarExcel() {
  // Obtener la referencia a la colección "contrato"
  var db = firebase.firestore();
  db.collection("contratos")
    .get()
    .then(function(querySnapshot) {
      // Crear una matriz para almacenar los datos
      var datos = [];

      // Iterar sobre los documentos y agregar los datos a la matriz
      querySnapshot.forEach(function(doc) {
        // Aquí se agregan los campos que deseas exportar
        datos.push(doc.data());
      });

      // Si no hay datos en la colección
      if (datos.length === 0) {
          alert("No hay datos para exportar.");
          return;
      }

      // Crear una hoja de trabajo usando SheetJS
      var ws = XLSX.utils.json_to_sheet(datos);

      // Crear un libro de trabajo
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contratos");

      // Descargar el archivo Excel
      XLSX.writeFile(wb, "contratos.xlsx");
    })
    .catch(function(error) {
      console.error("Error al obtener los documentos: ", error);
    });
}
