// Municipios y sus subregiones
const municipiosConSubregion = {
    "Abejorral": "Oriente",
    "Abriaquí": "Occidente",
    "Alejandría": "Oriente",
    "Amagá": "Suroeste",
    "Amalfi": "Nordeste",
    "Andes": "Suroeste",
    "Angelópolis": "Suroeste",
    "Angostura": "Norte",
    "Anorí": "Nordeste",
    "Anzá": "Occidente",
    "Apartadó": "Urabá",
    "Arboletes": "Urabá",
    "Argelia": "Oriente",
    "Armenia": "Oriente",
    "Barbosa": "Valle de Aburrá",
    "Bello": "Valle de Aburrá",
    "Belmira": "Norte",
    "Betania": "Suroeste",
    "Betulia": "Suroeste",
    "Briceño": "Norte",
    "Buriticá": "Occidente",
    "Cáceres": "Bajo Cauca",
    "Caicedo": "Occidente",
    "Caldas": "Valle de Aburrá",
    "Campamento": "Norte",
    "Cañasgordas": "Occidente",
    "Caracolí": "Magdalena Medio",
    "Caramanta": "Suroeste",
    "Carepa": "Urabá",
    "Carolina": "Norte",
    "Caucasia": "Bajo Cauca",
    "Chigorodó": "Urabá",
    "Cisneros": "Nordeste",
    "Cocorná": "Oriente",
    "Concepción": "Oriente",
    "Concordia": "Occidente",
    "Copacabana": "Valle de Aburrá",
    "Dabeiba": "Occidente",
    "Donmatías": "Norte",
    "Ebéjico": "Occidente",
    "El Bagre": "Bajo Cauca",
    "Entrerríos": "Norte",
    "Envigado": "Valle de Aburrá",
    "Fredonia": "Suroeste",
    "Frontino": "Occidente",
    "Giraldo": "Occidente",
    "Girardota": "Valle de Aburrá",
    "Gómez Plata": "Norte",
    "Granada": "Oriente",
    "Guadalupe": "Norte",
    "Guarne": "Oriente",
    "Guatapé": "Oriente",
    "Heliconia": "Occidente",
    "Hispania": "Suroeste",
    "Itagüí": "Valle de Aburrá",
    "Ituango": "Norte",
    "Jardín": "Suroeste",
    "Jericó": "Suroeste",
    "La Ceja": "Oriente",
    "La Estrella": "Valle de Aburrá",
    "La Pintada": "Suroeste",
    "La Unión": "Oriente",
    "Liborina": "Occidente",
    "Maceo": "Magdalena Medio",
    "Marinilla": "Oriente",
    "Medellín": "Valle de Aburrá",
    "Montebello": "Suroeste",
    "Murindó": "Urabá",
    "Mutatá": "Urabá",
    "Nariño": "Oriente",
    "Nechí": "Bajo Cauca",
    "Necoclí": "Urabá",
    "Olaya": "Occidente",
    "Peñol": "Oriente",
    "Peque": "Occidente",
    "Pueblorrico": "Suroeste",
    "Puerto Berrío": "Magdalena Medio",
    "Puerto Nare": "Magdalena Medio",
    "Puerto Triunfo": "Magdalena Medio",
    "Remedios": "Nordeste",
    "Retiro": "Oriente",
    "Rionegro": "Oriente",
    "Sabanalarga": "Occidente",
    "Sabaneta": "Valle de Aburrá",
    "Salgar": "Suroeste",
    "San Andrés de Cuerquia": "Norte",
    "San Carlos": "Oriente",
    "San Francisco": "Oriente",
    "San Jerónimo": "Occidente",
    "San José de la Montaña": "Norte",
    "San Juan de Urabá": "Urabá",
    "San Luis": "Oriente",
    "San Pedro de Urabá": "Urabá",
    "San Pedro de los Milagros": "Norte",
    "San Rafael": "Oriente",
    "San Roque": "Nordeste",
    "San Vicente": "Oriente",
    "Santa Bárbara": "Suroeste",
    "Santa Fe de Antioquia": "Occidente",
    "Santa Rosa de Osos": "Norte",
    "Santo Domingo": "Nordeste",
    "Segovia": "Nordeste",
    "Sonsón": "Oriente",
    "Sopetrán": "Occidente",
    "Támesis": "Suroeste",
    "Tarazá": "Bajo Cauca",
    "Tarso": "Suroeste",
    "Titiribí": "Suroeste",
    "Toledo": "Norte",
    "Turbo": "Urabá",
    "Uramita": "Occidente",
    "Urrao": "Suroeste",
    "Valdivia": "Norte",
    "Valparaíso": "Suroeste",
    "Vegachí": "Nordeste",
    "Venecia": "Suroeste",
    "Vigía del Fuerte": "Urabá",
    "Yalí": "Nordeste",
    "Yarumal": "Norte",
    "Yolombó": "Nordeste",
    "Yondó": "Magdalena Medio",
    "Zaragoza": "Bajo Cauca"
};

