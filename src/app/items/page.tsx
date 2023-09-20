//esta es la ruta que obtiene la informacion de la query y busca el articulo
//api: https://api.mercadolibre.com/sites/MLA/search?q=

import Link from "next/link";

//para el ejemplo
//https://api.mercadolibre.com/sites/MLA/search?q=iphone&limit=4
export default async function ItemsPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  // Aquí, se realiza una solicitud HTTP a la API de MercadoLibre utilizando la función fetch. La URL se construye utilizando el valor search de searchParams. Luego, se analiza la respuesta JSON para obtener el campo results. La respuesta JSON se tipa explícitamente para asegurarse de que coincida con la estructura esperada.
  const { results } =
    await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchParams.search}&limit=4
  `).then(
      (res) =>
        res.json() as Promise<{
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
        }>
    );
  //Imprime los resultados en la consola para depuración
  console.log(results);
  return (
    <section>
      <article className="grid gap-4">
        {/* Mapea los resultados y crea un elemento para cada "item". */}
        {results.map((item) => (
          <Link href={`/items/${item.id}`} key={item.id} className="flex gap-4">
            <img src={item.thumbnail} alt={item.title} />
            <div>
              {/* Muestra el precio formateado como moneda y el título del "item". 
              Este P es de uso recurrento asique lo podria convertir en component*/}
              <p className="font-bold text-xl">
                {Number(item.price).toLocaleString("es-AR", {
                  style: "currency",
                  currency: item.currency_id,
                })}
              </p>
              <p>{item.title}</p>
            </div>
            {/* Esto realiza una validacion, en caso de que ese vlaor no se pueda leer*/}
            <span className="ml-auto  text-sm capitalize opacity-50">
              {item.seller_address
                ? item.seller_address.city.name.toLowerCase()
                : ""}
            </span>
          </Link>
        ))}
      </article>
    </section>
  );
}
