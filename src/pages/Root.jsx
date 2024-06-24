import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { StickerCartProvider } from '../contexts/stickerCartContext'

const Root = () => {
    return (
        <>

            <StickerCartProvider>
                <Header />
                <Outlet />
                <Footer />
            </StickerCartProvider>
        </>
    )
}

export default Root