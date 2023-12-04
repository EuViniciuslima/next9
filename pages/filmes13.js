import useSWR from 'swr'
import { useState } from 'react'

export default function Movies33() {
    const [state, setState] = useState({ url: '', titleSearchString: '' })

    const { data, error } = useSWR(state.url, async (u) => {
        if (!state.url || !state.titleSearchString) return { Search: '' }
        if (state.url === '' || state.titleSearchString === '') return { Search: '' }

        const res = await fetch(`${state.url}/?apiKey=6d17a1f&s=${state.titleSearchString}`)
        const json = await res.json();
        return json;
    })

    const onClickHandler = (e) => {
        e.preventDefault()
        const titleSearchString = document.getElementById('titleSearchString').value

        if (titleSearchString === '') {
            alert("Campo obrigatório")
        } else {
            if (state.url === '') {
                setState({ url: 'http://www.omdbapi.com', titleSearchString })
            } else {
                setState({ url: '', titleSearchString: state.titleSearchString })
            }
        }
    }

    return (
        <div>
            <TheForm />
            <TheLink url={state.url} handler={onClickHandler} />
            <TheMovies data={data ? data : { Search: '' }} show={state.url !== ''} />
        </div>
    )
}

export function TheForm() {
    return (
        <div>
            <form>
                <label htmlFor="titleSearchString">Filtro de Título</label>
                <input id="titleSearchString" name="titleSearchString" type="text" autoComplete="true" />
            </form>
        </div>
    )
}

export function TheMovies({ data, show }) {
    if (!data || !data.Search || !show) return <div></div>
    if (data.error) return <div>falha na pesquisa</div>
    if (data.Search === '') return <div>carregando...</div>

    return (
        <div>
            {data.Search.map((m) => (
                <div key={m.imdbID}>
                    {m.Title} --- {m.Year}
                </div>
            ))}
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
