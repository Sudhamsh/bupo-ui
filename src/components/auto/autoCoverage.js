/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, {Component} from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack, } from "@chakra-ui/core";
import {FieldInput} from "../Fields/FieldInput"
import {FieldSelect} from "../Fields/FieldSelect"


class Coverage extends Component {
    render() {
        return (
        <ThemeProvider>
            <CSSReset />
            <Stack spacing={10}>
                <Text fontSize="3xl">Vehicle(s)</Text>
            </Stack>

            <SimpleGrid columns={1}>
                <FieldSelect
                    name="docker.user"
                    label="Bodily Injury Limits"
                    placeholder="Select one..."
                    required="Required"
                    keepValue
                    options={[
                        { value: '015', label: '$15,000/$30,000' },
                        { value: '024', label: '$20,000/$40,000' },
                        { value: '025', label: '$25,000/$50,000' },
                        { value: '036', label: '$30,000/$60,000' },
                        { value: '051', label: '$50,000/$100,000' },
                        { value: '120', label: '$100,000/$200,000' },
                        { value: '130', label: '$100,000/$300,000' },
                        { value: '330', label: '$300,000/$300,000' },
                        { value: '350', label: '$300,000/$500,000' },
                        { value: '550', label: '$500,000/$500,000 or higher' },
                    ]}
                />

                <FieldInput
                    name="make"
                    label=""
                    required="Make is required"
                    defaultValue="Sudhamsh"
                />
                <FieldInput
                    name="model"
                    label="Uninsured/Underinsured Motorist"
                    required="Model is required"
                    defaultValue="Bachu"
                />
                <FieldInput
                    name="year"
                    label="Comprehensive"
                    required="Year is required"
                    defaultValue="Sudhamsh"
                />
                <FieldInput
                    name="vin"
                    label="Collision"
                    defaultValue="Bachu"
                />
                <FieldInput
                    name="yearlyMileage"
                    label="Roadside Assistance"
                    required="Yearly Mileage is required"
                    defaultValue="6000"
                />
            </SimpleGrid>
        </ThemeProvider>
        )
    }

}

export default Coverage;
