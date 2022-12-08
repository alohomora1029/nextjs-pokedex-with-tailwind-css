import Layout from "../components/Layout";
import Link from "next/link";


export default function pokemon({ pokeman }) {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
      <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
      <p>
        <span className="fon-bold mr-2">Weight:</span>
        {pokeman.weight}
      </p>
      <p>
        <span className="fon-bold mr-2">Height:</span>
        {pokeman.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
            {pokeman.types.map((type, index) => (
                <p key="index">{type.type.name}</p>
            ))}
      <div className="mt-10 text-center">
        <Link href="/" passHref>
          <p className="text-2xl underline">Home</p>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    pokeman.image = image;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
