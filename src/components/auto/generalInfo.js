/**
 * Created by sudhamshbachu on 5/29/20.
 */
import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

class AutoGeneralInfo extends Component{
    render(){
        console.log("this.props.currentStep " + this.props.currentStep);
        if (this.props.currentStep !== 'AutoGeneralInfo') { // Prop: The current step
            return null
        }
        return(
            <div>
                    <Form.Group controlId="homeOwnership">
                        <Form.Label>Home Ownership</Form.Label>
                        <Form.Control as="select">
                            <option>Own</option>
                            <option>Rent</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="addressFirstLine">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" />
                    </Form.Group>
                    <Form.Group controlId="aptNo">
                        <Form.Label>Apt #</Form.Label>
                        <Form.Control type="text" placeholder="#" />
                    </Form.Group>
                    <Form.Group controlId="City">
                        <Form.Label>Apt #</Form.Label>
                        <Form.Control type="text" placeholder="City" />
                    </Form.Group>
                    <Form.Group controlId="zip">
                        <Form.Label>5 digit Zip Code</Form.Label>
                        <Form.Control type="number" placeholder="12345" />
                    </Form.Group>

            </div>
        )
    }

}

export default AutoGeneralInfo;