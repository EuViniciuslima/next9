import useSWR from 'swr'
import { useState } from 'react'

export default function Movies3() {
    const [urls, setUrls] = useState(['', '', ''])
    const [inputs, setInputs] = useState(['', '', ''])

    const results = urls.map((url, index) => useSWR(url, theFetcher))

    const onClickHandler = (index) => (e) => {
        e.preventDefault()
        const newUrls = [...urls]
        const newInputs = [...inputs]

        if (newUrls[index] === '') newUrls[index] = `https://www.omdbapi.com/?apikey=59dad974&s=${newInputs[index]}`
        else newUrls[index] = ''

        setUrls(newUrls)
    }

    const setInput = (index) => (value) => {
        const newInputs = [...inputs]
        newInputs[index] = value
        setInputs(newInputs)
    }

    return (
        <div>
            {[1, 2, 3].map((i) => (
                <div key={i} style={{ marginBottom: 30 }}>
                    <h4>Digite o nome do filme</h4>
                    <input
                        type="text"
                        id={`filme${i}`}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => setInput(i - 1)(e.target.value)}
                    />
                    <button
                        style={{ margin: 10 }}
                        onClick={onClickHandler(i - 1)}
                    >
                        {urls[i - 1] === '' ? 'REQUISITAR' : 'CANCELAR'}
                    </button>
                    <TheLink url={urls[i - 1]} handler={onClickHandler(i - 1)} />
                    <TheMovies data={results[i - 1].error ? { error: 'Erro na pesquisa' } : results[i - 1].data ? results[i - 1].data : { Search: '' }} show={urls[i - 1] !== ''} />
                </div>
            ))}
        </div>
    )
}

export function TheMovies({ data, show }) {
    if (!data.Search || !show) return <div></div>

    if (data.error) return <div>falha na requisição</div>

    if (data.Search === '') return <div>carregando...</div>

    const [urlMovie, setUrlMovie] = useState('')

    const movie = useSWR(urlMovie, theFetcher)

    const showMovie = (imdbID) => {
        setUrlMovie(`https://www.omdbapi.com/?apikey=59dad974&i=${imdbID}`)
    }

    return (
        <div>
            <div style={{ margin: 100 }}>{movie.data ? <TheMovie data={movie.data} error={movie.error} /> : ''}</div>
            {data.Search.map((m, i) => (
                <div key={i}>
                    <div style={{ cursor: 'pointer' }} onClick={() => { window.location.href = `/movieclient?id=${m.imdbID}` }}>{m.Title} --- {m.Year}</div>
                    <button onClick={() => showMovie(m.imdbID)} style={{ marginBottom: 50, cursor: 'pointer' }}>MOSTRAR</button>
                </div>
            ))}
        </div>
    )
}

export function TheMovie({ data, error }) {
    if (error) return <div>falha na requisição...</div>

    if (!data) return <div>carregando...</div>

    return (
        <div>
            <div>{data.Title} --- {data.Year} --- <img style={{ height: 200, marginLeft: 10 }} src={data.Poster} /></div>
        </div>
    )
}

export function TheLink({ url, handler }) {
    return (
        <div>
            <a href="#" onClick={handler}> {url === '' ? 'Mostrar' : 'Ocultar'} </a>
        </div>
    )
}

async function theFetcher(url) {
    if (url === null || url === '') return { Search: '' }

    const res = await fetch(url)
    const json = await res.json()

    return json
}
