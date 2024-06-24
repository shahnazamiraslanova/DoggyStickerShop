import { createContext, useState } from "react";
const StickerCartContext = createContext()

function StickerCartProvider({children}) {
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem("basket")) || []);

    return (
        <StickerCartContext.Provider value={{ basket,setBasket }}>
            {children}
        </StickerCartContext.Provider>
    )
}
export { StickerCartProvider, StickerCartContext }