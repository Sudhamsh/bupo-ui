/**
 * Created by sudhamshbachu on 5/29/20.
 */
import React, { Component } from 'react'
import {FieldInput} from "./Fields/FieldInput"
import {FieldSelect} from "./Fields/FieldSelect"
import { ThemeProvider,CSSReset } from "@chakra-ui/core";
import { SimpleGrid,
        Stack,
        Text,
        } from "@chakra-ui/core";
import { isLength } from '@formiz/validations'



class GeneralInfo extends Component{
    render(){

        return(
        <ThemeProvider>
            <CSSReset />

            <Stack spacing={10}>
                <Text fontSize="3xl">General Information</Text>
            </Stack>

            <SimpleGrid columns={1} maxW="200px">
                <FieldSelect
                    name="homeOwnership"
                    label="Home Ownership"
                    placeholder="Select one..."
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
                    defaultValue="44038 Renoir Ter"
                />
                <FieldInput
                    name="aptNo"
                    label="Apt No #"
                    defaultValue=""
                    type="number"
                />
                <FieldInput
                    name="city"
                    label="City"
                    required="City is required"
                    defaultValue="Fremont"
                />
                <FieldInput
                    name="state"
                    label="State"
                    required="State is required"
                    defaultValue="CA"
                />
                <FieldInput
                    name="zip"
                    label="Zip"
                    required="Zip is required"
                    defaultValue="40000"
                    type="number"
                    validations={[
                        {
                            rule: isLength(5),
                            message: 'Zip should be 5 digits (xxxxx)',
                        },
                    ]}
                />

            </SimpleGrid>
        </ThemeProvider>
        )
    }

}

export default GeneralInfo;