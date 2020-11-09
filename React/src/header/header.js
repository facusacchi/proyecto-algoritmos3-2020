import React from 'react'
import './header.css'
import { Button } from 'primereact/button'
import { withRouter } from 'react-router-dom'

export const Header = (props) => {
    const { location } = props
    console.log('location', location)
    
    return (
        <header className="header-container">
            <div className="header">
                <div>
                    TeleFood/
                </div>
                <div>
                    <Button icon="pi pi-list"/>
                </div>
            </div>
        </header>
)}

export default withRouter(Header)