import React, { Component } from 'react'
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { usuarioService } from '../services/usuario-service'

export class MenuHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };

    }
    
    componentDidMount() {
        const items = [
            { label: usuarioService.userLogged.nombreYApellido, icon: 'pi pi-fw pi-user', disabled: true },
            { separator: true },
            { label: 'Inbox', icon: 'pi pi-fw pi-inbox', url: '/inbox' },
            { label: 'Enviar', icon: 'pi pi-fw pi-arrow-circle-right', url: '/contactos' },
            { label: 'Salir', icon: 'pi pi-fw pi-sign-out', url: '/' }
        ]

        this.setState({
            items,
        })
    }

    render() {
        return (
            <div>
                <Menu model={this.state.items} popup ref={el => this.menu = el} id="popup_menu" />
                <Button icon="pi pi-bars" onClick={(event) => this.menu.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
        )
    }
}