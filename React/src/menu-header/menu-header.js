import React from 'react'
import { Menu } from 'primereact/menu'
import './menu-header.css'

const items = [
    {label: 'Pepe Palala', icon: 'pi pi-fw pi-user'},
    {label: 'Inbox', icon: 'pi pi-fw pi-inbox'},
    {label: 'Enviar', icon: 'pi pi-fw pi-arrow-circle-right'},
    {label: 'Salir', icon: 'pi pi-fw pi-sign-out'}
]

export const MenuHeader = () => (
    <div className="menu-header">
        <Menu model={items}/>
    </div>
)