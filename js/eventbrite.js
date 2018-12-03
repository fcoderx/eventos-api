class EventBrite {

    constructor() {
        this.token_auth = '2RL3JZLYK6LVTMVM6H2Q';
        this.ordenar = 'date';
    }

    async obtenerCategorias() {
        // Consultar las categorias a la REST API de event brite
        const respCateg = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.token_auth}`);

        // Recuperar la respuesta y devolver el json
        const resultado = await respCateg.json();

        // Devolver la respuesta
        return { resultado }
    } 

    // Mostrar resultados de la búsqueda
    async obtenerEventos(evento, categoria) {
        const respuestaEvento = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${evento}+dragons&sort_by=${this.ordenar}&categories=${categoria}&token=${this.token_auth}`);

        // Esperar la respuesta del evento y devolver el json
        const eventos = await respuestaEvento.json();

        return{ eventos }
    }
}