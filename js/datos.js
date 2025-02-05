// Municipios y sus subregiones
const municipiosConSubregion = {
    "Abejorral": "Oriente",
    "Todos":"Todos",
    "Abriaquí": "Occidente",
    "Alejandría": "Oriente",
    "Amagá": "Suroeste",
    "Amalfi": "Nordeste",
    "Andes": "Suroeste",
    "Angelópolis": "Suroeste",
    "Angostura": "Norte",
    "Anorí": "Nordeste",
    "Antioquia": "Occidente",
    "Anzá": "Occidente",
    "Apartadó": "Urabá",
    "Arboletes": "Urabá",
    "Argelia": "Oriente",
    "Armenia": "Occidente",
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
    "Carolina del Príncipe": "Norte",
    "Caucasia": "Bajo Cauca",
    "Chigorodó": "Urabá",
    "Cisneros": "Nordeste",
    "Ciudad Bolívar": "Suroeste",
    "Cocorná": "Oriente",
    "Concepción": "Oriente",
    "Concordia": "Suroeste",
    "Copacabana": "Valle de Aburrá",
    "Dabeiba": "Occidente",
    "Donmatías": "Norte",
    "Ebéjico": "Occidente",
    "El Bagre": "Bajo Cauca",
    "El Carmen de Viboral": "Oriente",
    "El Peñol": "Oriente",
    "El Retiro": "Oriente",
    "El Santuario": "Oriente",
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
    "Peque": "Occidente",
    "Pueblorrico": "Suroeste",
    "Puerto Berrío": "Magdalena Medio",
    "Puerto Nare": "Magdalena Medio",
    "Puerto Triunfo": "Magdalena Medio",
    "Remedios": "Nordeste",
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
    "San Pedro de los Milagros": "Norte",
    "San Pedro de Urabá": "Urabá",
    "San Rafael": "Oriente",
    "San Roque": "Nordeste",
    "San Vicente": "Oriente",
    "Santa Bárbara": "Suroeste",
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
    "Zaragoza": "Bajo Cauca",

};

// Dependencias
const dependencias = {
    "Dirección Administrativa y Financiera": "Dirección Administrativa y Financiera",
    "Dirección Asuntos Legales": "Dirección Asuntos Legales",
    "Dirección Estructuración Proyectos": "Dirección Estructuración Proyectos",
    "Dirección Gestión Social y Ambiental": "Dirección Gestión Social y Ambiental",
    "Dirección Gestión Predial":"Dirección Gestión Predial",
    "Dirección Instrumentos Financiación": "Dirección Instrumentos Financiación",
    "Dirección Proyectos Especiales": "Dirección Proyectos Especiales",
    "Dirección Desarrollo Físico": "Dirección Desarrollo Físico",
    "Subsecretaría Planeación Infraestructura Física": "Subsecretaría Planeación Infraestructura Física",
    "Subsecretaría Operativa": "Subsecretaría Operativa",
    "Subsecretaría Proyectos Estratégicos, Concesiones y APP": "Subsecretaría Proyectos Estratégicos, Concesiones y APP",
    "Varias": "Varias",
    "No aplica": "No aplica"
};

const dependenciaSelect = document.getElementById("dependencia");

// Llenar el select con las dependencias
for (const clave in dependencias) {
    const option = document.createElement("option");
    option.value = clave;
    option.textContent = dependencias[clave];
    dependenciaSelect.appendChild(option);

};



document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("municipioSelect");

    // Crear un "placeholder" vacío como primera opción
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Seleccione un municipio";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    // Llenar el select con los municipios
    for (const municipio in municipiosConSubregion) {
        const option = document.createElement("option");
        option.value = municipio;
        option.textContent = municipio;
        select.appendChild(option);
    }

    // Inicializa MultiSelectTag después de llenar el select

});






