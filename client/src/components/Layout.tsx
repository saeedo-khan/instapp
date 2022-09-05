import { useRouter } from "next/router";
import React from "react";
import Footer from "./footer/Footer";
import Meta from './Meta'
import Navbar from './Nav/Navbar'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {

    return(
        <>
            <Meta />
            <Navbar />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Layout