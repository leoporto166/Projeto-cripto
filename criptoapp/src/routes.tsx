
import { createBrowserRouter } from "react-router-dom";
import {Home} from "./pages/Home"
import {Detalhes} from "./pages/Detail"
import {NotFound} from "./pages/Erro"
import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
    
    {
        path:"/",
        element: <Home />,

    },
    {
        path:"/detalhes/:id",
        element: <Detalhes />
    },
    {
        path:"*",
        element: <NotFound />
    }
]


}

])

export{router}