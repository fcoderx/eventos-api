const eventbrite = new EventBrite();
const ui = new Interfaz();

// Listener al buscador
document.getElementById('buscarBtn').addEventListener('click', (e) => {
    e.preventDefault();

    // Leer el texto del input buscar
    const textoBuscador = document.getElementById('evento').value;

    // Leer select
    const categorias = document.getElementById('listado-categorias');
    const categSeleccionada = categorias.options[categorias.selectedIndex].value;


    if (textoBuscador !== '') {
        // Cuando si hay datos en el buscador y sean correctos
        eventbrite.obtenerEventos(textoBuscador, categSeleccionada)
            .then(eventos => {
                console.log(eventos.eventos.events);
                if (eventos.eventos.events.length > 0){ 
                    // Si hay resultados al hacer la busqueda
                    ui.mostrarEventos(eventos.eventos);
                } else {
                    // Si no hay resultados al hacer la búsqueda
                    ui.mostrarMensajes('No hay resultados', 'alert alert-danger mt-4');
                }
            });
    } else {
        ui.mostrarMensajes('Escribe algo en el buscador', 'alert alert-danger mt-4');
    }
});