/**
 * Created by sudhamshbachu on 6/1/20.
 */

import React, { Component } from 'react'
import { Form,ButtonGroup,Button } from 'react-bootstrap';

class AutoPolicyRequest extends Component{

    render(){
        if (this.props.currentStep !== 'AutoPolicyRequest') { // Prop: The current step
            return null
        }
        return (
            <div>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Address" />
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

}

export default   AutoPolicyRequest;