import React from 'react'
import './header.css'
import { MenuHeader } from '../menu-header/menu-header'

export const Header = (props) => {
    const { location } = props
    const sites = [
        { path: '/inbox', site: 'Inbox' },
        { path: '/nuevomensaje', site: 'Nuevo Mensaje' },
        { path: '/contactos', site: 'Contactos' },
        { path:'/vermensaje', site: 'Mensaje' }
    ]

    const searchSite = () => {
        return sites.find(page => location.pathname.toLowerCase().includes(page.path)).site
    }

    return (
        <header className="header-container">
            <div className="header">
                <div className="title-header">
                    TeleFood/{searchSite()}
                </div>            
                <div className="menu-header">
                    <MenuHeader/>
                </div>
            </div>
        </header>
    )
}

export default Header