$(document).ready(function() {
    // Inicializa DataTables en la tabla con el id 'example'
    $('#example').DataTable({
      "paging": true,  // Habilita la paginación
      "searching": true,  // Habilita la búsqueda en la tabla
      "ordering": true,  // Habilita la ordenación de las columnas
      "info": true,  // Muestra la información de las filas mostradas
      "autoWidth": false  // Evita el ajuste automático de los anchos de las columnas
    });

    // Filtro personalizado
    $('#filtro-contrato').on('keyup', function() {
      $('#example').DataTable().search(this.value).draw();
    });
  });