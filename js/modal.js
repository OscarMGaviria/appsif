const tabs = document.querySelectorAll(".tab-button");
const all_panel = document.querySelectorAll(".tab-panel");

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        tab.classList.add('active');

        // Seleccionamos la línea que se moverá
        var line = document.querySelector(".line");

        // Obtenemos el ancho del contenedor completo (tab-button)
        line.style.width = tab.offsetWidth + "px";  // Usamos el ancho del contenedor completo
        line.style.left = tab.offsetLeft + "px";    // Posicionamos la línea de acuerdo con el contenedor

        all_panel.forEach(panel=>{panel.classList.remove("active")});
        all_panel[index].classList.add('active');
    });
});








new AutoNumeric("#Aporte_dto", {
    currencySymbol: "$ ",       // Símbolo de moneda
    decimalPlaces: 2,          // Cantidad de decimales
    digitGroupSeparator: ".",  // Separador de miles
    decimalCharacter: ",",     // Separador decimal
    currencySymbolPlacement: "p", // Posición del símbolo antes del número
    suffixText: " COP",        // Agrega "COP" como sufijo
    watchExternalChanges: true
});


new AutoNumeric("#Aporte_mpio", {
    currencySymbol: "$ ",       // Símbolo de moneda
    decimalPlaces: 2,          // Cantidad de decimales
    digitGroupSeparator: ".",  // Separador de miles
    decimalCharacter: ",",     // Separador decimal
    currencySymbolPlacement: "p", // Posición del símbolo antes del número
    suffixText: " COP",        // Agrega "COP" como sufijo
    watchExternalChanges: true
});


new AutoNumeric("#Aporte_total", {
    currencySymbol: "$ ",       // Símbolo de moneda
    decimalPlaces: 2,          // Cantidad de decimales
    digitGroupSeparator: ".",  // Separador de miles
    decimalCharacter: ",",     // Separador decimal
    currencySymbolPlacement: "p", // Posición del símbolo antes del número
    suffixText: " COP",        // Agrega "COP" como sufijo
    watchExternalChanges: true
});

new AutoNumeric("#desembolsos", {
    currencySymbol: "$ ",       // Símbolo de moneda
    decimalPlaces: 2,          // Cantidad de decimales
    digitGroupSeparator: ".",  // Separador de miles
    decimalCharacter: ",",     // Separador decimal
    currencySymbolPlacement: "p", // Posición del símbolo antes del número
    suffixText: " COP",        // Agrega "COP" como sufijo
    watchExternalChanges: true
});







/**---------------------------------------------------------------------------------------------- */
function cerrarModal() {
    document.getElementById('seccion-modal').classList.remove('activo');
    document.getElementById('seccion-modal').style.display = 'none'; 

}

document.getElementById('cancelar-btn').addEventListener('click', function() {
    // Selecciona todos los campos de texto, entradas, textareas y select dentro de la sección
    document.querySelectorAll('#seccion-modal input[type="text"], #seccion-modal input[type="number"], #seccion-modal input[type="date"], #seccion-modal textarea, #seccion-modal select').forEach(function(input) {
        // Excluye el <select> con el id "impactos" de la limpieza
        if (input.id !== 'impactos') {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else if (input.tagName === 'SELECT') {
                // Resetea la selección a la opción deshabilitada por defecto
                input.selectedIndex = 0;
            } else {
                input.value = '';
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const iconoAmpliar = document.querySelector('.icono-ampliar');
    
    const cerrarSesionContenedor = document.getElementById('cerrarSesionContenedor');
    
    // Mostrar u ocultar el contenedor al hacer clic en el ícono
    iconoAmpliar.addEventListener('click', function() {
        if (cerrarSesionContenedor.style.display === 'none' || cerrarSesionContenedor.style.display === '') {
            cerrarSesionContenedor.style.display = 'flex'; // Muestra el div
        } else {
            cerrarSesionContenedor.style.display = 'none'; // Oculta el div
        }
    });

    // Cerrar el contenedor cuando se haga clic fuera de él
    document.addEventListener('click', function(event) {
        if (!cerrarSesionContenedor.contains(event.target) && !iconoAmpliar.contains(event.target)) {
            cerrarSesionContenedor.style.display = 'none'; // Oculta el div si se hace clic fuera de él
        }
    });

    // Cerrar el contenedor cuando se presione la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            cerrarSesionContenedor.style.display = 'none'; // Oculta el div si se presiona Escape
        }
    });
});



// Función para validar el tamaño del archivo
function validarArchivo(input, tipo) {
    const archivo = input.files[0];

    if (archivo) {
        const tamañoMaximo = 5 * 1024 * 1024; // 5MB en bytes
        if (archivo.size > tamañoMaximo) {
            alert(`El archivo seleccionado (${archivo.name}) supera los 5MB. Selecciona un archivo más pequeño.`);
            input.value = ""; // Reinicia el input
            return false;
        } else {
            console.log(`${tipo} seleccionado:`, archivo.name);
            // Cambiar el label según el archivo cargado
            if (tipo === "Imagen") {
                document.getElementById('labelImg').textContent = 'Imagen lista';
                
            } else if (tipo === "Archivo KMZ") {
                document.getElementById('labelKmz').textContent = 'Localización lista';
                
            }
        }
    }
}

// Evento para el div de imágenes
document.getElementById('divLoadImg').addEventListener('click', function() {
    document.getElementById('inputImg').click();
});

// Evento para el div de KMZ
document.getElementById('divLoadKmz').addEventListener('click', function() {
    document.getElementById('inputKmz').click();
});

// Validar imágenes
document.getElementById('inputImg').addEventListener('change', function() {
    validarArchivo(this, "Imagen");
});

// Validar archivos KMZ
document.getElementById('inputKmz').addEventListener('change', function() {
    validarArchivo(this, "Archivo KMZ");
});