const api = {
  item: {

    fetch: async (id: string) => {
        const item = await fetch(`https://api.mercadolibre.com/items/${id}`).then(
            (res) =>
            res.json() as Promise<{
                id: string;
                title: string;
                thumbnail: string;
                price: number;
                currency_id: string;
            }>
        );
        const { plain_text } = await fetch(
            `https://api.mercadolibre.com/items/${id}/description`
        ).then(
            (res) =>
            res.json() as Promise<{
                plain_text: string;
            }>
        );
        return {
            ...item,
            description: plain_text,
        }

    },
    search: (query: string) =>
      fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4
          `).then((res) => res.json()) as Promise<{
            results: {

                id: string;
                title: string;
                thumbnail: string;
                price: number;
                currency_id: string;
                seller_address: {
                    city: {
                        name: string;
                    };
                };
            }[];
        }>,
    },
};

export default api;

//UTILIDAD DE ESTE ARCHIVO
// El archivo api.ts que has proporcionado parece ser parte de un proyecto Next.js y define un objeto llamado api. Su utilidad principal es proporcionar una interfaz para realizar llamadas a una API de MercadoLibre desde tu aplicación Next.js. A continuación, analicemos las funciones y sus propósitos en este objeto api:

// fetch(id: string): Esta función se utiliza para buscar un artículo en la API de MercadoLibre utilizando su ID. Toma como argumento un ID de artículo y realiza una solicitud GET a la API de MercadoLibre para obtener información detallada sobre ese artículo. Luego, también realiza otra solicitud para obtener la descripción del artículo. Finalmente, devuelve un objeto que combina la información del artículo con su descripción.

// search(query: string): Esta función se utiliza para realizar una búsqueda en la API de MercadoLibre basada en una consulta proporcionada (query). Realiza una solicitud GET a la API de MercadoLibre con la consulta y limita los resultados a 4 elementos. Luego, devuelve un objeto que contiene una matriz de resultados que incluyen información básica sobre los artículos encontrados.

// En resumen, este archivo api.ts encapsula las llamadas a la API de MercadoLibre en funciones reutilizables y las organiza en un objeto llamado api. Esto facilita la gestión de las llamadas a la API en tu aplicación Next.js, permitiéndote realizar búsquedas de artículos y obtener detalles de un artículo específico de manera eficiente. Esta modularización y encapsulación de la lógica de la API es una buena práctica de desarrollo que mejora la legibilidad y el mantenimiento de tu código.