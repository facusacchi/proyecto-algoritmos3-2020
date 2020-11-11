import React from 'react'
import './header.css'
import { MenuHeader } from '../menu-header/menu-header'

export const Header = (props) => {
    const { location } = props
    const sites = [
        {path: '/inbox', site: 'Inbox'},
        {path: '/nuevoMensaje', site: 'Nuevo Mensaje'}
    ]

    const searchSite = () => {
        return sites.find(page => page.path === location.pathname).site
    }

    return (
        <header className="header-container">
            <div className="header">
                <div className="title-header">
                    TeleFood/{searchSite()}
                </div>            
                <div className="menu-header">
                    <MenuHeader usuario="Pepe Palala" />
                </div>
            </div>
        </header>
    )
}

export default Header