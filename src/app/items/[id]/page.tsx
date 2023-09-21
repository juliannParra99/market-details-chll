import api from "@/api";

export default async function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  //en este caso el endpoint va a ser el de un producto particular con un id particular, junto con sus respectivos datos: para eso cambio el endpoint(mirar el endopoint cuando s e accede a un producto particular y modificarlo)

  //dato a tener en cuenta, ver la diferencia de extraccion de datos,  en el src/app/page.tx los datos se extraen como array[] con objetos en el interior, en este caso no. Hay que prestar atencion a la arquitectura de la api
  const item = await api.item.fetch(id);
  return (
    <section className="grid gap-2">
      <img src={item.thumbnail} alt={item.thumbnail} />
      <p className="font-bold text-xl">
        {Number(item.price).toLocaleString("es-AR", {
          style: "currency",
          currency: item.currency_id,
        })}
      </p>
      <p>{item.title}</p>
      <hr />
      <p>{item.description}</p>
    </section>
  );
}
