/**
 * Created by sudhamshbachu on 5/29/20.
 */
import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import {FieldInput} from "./Fields/FieldInput"
import {FieldSelect} from "./Fields/FieldSelect"
import { ThemeProvider,CSSReset } from "@chakra-ui/core";
import { SimpleGrid,
        Stack,
        Text,
        } from "@chakra-ui/core";



class GeneralInfo extends Component{
    render(){

        return(
        <ThemeProvider>
            <CSSReset />

            <Stack spacing={10}>
                <Text fontSize="3xl">General Information</Text>
            </Stack>

            <SimpleGrid columns={1}>
                <FieldSelect
                    name="docker.user"
                    label="Home Ownership"
                    placeholder="Select one..."
                    required="Required"
                    keepValue
                    options={[
                        { value: 'own', label: 'Own' },
                        { value: 'rent', label: 'Rent' },
                    ]}
                />
                <FieldInput
                    name="addressFirstLine"
                    label="Address First Line"
                    required="First Name is required"
                    defaultValue="Sudhamsh"
                />
                <FieldInput
                    name="aptNo"
                    label="Apt No #"
                    required="First Name is required"
                    defaultValue="400"
                    type="number"
                />
                <FieldInput
                    name="city"
                    label="City"
                    required="First Name is required"
                    defaultValue="Sudhamsh"
                />
                <FieldInput
                    name="state"
                    label="State"
                    required="First Name is required"
                    defaultValue="Sudhamsh"
                />
                <FieldInput
                    name="zip"
                    label="Zip"
                    required="First Name is required"
                    defaultValue="400"
                    type="number"
                />

            </SimpleGrid>
        </ThemeProvider>
        )
    }

}

export default GeneralInfo;