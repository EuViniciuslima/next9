export default function Movies({ data }) {
    return (
      <div>
        <div>{data.Title} --- {data.Year} --- <img style={{ height: 200, marginLeft: 10 }} src={data.Poster} /></div>
      </div>
    );
  }
  
  export async function getServerSideProps(context) {
    const id = context.query.id != null ? context.query.id : "tt0095801";
    const res = await fetch(`https://www.omdbapi.com/?apikey=59dad974&i=${id}`);
    const data = await res.json();
  
    return {
      props: {
        data
      }
    };
  }
  