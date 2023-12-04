import { Card as MyCard } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
/>

export default function ThePost({ data }) {
    if (data === null) return (<div>Não recurso solicitado pelo sistema</div>)
    if (!data) return (<div>carregando...</div>)
    if (data.error) {
        return (<div>Não recurso solicitado pelo sistema</div>)
    } else if (data.title) {
        return (
            <div>
                <MyCard style={{ width: '18rem', marginLeft: 50, marginTop: 30, marginBottom: 50 }}>
                    <MyCard.Body>
                        <MyCard.Title>{data.title} --- {data.id}</MyCard.Title>
                        <MyCard.Text>
                            {data.body}
                        </MyCard.Text>
                    </MyCard.Body>
                </MyCard>
            </div>
        )
    } else {
        return (<div>Não recurso solicitado pelo sistema</div>)
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: "1" } },
            { params: { id: "2" } },
            { params: { id: "3" } },
            { params: { id: "4" } },
            { params: { id: "5" } },
            { params: { id: "6" } },
            { params: { id: "7" } },
            { params: { id: "8" } },
            { params: { id: "9" } }
        ],
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        const data = await res.json();

        return {
            props: {
                data
            }
        }
    } catch (err) {
        return {
            props: {
                data: null
            }
        }
    }
}
