import Cart from "../pages/Cart";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Root from "../pages/Root";

export const ROUTES = [
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />
                
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "detail/:id", 
                element: <Detail /> 
            }
            
          
        ]
    }
]