export default function Movies({ data }) {

    const [movies, setMovies] = useState(data.Search)
    const [filteredMovies, setFilteredMovies] = useState(data.Search)

    function filterMoviesByName(name) {

        if (name === "") {
            setFilteredMovies(movies)
        } else {
            let listOfMoviesFiltered = movies.filter((m) => m.Title.toLowerCase().includes(name.toLowerCase()))
            setFilteredMovies(listOfMoviesFiltered)

        }
    }

    function filterMoviesByYear(year) {
        if (year === "") {
            setFilteredMovies(movies)
        } else {
            let listOfMoviesFiltered = movies.filter((m) => m.Year === year)
            setFilteredMovies(listOfMoviesFiltered)

        }
    }

    return (
        <div>

            <div style={{ marginBottom: 30 }}>
                <h4>Digite o nome do filme</h4>
                <input type="text" id="filme" style={{ marginBottom: 10 }}></input>

                <button style={{ margin: 10 }} onClick={() => window.location.href = "/movies?s=" + document.getElementById("filme").value}>ACESSAR</button>
            </div>

            <div style={{ marginBottom: 30 }}>
                <h4>Filtre pelo nome</h4>

                <input type="text" id="name" style={{ marginBottom: 10 }}></input>

                <button style={{ margin: 10 }} onClick={() => filterMoviesByName(document.getElementById("name").value)}>Filtrar</button>
            </div>

            <div style={{ marginBottom: 30 }}>
                <h4>Filtre pelo ano</h4>

                <input type="text" id="year" style={{ marginBottom: 10 }}></input>

                <button style={{ margin: 10 }} onClick={() => filterMoviesByYear(document.getElementById("year").value)}>Filtrar</button>
            </div>

            <div>

                {filteredMovies.map((m, i) => <div key={i}>{m.Title} --- {m.Year}
                <img style={{height: 200, marginLeft: 300}} src={m.Poster}></img>
                </div>)}

            </div>

        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=59dad974&s=${context.query.s != null ? context.query.s : "bagdad"}`)

    const data = await res.json()

    return {
        props: {
            data
        }
    }
}