// Llenar el select con los municipios
const select = document.getElementById("municipioSelect");
for (const municipio in municipiosConSubregion) {
    const option = document.createElement("option");
    option.value = municipio;
    option.textContent = municipio;
    select.appendChild(option);
}

// Función que se llama cuando cambia el municipio seleccionado
function actualizarSubregion() {
    const municipioSelect = document.getElementById("municipioSelect");
    const subregionInput = document.getElementById("Subregion");
    
    const selectedMunicipio = municipioSelect.value;
    
    if (selectedMunicipio) {
        // Asignar la subregión correspondiente
        subregionInput.value = municipiosConSubregion[selectedMunicipio] || '';
    } else {
        // Limpiar el campo de subregión si no se selecciona municipio
        subregionInput.value = '';
    }
}



// Array con los indicadores
const indicadores = [
    "Espacio público adecuado",
    "Equipamientos construidos",
    "Túnel y vías e acceso construidas",
    "Aeropuertos o aeródromos mejorados",
    "Sistema de transporte público de pasajeros fortalecido",
    "Vía primaria mantenida",
    "Cables aéreos sostenibles construidos y operando",
    "Muelles o embarcaderos mejorados",
    "Vías secundarias mejoradas",
    "Vías secundarias mantenidas",
    "Vías terciarias mejoradas",
    "Vías terciarias mantenidas",
    "Vía urbana mejorada",
    "Estudios y diseños para proyectos de infraestructura realizados",
    "Vía férrea estructurada",
    "Estudios de preinversión para el sistema férreo realizado",
    "Sistema de transporte público de pasajeros cofinanciado"
];

// Obtener el select por su id
const indc = document.getElementById("Indicador");

// Crear las opciones dinámicamente
indicadores.forEach(indicador => {
    const option = document.createElement("option");
    option.value = indicador;
    option.textContent = indicador;
    indc.appendChild(option);
});

// Estado del contrato
const estadosContrato = {
    0: "Por iniciar",
    1: "En estructuración",
    2: "En ejecución",
    3: "Suspendido",
    4: "Por liquidar",
    5: "Liquidado"
};

// Obtener el select de estado del contrato
const estadoSelect = document.getElementById("estado-contrato");

// Llenar el select con los estados
for (const estado in estadosContrato) {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estadosContrato[estado];
    estadoSelect.appendChild(option);
}


// Dependencias
const dependencias = {
    "Dirección Administrativa y Financiera": "Dirección Administrativa y Financiera",
    "Dirección Asuntos Legales": "Dirección Asuntos Legales",
    "Dirección Estructuración Proyectos": "Dirección Estructuración Proyectos",
    "Dirección Gestión Social y Ambiental": "Dirección Gestión Social y Ambiental",
    "Dirección Instrumentos Financiación": "Dirección Instrumentos Financiación",
    "Dirección Proyectos Especiales": "Dirección Proyectos Especiales",
    "Dirección Desarrollo Físico": "Dirección Desarrollo Físico",
    "Subsecretaría Planeación Infraestructura Física": "Subsecretaría Planeación Infraestructura Física",
    "Subsecretaría Operativa": "Subsecretaría Operativa",
    "Subsecretaría Proyectos Estratégicos, Concesiones y APP": "Subsecretaría Proyectos Estratégicos, Concesiones y APP",
    "Varias": "Varias",
    "No aplica": "No aplica"
};

// Obtener el select de dependencia
const dependenciaSelect = document.getElementById("dependencia");

// Llenar el select con las dependencias
for (const clave in dependencias) {
    const option = document.createElement("option");
    option.value = clave;
    option.textContent = dependencias[clave];
    dependenciaSelect.appendChild(option);
}




function nextStep(step) {
    document.getElementById('step-' + step).style.display = 'none';
    document.getElementById('step-' + (step + 1)).style.display = 'block';
  }
  
  function prevStep(step) {
    document.getElementById('step-' + step).style.display = 'none';
    document.getElementById('step-' + (step - 1)).style.display = 'block';
  }


function calcularAvances() {
    const perc_avance = document.getElementById()
}
