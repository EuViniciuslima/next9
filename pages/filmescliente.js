import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Movies() {
  const { query } = useRouter();
  const { data, error } = useSWR(`https://www.omdbapi.com/?apikey=59dad974&i=${query.id}`, fetcher);

  if (error) return <div>falha na requisição...</div>;
  if (!data) return <div>carregando...</div>;

  return (
    <div>
      <div>{data.Title} --- {data.Year} --- <img style={{ height: 200, marginLeft: 10 }} src={data.Poster} /></div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://www.omdbapi.com/?apikey=59dad974&i=${id}`);
  const data = await res.json();

  return {
    props: {
      initialData: data,
    },
  };
}

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}