
import logo from "../../assets/logo.svg"
import header from "./header.module.css"
import { Link } from "react-router-dom"

export function Header(){
    return(
        <header className={header.container}>
            <Link to="/"><img src={logo} alt="logo"></img></Link>
        </header>
    )
}