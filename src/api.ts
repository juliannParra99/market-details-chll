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
      fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10
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
        initialPage : (query: string) =>
        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10
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

