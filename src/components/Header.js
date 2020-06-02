/**
 * Created by sudhamshbachu on 5/16/20.
 */
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from 'react-bootstrap';
import React from 'react'

export default function Header() {

    return (
        <Nav className="justify-content-center"
             activeKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topics">Contact</Nav.Link>
            </Nav.Item>
        </Nav>
    )

}

