import React from 'react'
import SideBar from '../welcome/Sidebar/Sidebar'
import Footer from '../welcome/Footer'
import WelcomeNav from '../welcome/Navbar/WelcomeNavbar'
import Table from './Table'

const Inventory = () => {
    return (
        <div>
            <WelcomeNav />
            <Table/>
            <SideBar />
            <Footer />
        </div>
    )
}

export default Inventory
