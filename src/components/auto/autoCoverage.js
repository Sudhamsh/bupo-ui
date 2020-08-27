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
                <Text fontSize="3xl">Coverage</Text>
            </Stack>

            <SimpleGrid columns={1} maxW="200px">
                <FieldSelect
                    name="bodilyInjuryLimit"
                    label="Bodily Injury Limits"
                    placeholder="Select one..."
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
                        { value: '550', label: '$500,000/$500,000' },
                    ]}
                />

                <FieldSelect
                    name="propDamLiability"
                    label="Property Damage Liability"
                    placeholder="Select one..."
                    keepValue
                    options={[
                        { value: '5', label: '$5,000' },
                        { value: '10', label: '$10,000' },
                        { value: '15', label: '$15,000' },
                        { value: '20', label: '$20,000' },
                        { value: '25', label: '$25,000' },
                        { value: '50', label: '$50,000' },
                    ]}
                />

                <FieldSelect
                    name="medicalPayments"
                    label="Medical Payments"
                    placeholder="Select one..."
                    keepValue
                    options={[
                        { value: '1', label: '$1,000' },
                        { value: '2', label: '$2,000' },
                        { value: '3', label: '$3,000' },
                        { value: '4', label: '$4,000' },
                        { value: '5', label: '$5,000' },
                        { value: '10', label: '$10,000' },
                        { value: '25', label: '$25,000' },
                    ]}
                />

                <FieldSelect
                    name="uninsuredMotorist"
                    label="Uninsured/UnderInsured Motorist"
                    placeholder="Select one..."
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
                        { value: '550', label: '$500,000/$500,000' },
                    ]}
                />
            </SimpleGrid>
        </ThemeProvider>
        )
    }

}

export default Coverage;
