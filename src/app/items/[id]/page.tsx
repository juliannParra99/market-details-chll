export default async function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  //en este caso el endpoint va a ser el de un producto particular con un id particular, junto con sus respectivos datos: para eso cambio el endpoint(mirar el endopoint cuando s e accede a un producto particular y modificarlo)

  //dato a tener en cuenta, ver la diferencia de extraccion de datos,  en el src/app/page.tx los datos se extraen como array[] con objetos en el interior, en este caso no. Hay que prestar atencion a la arquitectura de la api
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
  //traigo la descripcion que va a venir desde otro lado, por eso no lo puedo extraer directamente del item, sino que tengo que modificar el endpoint para incluirle el /description
  //este va entre corchetes directamente, por que es solo un valor, entonces se le asigna el valor directamente (deduccion)
  const { plain_text } = await fetch(
    `https://api.mercadolibre.com/items/${id}/description`
  ).then(
    (res) =>
      res.json() as Promise<{
        plain_text: string;
      }>
  );

  console.log(id);

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
      <p>{plain_text}</p>
    </section>
  );
}
