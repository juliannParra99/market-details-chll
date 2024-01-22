import Image from 'next/image'
import api from '@/api'
import Link from 'next/link';

//null por que la page no neceista  mostrar nada en este caso, sino que el layout va a mostrar lo que necesitamos, junto con la navbar
export default async function Home({
  searchParams = { search: '' }
}: {
  searchParams?: { search: string };
}) {

  const { results } = await api.item.initialPage(searchParams.search);

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
    </section>)
}
