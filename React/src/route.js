import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LoginComponent from './login/login'
import InboxComponent from './inbox/inbox'
import VerMensajeComponent from './verMensaje/verMensaje'
import ContactosComponent from './contactos/contactos'
import NuevoMensajeComponent from './nuevoMensaje/nuevoMensaje'
import Header from './header/header'

export const MensajesRoutes = () => (
    <Router>
        <Route exact={true} path="/" component={LoginComponent} />
        <Route path="/(.+)" component={Header} />
        <Route path="/inbox" component={InboxComponent} />
        <Route path="/verMensaje/:id" component={VerMensajeComponent} />
        <Route path="/contactos" component={ContactosComponent} />
        <Route path="/nuevoMensaje" component={NuevoMensajeComponent} />
    </Router>
)
