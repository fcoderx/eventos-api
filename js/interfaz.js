class Interfaz {

    constructor(){ 
        // Inicializa la app al instanciar
        this.init();

        // Leer el resultado
        this.listado = document.getElementById('resultado-eventos');
    } 

    // Método para cuando inicialize la app
    init() {

        this.imprimirCategorias();
    }

    // Imprimir las categorias traidas de la API
    imprimirCategorias(){
        eventbrite.obtenerCategorias()
            .then(data => {
                const categorias = data.resultado.categories;

                console.log(categorias)

                // Obtener el select de categorias
                const selectCateg = document.getElementById('listado-categorias');

                // Recorremos el arreglo e imprimimos los options
                categorias.map(categ => {
                    const option = document.createElement('option');
                    option.value = categ.id;
                    option.appendChild(document.createTextNode(categ.name_localized));

                    selectCateg.appendChild(option);
                });
            });
    }

    // Leer la respuesta de la API e imprimir los resultados
    mostrarEventos(eventos) {
        // Leer los eventos y agregarlos a una varible
        const listaEventos = eventos.events;

        // 
        this.limpiarResultados();

        // Recorrer los eventos y crear los templates
        listaEventos.map(evento => {
            this.listado.innerHTML += `

            <div class="col-md-4 mb-4">
                <div class="card">
                    <img class="img-fluid mb-2" src="${evento.log !== null?
                    evento.logo.url: ''}">
                    <div class="card-body">
                        <div class="card-text">
                            <h2 class="text-center">${evento.name.text}</h2>
                            <p class="lead text-info">Información del evento</p>
                            <p>${evento.description.text.substring(0, 280)}...</p>

                            <span class="badge badge-primary">Capacidad: ${evento.capacity}</span>
                            <span class="badge badge-secondary">Fecha y hora: ${evento.start.local}</span>
                            <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">
                                Comprar Boletos
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    } 

    // Limpiar los resultados al hacer otra busqueda
    limpiarResultados() {
        this.listado.innerHTML = '';
    }

    // Método para imprimir mensaje cuando no haya nada escrito en el buscador
    mostrarMensajes(mensaje, clases) {

        const div = document.createElement('div');
        div.classList = clases;
        div.appendChild(document.createTextNode(mensaje)); 

        // Agregar el div creado al padre para mostrarlo
        const buscadorDiv = document.getElementById('buscador');
        buscadorDiv.appendChild(div);

        // Quitar el alert después de 3 segundos
        setTimeout(() => {
            this.limpiarMensaje();
        }, 3000);
    } 

    // Desaparecer el mensaje en caso de que exista
    limpiarMensaje() {
        const alerta = document.querySelector('.alert');

        if (alerta) {
            alerta.remove();
        }
    }
}