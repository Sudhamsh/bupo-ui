/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack, } from "@chakra-ui/core";
import {FieldInput} from "../Fields/FieldInput"
import {FieldSelect} from "../Fields/FieldSelect"

class Automobile extends Component{
    render(){
        return(
            <ThemeProvider>
                <CSSReset />
                <Stack spacing={10}>
                    <Text fontSize="3xl">Vehicle(s)</Text>
                </Stack>

                <SimpleGrid columns={1}>
                    <FieldInput
                        name="year"
                        label="Year"
                        required="Year is required"
                        defaultValue="2000"
                        type="number"
                    />
                    <FieldSelect
                        name="make"
                        label="Make"
                        placeholder="Select one..."
                        required="Required"
                        keepValue
                        options={[
                            { value: 'own', label: 'Own' },
                            { value: 'rent', label: 'Rent' },
                        ]}
                    />
                    <FieldInput
                        name="model"
                        label="Model"
                        required="Model is required"
                        defaultValue="Bachu"
                    />
                    <FieldInput
                        name="vin"
                        label="VIN #"
                        defaultValue="Bachu"
                    />
                    <FieldInput
                        name="yearlyMileage"
                        label="Yearly Mileage"
                        required="Yearly Mileage is required"
                        defaultValue="6000"
                    />
                </SimpleGrid>
            </ThemeProvider>
            // {/*<div>*/}
            //     {/*<Form>*/}
            //         {/*<Form.Group controlId="make">*/}
            //             {/*<Form.Label>Make</Form.Label>*/}
            //             {/*<Form.Control type="text" placeholder="" />*/}
            //         {/*</Form.Group>*/}
            //         {/*<Form.Group controlId="model">*/}
            //             {/*<Form.Label>Model</Form.Label>*/}
            //             {/*<Form.Control type="text" placeholder="" />*/}
            //         {/*</Form.Group>*/}
            //         {/*<Form.Group controlId="year">*/}
            //             {/*<Form.Label>Year</Form.Label>*/}
            //             {/*<Form.Control type="number"  maxlength="4"/>*/}
            //         {/*</Form.Group>*/}
            //         {/*<Form.Group controlId="vin">*/}
            //             {/*<Form.Label>VIN #</Form.Label>*/}
            //             {/*<Form.Control type="text" placeholder="16" />*/}
            //         {/*</Form.Group>*/}
            //         {/*<Form.Group controlId="yearlyMileage">*/}
            //             {/*<Form.Label>Expected Yearly Mileage</Form.Label>*/}
            //             {/*<Form.Control type="number" placeholder="" maxlength="6"/>*/}
            //         {/*</Form.Group>*/}
            //     {/*</Form>*/}
            // {/*</div>*/}
        )
    }

}

export default Automobile;
