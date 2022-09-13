import React, { Component } from 'react'
import './Sidebar.css'
import SidebarLine from '../sidebarLine/SidebarLine'

export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <SidebarLine />
            </div>
        )
    }
}


