import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LoginComponent from './login'
import InboxComponent from './inbox'
import verMensajeComponent from './verMensaje'
import ContactosComponent from './contactos'
import nuevoMensajeComponent from './nuevoMensaje'

export const MensajesRoutes = () => (
    <Router>
        <Route exact={true} path="/login" component={LoginComponent} />
        <Route path="/inbox" component={InboxComponent} />
        <Route path="/verMensaje/:id" component={verMensajeComponent} />
        <Route path="/contactos" component={ContactosComponent} />
        <Route path="/nuevoMensaje" component={nuevoMensajeComponent} />
    </Router>
)
