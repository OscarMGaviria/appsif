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


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// Función para validar el tamaño del archivo que se esta subiendo al almacenamiento,
// este no puede ser mayor a 1 MB
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
function validarArchivo(input, tipo) {
    const archivo = input.files[0];

    if (archivo) {
        const tamañoMaximo = 1 * 1024 * 1024; // MB en bytes
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



//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// Esta parte del codigo permite seleccionar los archivos tipo imgen o de localizacion con fileInput y fileName
// teniendo en cuenta que solo son validos los archivos '.jpg', '.jpeg', '.png', '.kmz', '.kml'
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


// Seleccionamos el input file y el elemento donde se mostrará el nombre del archivo
const fileInput = document.getElementById('fileInput');
const fileNameLabel = document.getElementById('fileName');

// Configuración de extensiones permitidas
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.kmz', '.kml'];

// Evento para cuando se selecciona un archivo
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];  // Obtenemos el primer archivo seleccionado
    
    if (file) {
        const fileName = file.name;
        const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();  // Obtenemos la extensión del archivo
        
        // Verificamos si la extensión del archivo es válida
        if (allowedExtensions.includes(fileExtension)) {
            // Si el archivo es válido, mostramos el nombre en el label
            fileNameLabel.textContent = fileName;
        } else {
            // Si no es válido, mostramos un mensaje de error
            fileNameLabel.textContent = "Tipo de archivo no permitido";
        }
    } else {
        // Si no hay archivo seleccionado, mostramos el mensaje predeterminado
        fileNameLabel.textContent = "No se ha seleccionado ningún archivo";
    }
});

function sumarAportes() {
    // Función para limpiar el formato de dinero (eliminando comas y el símbolo de moneda)
    function limpiarValor(valor) {
        // Primero quitar los puntos (separadores de miles)
        valor = valor.replace(/\./g, '');
    
        // Luego quitar los símbolos de moneda
        valor = valor.replace(/[^\d,.-]/g, '');
    
        // Reemplazar la coma por un punto decimal
        valor = valor.replace(',', '.');
    
        // Convertir a float, si no puede convertirse, devuelve 0
        return parseFloat(valor) || 0;
    }

    // Obtener los valores de los inputs y convertirlos a float
    let aporteMpio = parseFloat(limpiarValor(document.getElementById('Aporte_mpio').value)); // Valor del aporte municipio
    let aporteDto = parseFloat(limpiarValor(document.getElementById('Aporte_dto').value)); // Valor del aporte departamento

    // Sumar los dos valores
    let aporteTotal = aporteMpio + aporteDto;

    // Si el total es cero, no se calculan los porcentajes
    if (aporteTotal === 0) {
        document.getElementById('Aporte_mpio_percent').value = 0;
        document.getElementById('Aporte_dto_percent').value = 0;
    } else {
        // Calcular el porcentaje de cada uno respecto al total
        let porcentajeMpio = (aporteMpio / aporteTotal) * 100;
        let porcentajeDto = (aporteDto / aporteTotal) * 100;

        // Colocar los porcentajes en los campos correspondientes
        document.getElementById('Aporte_mpio_percent').value = porcentajeMpio.toFixed(2); // Porcentaje del municipio
        document.getElementById('Aporte_dto_percent').value = porcentajeDto.toFixed(2); // Porcentaje del departamento
    }

    // Colocar el resultado total en el campo correspondiente
    document.getElementById('Aporte_total').value = aporteTotal.toFixed(2); // Total con dos decimales
}

function limpiarValor(valor) {
    // Primero quitar los puntos (separadores de miles)
    valor = valor.replace(/\./g, '');

    // Luego quitar los símbolos de moneda
    valor = valor.replace(/[^\d,.-]/g, '');

    // Reemplazar la coma por un punto decimal
    valor = valor.replace(',', '.');

    // Convertir a float, si no puede convertirse, devuelve 0
    return parseFloat(valor) || 0;
}


