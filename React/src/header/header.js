import React from 'react'
import './header.css'
import { Button } from 'primereact/button'
import { MenuHeader } from '../menu-header/menu-header'

export const Header = (props) => {
    const { location } = props

    return (
        <header className="header-container">
            <div className="header">
                <div>
                    TeleFood{location.pathname}
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