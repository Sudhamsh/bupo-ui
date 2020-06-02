/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

class Automobile extends Component{
    render(){
        if (this.props.currentStep !== 'Automobile') { // Prop: The current step
            return null
        }
        return(
            <div>Car(s)
                <Form>
                    <Form.Group controlId="make">
                        <Form.Label>Make</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number"  maxlength="4"/>
                    </Form.Group>
                    <Form.Group controlId="vin">
                        <Form.Label>VIN #</Form.Label>
                        <Form.Control type="text" placeholder="16" />
                    </Form.Group>
                    <Form.Group controlId="yearlyMileage">
                        <Form.Label>Expected Yearly Mileage</Form.Label>
                        <Form.Control type="number" placeholder="" maxlength="6"/>
                    </Form.Group>
                </Form>
            </div>
        )
    }

}

export default Automobile;
