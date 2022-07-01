import React from 'react';
import './styles/Layout.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Outlet, Link } from "react-router-dom";
import Auth from './auth/Auth'

const Layout = () => {

    return (
        <Container>
            <nav className='navbar'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/create'>Create</Link>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </Container>
    )
}

export default Layout;