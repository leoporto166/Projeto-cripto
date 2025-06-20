
import { Link } from "react-router-dom"
import home from "./home.module.css"
import { BsSearch } from "react-icons/bs"

export function Home(){
    return(
        
        <main className={home.container}>
            <form className={home.form}>
                <input
                type="text"
                placeholder="Nome da moeda"
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
                <tr className={home.tr}>
                    <td className={home.td} data-label="Moeda">
                        <div>
                            <Link to={"/detalhes/bitcoin"}>
                            <span>Bitcoin</span> | BTC
                            </Link>
                        </div>
                    </td>

                    <td className={home.td} data-label="Valor Mercado">
                        1T
                    </td>

                    <td className={home.td} data-label="Preço">
                        8.000
                    </td>

                    <td className={home.td} data-label="Volume">
                        2B
                    </td>

                    <td className={home.tdProfit} data-label="Mudança 24h">
                        <span>1.20</span>
                    </td>

                </tr>
            </tbody>
            </table>

            
        </main>
    )
}