/**
 * Created by sudhamshbachu on 6/1/20.
 */

import React, { Component } from 'react'
import { Form,ButtonGroup,Button } from 'react-bootstrap';

import { Formiz, useForm } from '@formiz/core';
import  {isEmail}  from '@formiz/validations'
import {MyField} from "../MyField"

import {
    Container,
    Jumbotron,
    Row,
    Col,
    InputGroup,
    FormControl,
} from 'react-bootstrap'


export default function  AutoPolicyRequest(props){

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <MyField
                        name="fName"
                        label="First Name"
                        required="First Name is required"
                        defaultValue="Sudhamsh"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MyField
                        name="lName"
                        label="Last Name"
                        required="Last Name is required"
                        defaultValue="Bachu"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MyField
                            name="phone"
                            label="Phone"
                            required="Phone is required"
                            defaultValue="480-123-1234"

                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MyField
                            name="email"
                            label="Email"
                            type="email"
                            required="Email is required"
                            defaultValue="a@a.com"
                            validations={[
                                {
                                    rule: isEmail(),
                                    message: 'Not a valid email',
                                }
                            ]}

                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

