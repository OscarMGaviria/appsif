// Definimos las variables globales para las gráficas
var avanceFisico, avanceFinanciero;

// Función para crear o actualizar los gráficos de avance físico y financiero
function crearGraficos(avanceFisicoPorcentaje, avanceFinancieroPorcentaje) {
    
    var avanceFisicoRestante = 100 - avanceFisicoPorcentaje;
    var avanceFinancieroRestante = 100 - avanceFinancieroPorcentaje;

    // Si las gráficas no existen, las creamos
    if (!avanceFisico) {
        var ctxFisico = document.getElementById('avanceFisico').getContext('2d');
        avanceFisico = new Chart(ctxFisico, {
            type: 'doughnut', // Tipo de gráfico de dona
            data: {
                labels: ['Avance Físico'], // Solo un label, el progreso
                datasets: [{
                    label: 'Avance Físico',
                    data: [avanceFisicoPorcentaje, avanceFisicoRestante], // Avance y el porcentaje restante
                    backgroundColor: ['#36A2EB', '#E4E9F2'], // Color del avance y el resto
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.raw + '%'; // Mostrar porcentaje en los tooltips
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    } else {
        // Si las gráficas ya existen, las actualizamos
        avanceFisico.data.datasets[0].data = [avanceFisicoPorcentaje, avanceFisicoRestante];
        avanceFisico.update();
    }

    // Si la gráfica financiera no existe, la creamos
    if (!avanceFinanciero) {
        var ctxFinanciero = document.getElementById('avanceFinanciero').getContext('2d');
        avanceFinanciero = new Chart(ctxFinanciero, {
            type: 'doughnut', // Tipo de gráfico de dona
            data: {
                labels: ['Avance Financiero'], // Solo un label, el progreso
                datasets: [{
                    label: 'Avance Financiero',
                    data: [avanceFinancieroPorcentaje, avanceFinancieroRestante], // Avance y el porcentaje restante
                    backgroundColor: ['#FF9F40', '#E4E9F2'], // Color del avance y el resto
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.raw + '%'; // Mostrar porcentaje en los tooltips
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    } else {
        // Si las gráficas ya existen, las actualizamos
        avanceFinanciero.data.datasets[0].data = [avanceFinancieroPorcentaje, avanceFinancieroRestante];
        avanceFinanciero.update();
    }
}

// Función para obtener los valores de los inputs y actualizar las gráficas
function actualizarGraficas() {
    var avanceFisicoPorcentaje = parseFloat(document.getElementById('Avance_fisico').value) || 0;
    var avanceFinancieroPorcentaje = parseFloat(document.getElementById('Avance_financiero').value) || 0;

    // Llamamos a la función para actualizar los gráficos
    crearGraficos(avanceFisicoPorcentaje, avanceFinancieroPorcentaje);
}

// Añadimos event listeners para que las gráficas se actualicen cuando el usuario cambie los valores
document.getElementById('Avance_fisico').addEventListener('input', actualizarGraficas);
document.getElementById('Avance_financiero').addEventListener('input', actualizarGraficas);

// Inicializamos los gráficos con valores por defecto (por ejemplo, 0%)

