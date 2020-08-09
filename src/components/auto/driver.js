/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack, } from "@chakra-ui/core";
import {FieldInput} from "../Fields/FieldInput"

class Driver extends Component{

    render(){
        return(
        <ThemeProvider>
            <CSSReset />
            <Stack spacing={10}>
                <Text fontSize="3xl">Driver Info</Text>
            </Stack>

            <SimpleGrid columns={1}>
                <FieldInput
                    name="fName"
                    label="First Name"
                    required="First Name is required"
                    defaultValue="Sudhamsh"
                />
                <FieldInput
                    name="lName"
                    label="Last Name"
                    required="Last Name is required"
                    defaultValue="Bachu"
                />
                <FieldInput
                    name="dob"
                    label="Date of Birth"
                    required="Date of Birth is required"
                    defaultValue="01/01/1980"
                    type="date"
                />
                <FieldInput
                    name="licenseAgeAt"
                    label="First License At"
                    required="First License At"
                    defaultValue="Bachu"
                />
                <FieldInput
                    name="licenseAgeAt"
                    label="Home Ownership"
                    required="First License At"
                    defaultValue="Bachu"
                />
            </SimpleGrid>
        </ThemeProvider>
            // <div>
            //     <h3></h3>
            //     <Form>
            //
            //         <Form.Group controlId="dob">
            //             <Form.Label>Date of Birth</Form.Label>
            //             <Form.Control type="date" min="1930-01-01" max="2020-01-01"/>
            //         </Form.Group>
            //         <Form.Group controlId="licenseAgeAt">
            //             <Form.Label>First license at age of</Form.Label>
            //             <Form.Control type="number" placeholder="16" />
            //         </Form.Group>
            //         <Form.Group controlId="maritalStatus">
            //             <Form.Label>Home Ownership</Form.Label>
            //             <Form.Control as="select">
            //                 <option>Married</option>
            //                 <option>Single</option>
            //                 <option>Widowed</option>
            //                 <option>Divorced</option>
            //             </Form.Control>
            //         </Form.Group>
            //     </Form>
            // </div>
        )
    }

}

export default Driver;
