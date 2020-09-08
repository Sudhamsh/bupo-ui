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



export const GeneralInfo = (props) => {
    const { policyData } = props;

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
                    defaultValue={policyData ?  policyData.homeOwnership : ""}
                    options={[
                        { value: 'own', label: 'Own' },
                        { value: 'rent', label: 'Rent' },
                    ]}
                />
                <FieldInput
                    name="address.firstLine"
                    label="Address First Line"
                    required="First Name is required"
                    defaultValue={policyData && policyData.address ?  policyData.address.firstLine : "44038 Renoir Ter"}
                />
                <FieldInput
                    name="address.aptNo"
                    label="Apt No #"
                    defaultValue={policyData && policyData.address ?  policyData.address.aptNo : ""}
                    type="number"
                />
                <FieldInput
                    name="address.city"
                    label="City"
                    required="City is required"
                    defaultValue={policyData && policyData.address ?  policyData.address.city : "Fremont"}
                />
                <FieldInput
                    name="address.state"
                    label="State"
                    required="State is required"
                    defaultValue={policyData && policyData.address ?  policyData.address.state : "CA"}
                />
                <FieldInput
                    name="address.zip"
                    label="Zip"
                    required="Zip is required"
                    defaultValue={policyData && policyData.address ?  policyData.address.zip : "40000"}
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

export default GeneralInfo;