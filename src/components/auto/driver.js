/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

class Driver extends Component{

    render(){
        return(
            <div>
                <h3>Driver Info</h3>
                <Form>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="dob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" min="1930-01-01" max="2020-01-01"/>
                    </Form.Group>
                    <Form.Group controlId="licenseAgeAt">
                        <Form.Label>First license at age of</Form.Label>
                        <Form.Control type="number" placeholder="16" />
                    </Form.Group>
                    <Form.Group controlId="maritalStatus">
                        <Form.Label>Home Ownership</Form.Label>
                        <Form.Control as="select">
                            <option>Married</option>
                            <option>Single</option>
                            <option>Widowed</option>
                            <option>Divorced</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
        )
    }

}

export default Driver;
