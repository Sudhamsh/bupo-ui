/**
 * Created by sudhamshbachu on 5/29/20.
 */
import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import {MyField} from "../MyField"

import {
    Container,
    Jumbotron,
    Row,
    Col,
    InputGroup,
    FormControl,
} from 'react-bootstrap'

class AutoGeneralInfo extends Component{
    render(){

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <MyField
                                name="fName"
                                label="Home Ownership"
                                required="First Name is required"
                                defaultValue="Sudhamsh"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MyField
                                name="addressFirstLine"
                                label="Address First Line"
                                required="First Name is required"
                                defaultValue="Sudhamsh"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MyField
                                name="aptNo"
                                label="Apt No #"
                                required="First Name is required"
                                defaultValue="Sudhamsh"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MyField
                                name="city"
                                label="City"
                                required="First Name is required"
                                defaultValue="Sudhamsh"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MyField
                                name="state"
                                label="State"
                                required="First Name is required"
                                defaultValue="Sudhamsh"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MyField
                                name="zip"
                                label="Zip"
                                required="First Name is required"
                                defaultValue="Sudhamsh"
                            />
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }

}

export default AutoGeneralInfo;