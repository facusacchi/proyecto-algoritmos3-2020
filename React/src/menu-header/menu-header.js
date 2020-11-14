import React, { Component } from 'react'
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

export class MenuHeader extends Component {

    constructor(props) {
        super(props);

        this.items = [
            /* {
                label: this.props.usuario,
                items: [ */
            { label: this.props.usuario, icon: 'pi pi-fw pi-user', disabled: true },
            { separator: true },
            { label: 'Inbox', icon: 'pi pi-fw pi-inbox', url: '/inbox' },
            { label: 'Enviar', icon: 'pi pi-fw pi-arrow-circle-right', url: '/contactos' },
            { label: 'Salir', icon: 'pi pi-fw pi-sign-out', url: '/' }
        ]
        /*  }
     ] */
    }

    render() {
        return (
            <div>
                <Menu model={this.items} popup ref={el => this.menu = el} id="popup_menu" />
                <Button icon="pi pi-bars" onClick={(event) => this.menu.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
        )
    }
}