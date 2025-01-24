window.onload = function() {
  // Mostrar la superposición para desactivar la sección
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('iniciar-seccion').style.display = 'block';

  document.getElementById('tabla-contratos').style.display = 'none';

};

function mostrarTabla() {
  // Ocultar el formulario
  document.getElementById('iniciar-seccion').style.display = 'none';
  document.getElementById('formulario').style.display = 'none';
  // Mostrar la tabla
  document.getElementById('tabla-contratos').style.display = 'block';
};

function mostrarformulario() {
  document.getElementById('iniciar-seccion').style.display = 'none';
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('tabla-contratos').style.display = 'block';
  crearGraficos(0, 0);

};



function cerrarModal() {
  // Limpia todos los campos del formulario
  document.getElementById("form-multipasos").reset();
  document.getElementById("guardar-data").innerText = "Guardar";
  // Oculta el formulario estableciendo display: none
  document.getElementById("formulario").style.display = "none";
}

/*
window.onclick = function(event) {
  var modal = document.getElementById("modal-contenedor");
  // Si el usuario hace clic en la zona oscura (el fondo del modal), cerramos el modal
  if (event.target === modal) {
    cerrarModal();
  }
};
*/



function calcularCampos() {
  // Parte 1: Calcular los porcentajes de los aportes
  const aporte_dto = parseFloat(document.getElementById("Aporte_dto").value); 
  const aporte_mpio = parseFloat(document.getElementById("Aporte_mpio").value); 

  // Verificar si los valores son válidos antes de realizar las operaciones
  if (!isNaN(aporte_dto) && !isNaN(aporte_mpio) && (aporte_dto + aporte_mpio) !== 0) {
    const total = aporte_dto + aporte_mpio;
    const percen_dtop = (aporte_dto / total) * 100; 
    const percen_mpio = (aporte_mpio / total) * 100;

    document.getElementById("Aporte_total").value = total.toFixed(2); 
    document.getElementById("Aporte_dto_percent").value = percen_dtop.toFixed(2); 
    document.getElementById("Aporte_mpio_percent").value = percen_mpio.toFixed(2);
  } else {
    // Si los valores son incorrectos, vaciar los campos
    document.getElementById("Aporte_dto_percent").value = '';
    document.getElementById("Aporte_mpio_percent").value = '';
    document.getElementById("Aporte_total").value = '';
  }

  // Parte 2: Calcular el avance físico y financiero
  const meta_value = parseFloat(document.getElementById("meta").value) || 0;
  const avance_meta = parseFloat(document.getElementById("avance-meta").value) || 0;
  const desembolso = parseFloat(document.getElementById("pago-contratista").value) || 0;
  const total_aporte = parseFloat(document.getElementById("Aporte_total").value) || 0;

  let perc_fisico = 0;
  let perc_financiero = 0;

  // Verificar si el desembolso es mayor que el aporte total
  if (desembolso > total_aporte) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El desembolso no puede ser mayor que el aporte total.",
      footer: '<a href="#">¿Por qué ocurre esto?</a>'
    });
    document.getElementById("pago-contratista").value = "";  
    document.getElementById("Avance_financiero").value = "";  
    perc_financiero = 0; 
    crearGraficos(perc_fisico, perc_financiero);
    return;  
  }

  // Verificar si el avance es mayor que la meta
  if (avance_meta > meta_value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El avance no puede ser mayor que la meta.",
      footer: '<a href="#">¿Por qué ocurre esto?</a>'
    });
    document.getElementById("avance-meta").value = "";  
    document.getElementById("Avance_fisico").value = ""; 
    perc_fisico = 0; 
    crearGraficos(perc_fisico, perc_financiero);
    return;  
  }

  // Si todo es correcto, calcular los porcentajes de avance
  if (meta_value > 0 && total_aporte > 0) {
    perc_fisico = (100 * avance_meta / meta_value).toFixed(2);
    perc_financiero = (100 * desembolso / total_aporte).toFixed(2);

    document.getElementById("Avance_fisico").value = perc_fisico;
    document.getElementById("Avance_financiero").value = perc_financiero;

    if (typeof crearGraficos === "function") {
      crearGraficos(perc_fisico, perc_financiero);  
    }
  } else {
    document.getElementById("Avance_fisico").value = "";
    document.getElementById("Avance_financiero").value = "";

    if (typeof crearGraficos === "function") {
      crearGraficos(0, 0);  
    }
  }
}









// Activar tab correspondiente al hacer clic
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.nav-link');
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      // Eliminar la clase activa de todos los tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Agregar la clase activa al tab actual
      e.target.classList.add('active');
      
      // Mostrar el contenido correspondiente
      const tabPanes = document.querySelectorAll('.tab-pane');
      tabPanes.forEach(pane => pane.classList.remove('show', 'active'));
      const targetPane = document.querySelector(e.target.getAttribute('href'));
      targetPane.classList.add('show', 'active');
    });
  });
});

// Activar el primer tab
function activarPrimerTab() {
  const tabs = document.querySelectorAll('.nav-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // Asegurarse de que hay tabs disponibles
  if (tabs.length > 0) {
    // Eliminar la clase activa de todos los tabs
    tabs.forEach(tab => tab.classList.remove('active'));

    // Agregar la clase activa al primer tab
    tabs[0].classList.add('active');

    // Eliminar las clases de 'show' y 'active' de todos los contenidos de los tab
    tabPanes.forEach(pane => pane.classList.remove('show', 'active'));

    // Mostrar el contenido correspondiente al primer tab
    const targetPane = document.querySelector(tabs[0].getAttribute('href'));
    targetPane.classList.add('show', 'active');
  }
}





// Función para actualizar el municipio y subregión
function actualizarSubregion() {
  const municipio = document.getElementById('municipioSelect').value;
  const subregion = document.getElementById('Subregion');
  
  // Aquí puedes colocar la lógica para actualizar la subregión según el municipio seleccionado
  // Por ejemplo:
  if (municipio === 'algunMunicipio') {
    subregion.value = 'Subregión correspondiente';
  } else {
    subregion.value = '';
  }
}



const barra = [1, 20, 50, 50, 90, 100];
const etapa_cto = ["Por iniciar", "En estructuración", "En ejecución", "Suspendido", "Por liquidar", "Liquidado"]
// Función para actualizar la barra y el color cuando cambia la etapa
function actualizarGrafico() {
  const etapaSeleccionada = document.getElementById('estado-contrato').value;  // Obtener el valor (índice) de la etapa seleccionada


  const progreso = barra[parseInt(etapaSeleccionada)];  // Obtener el porcentaje correspondiente a la etapa
  // Actualizar el ancho de la barra
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = progreso + '%';  // Cambiar el ancho de la barra según el porcentaje

  // Actualizar el color de la barra
  progressBar.style.backgroundColor = "#28A745";  // Aquí puedes poner cualquier color que quieras

  // Actualizar el label con el nombre de la etapa seleccionada
  document.getElementById("est").textContent = "Etapa actual: " + etapa_cto[etapaSeleccionada];  // Mostrar el nombre de la etapa seleccionada
}

// Agregar evento para detectar el cambio en el input (select)
document.getElementById('estado-contrato').addEventListener('change', actualizarGrafico);


