/**
 * Created by sudhamshbachu on 6/1/20.
 */

import React, { Component } from 'react'
import { Form,ButtonGroup,Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";


export default function  Address(props){

    return (
        <div>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name ="firstName" placeholder="FirstName" />

                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Never Sold and Never Shared" />
                </Form.Group>

        </div>
    )
}

