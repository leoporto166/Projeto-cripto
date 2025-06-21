
import { Link, useNavigate  } from "react-router-dom"
import home from "./home.module.css"
import { BsSearch } from "react-icons/bs"
import { useState, type FormEvent, useEffect } from "react"

export interface ApiProps{
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    vwap24Hr: string;
    changePercent24Hr: string;
    rank: string;
    maxSupply:string;
    supply: string
    marketCapUsd: string
    volumeUsd24Hr: string;
    explorer: string;
    precoFormatado?: string;
    marketFormatado?: string;
    volumeFormatado?: string;
    mudancaFormatado24?: string;
}

interface DataProps{
    data: ApiProps[]
}


export function Home(){
    const [input, setInput] = useState("")
    const [api, setApi] = useState<ApiProps[]>([])
    const[offSet, setOffSet] = useState(0)



    const navigate = useNavigate()

    function pesquisa(e: FormEvent){
        e.preventDefault();

        if(input === "") return;

        navigate(`/detalhes/${input}`)
    }

    function handleGetMore(){

        if(offSet === 0){
            setOffSet(10)
        } else{
            setOffSet(offSet + 10)
        }
        

    }

    useEffect(() => {
        getData();
    }, [offSet])

    async function getData() {
        fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offSet}&apiKey=af8f8e664700c3f359e5119955b33df610b4f0f7584678aeb537c45ed63f8dee`)
        .then(response => response.json())
        .then((data: DataProps)=> {
            const apiData = data.data

            const price = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            })

             const priceCompact = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
            })

            const resultadoFormatado = apiData.map((item) => {
                const formatado = {
                    ...item,
                    precoFormatado: price.format(Number(item.priceUsd)),
                    marketFormatado: priceCompact.format(Number(item.marketCapUsd)),
                    volumeFormatado: priceCompact.format(Number(item.volumeUsd24Hr)),
                    mudancaFormatado24: Number(item.changePercent24Hr).toFixed(2),
                }
                return formatado
            })

            const addMoedas = [...api, ...resultadoFormatado]
            setApi(addMoedas);

        })
        
    }
    return(
        
        <main className={home.container}>
            <form className={home.form} onSubmit={pesquisa}>
                <input
                type="text"
                placeholder="Nome da moeda"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />

                <button>
                    <BsSearch size={30} color="#FFF"></BsSearch>
                </button>

            </form>

            <table className={home.table}>
                <thead className={home.thead}>
                    <tr>
                        <th scope="col">Moeda</th>
                        <th scope="col">Valor Mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Mudança 24h</th>
                    </tr>
                </thead>
                
                <tbody id="tbody">
                
                    {api.map((item) => (
                     <tr className={home.tr} key={item.id}>

                        

                        <td className={home.td} data-label="Moeda">
                        <div>
                            <img 
                            className={home.img}
                            src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}>
                            </img>
                            <Link to={`/detalhes/${item.id}`}>
                            <span>{item.name}</span> | {item.symbol}
                            </Link>
                        </div>
                    </td>

                    <td className={home.td} data-label="Valor Mercado">
                        {item.marketFormatado}
                    </td>

                    <td className={home.td} data-label="Preço">
                        {item.precoFormatado}
                    </td>

                    <td className={home.td} data-label="Volume">
                        {item.volumeFormatado}
                        
                    </td>

                    {Number(item.mudancaFormatado24) < 0 && (
                         <td className={home.tdLoss} data-label="Mudança 24h">
                        <span>{item.mudancaFormatado24}%</span>
                    </td>
                    )}
                    {Number(item.mudancaFormatado24) >= 0 && (
                         <td className={home.tdProfit} data-label="Mudança 24h">
                        <span>{item.mudancaFormatado24}%</span>
                    </td>
                    )}

                     </tr>
                    ))}

                
            </tbody>
            </table>

            <button className={home.button} onClick={handleGetMore}>Mostrar Mais</button>

            
        </main>
    )
}