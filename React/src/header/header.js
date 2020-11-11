import React from 'react'
import './header.css'
import { Button } from 'primereact/button'
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
                <div>
                    TeleFood/{searchSite()}
                </div>
                <div>
                    <Button icon="pi pi-list" />
                </div>
                <MenuHeader usuario="Pepe Palala" />
            </div>
        </header>
    )
}

export default Header