function sumarAvances() { 
    // Obtener los valores de los inputs
    let valmeta = parseFloat(document.getElementById('meta').value) || 0;
    let valAvmeta = parseFloat(document.getElementById('avance-meta').value) || 0; 
    let aportotal = parseFloat(limpiarValor(document.getElementById('Aporte_total').value)) || 0; 
    let desemb = parseFloat(limpiarValor(document.getElementById('desembolsos').value)) || 0; 

    console.log(desemb, aportotal, valAvmeta, valmeta);

    // Verificar si los desembolsos son mayores que el aporte total
    if (desemb > aportotal) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los desembolsos no pueden ser mayores que el aporte total.',
        });
        // Si el avance es mayor que la meta, poner los valores a cero
        document.getElementById('desembolsos').value = 0;
        return;  // Salir de la función si hay un error
    }

    // Verificar si el avance meta es mayor que la meta
    if (valAvmeta > valmeta) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El avance no puede ser mayor que la meta. Los valores se reiniciarán.',
        });

        document.getElementById('avance-meta').value = 0;
        return;  // Salir de la función para evitar seguir con el cálculo
    }

    // Calcular los porcentajes
    let percAvanFisico = (valAvmeta / valmeta) * 100;
    let percAvanFinan = aportotal !== 0 ? (desemb / aportotal) * 100 : 0;

    // Colocar los porcentajes en los campos correspondientes
    document.getElementById('avance_fisico').value = percAvanFisico.toFixed(2) || 0; // Porcentaje del municipio
    document.getElementById('avance_financiero').value = percAvanFinan.toFixed(2) || 0; // Porcentaje del departamento
    
    // Obtener los valores de los inputs
    const avanceFisico = parseFloat(document.getElementById('avance_fisico').value) || 0;
    const avanceFinanciero = parseFloat(document.getElementById('avance_financiero').value) || 0;

    // Crear las gráficas con los valores obtenidos
    crearGraficaDoughnut('avanceFisico', avanceFisico);
    crearGraficaDoughnut('avanceFinanciero', avanceFinanciero);
}



let chartFisico = null;  // Declaramos la variable fuera para poder hacer referencia a la gráfica
let chartFinanciero = null;  // Declaramos la variable para la gráfica financiera

function crearGraficaDoughnut() {
    // Si ya existe una gráfica, la destruimos
    if (chartFisico) {
        chartFisico.destroy();
    }

    if (chartFinanciero) {
        chartFinanciero.destroy();
    }

    // Obtener los valores de los avances
    const avanceFisicoValue = parseFloat(document.getElementById('avance_fisico').value) || 0;
    const avanceFinancieroValue = parseFloat(document.getElementById('avance_financiero').value) || 0;

    // Crear las gráficas
    chartFisico = new Chart(document.getElementById('avanceFisico'), {
        type: 'doughnut',
        data: {
            labels: ['Avance Real', 'Restante'],
            datasets: [{
                label: 'Avance Físico (%)',
                data: [avanceFisicoValue, 100 - avanceFisicoValue],
                backgroundColor: ['#28a745', '#dcdcdc'],  // Verde para el avance, gris claro para el restante
                hoverBackgroundColor: ['#218838', '#c6c6c6']  // Colores de hover más oscuros para un efecto interactivo
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',  // Mueve la leyenda a la parte inferior
                    labels: {
                        font: {
                            size: 14,
                            family: 'Arial, sans-serif',
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw + '%';  // Mostrar porcentaje en tooltip
                        }
                    }
                }
            }
        }
    });

    chartFinanciero = new Chart(document.getElementById('avanceFinanciero'), {
        type: 'doughnut',
        data: {
            labels: ['Avance Real', 'Restante'],
            datasets: [{
                label: 'Avance Financiero (%)',
                data: [avanceFinancieroValue, 100 - avanceFinancieroValue],
                backgroundColor: ['#28a745', '#dcdcdc'],  // Verde para el avance, gris claro para el restante
                hoverBackgroundColor: ['#218838', '#c6c6c6']  // Colores de hover más oscuros
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',  // Mueve la leyenda a la parte inferior
                    labels: {
                        font: {
                            size: 14,
                            family: 'Arial, sans-serif',
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw + '%';  // Mostrar porcentaje en tooltip
                        }
                    }
                }
            }
        }
    });
}
