/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, {Component} from 'react'
import {Form} from 'react-bootstrap';

class Coverage extends Component {
    render() {
        if (this.props.currentStep !== 'Coverage') { // Prop: The current step
            return null
        }
        return (
            <div>Coverage
                <Form>
                    <Form.Group controlId="firstName">
                        <Form.Label>Bodily Injury Limits</Form.Label>
                        <Form.Control type="select" placeholder="">
                            <option value=""></option>
                            <option value="015">$15,000/$30,000</option>
                            <option value="024">$20,000/$40,000</option>
                            <option value="025">$25,000/$50,000</option>
                            <option value="036">$30,000/$60,000</option>
                            <option value="051">$50,000/$100,000</option>
                            <option value="120">$100,000/$200,000</option>
                            <option value="130">$100,000/$300,000</option>
                            <option value="330">$300,000/$300,000</option>
                            <option value="350">$300,000/$500,000</option>
                            <option value="550">$500,000/$500,000 or higher</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Uninsured/Underinsured Motorist</Form.Label>
                        <Form.Control type="text" placeholder=""/>
                    </Form.Group>
                    <Form.Group controlId="dob">
                        <Form.Label>Comprehensive</Form.Label>
                        <Form.Control type="date"/>
                    </Form.Group>
                    <Form.Group controlId="licenseAgeAt">
                        <Form.Label>Collision</Form.Label>
                        <Form.Control type="number" placeholder="16"/>
                    </Form.Group>
                    <Form.Group controlId="marritalStatus">
                        <Form.Label>Roadside Assistance</Form.Label>
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

export default Coverage;
