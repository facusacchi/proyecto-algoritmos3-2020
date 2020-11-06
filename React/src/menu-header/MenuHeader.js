import React from 'react'
import { Menu } from 'primereact/menu'

let items = [
    {label: 'New', icon: 'pi pi-fw pi-plus'},
    {label: 'Delete', icon: 'pi pi-fw pi-trash'}
]

export const MenuHeader = () => {
    return (
        <div>
            <Menu model={items}/>
        </div>
    )
}