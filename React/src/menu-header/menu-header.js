import React from 'react'
import { Menu } from 'primereact/menu'
import './menu-header.css'

export const MenuHeader = ({usuario}) => {
    
    const items = [
        {label: usuario, icon: 'pi pi-fw pi-user', url: ''},
        {label: 'Inbox', icon: 'pi pi-fw pi-inbox', url: '/inbox'},
        {label: 'Enviar', icon: 'pi pi-fw pi-arrow-circle-right', url: '/enviarMensaje'},
        {label: 'Salir', icon: 'pi pi-fw pi-sign-out', url: '/'}
    ]

    return(
        <div className="menu-header">
            <Menu model={items}/>
        </div>
    )
}