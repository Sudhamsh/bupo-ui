/**
 * Created by sudhamshbachu on 6/1/20.
 */

import React, { useState,Component,useEffect, } from 'react'
import { Form,ButtonGroup,Button } from 'react-bootstrap';

import { Formiz, useForm } from '@formiz/core';
import  {isEmail}  from '@formiz/validations'
import {FieldInput} from "./Fields/FieldInput"
import {FieldAutoComplete} from "./Fields/FieldAutoComplete"
import { ChakraProvider,CSSReset,SimpleGrid,Text,Stack,Box, } from "@chakra-ui/react";

export const PolicyRequest = (props) => {
    const { policyData } = props;
    const [apiResp, setApiResp] = useState([]);

    return (
    <ChakraProvider>

        <Stack spacing={10}>
            <Text fontSize="3xl">Basic Information</Text>
        </Stack>

        <Box alignItems="center">
            <SimpleGrid columns={1} maxW="200px" >

                <FieldInput
                    name="firstName"
                    label="First Name"
                    defaultValue={policyData ?  policyData.firstName : "Sudhamsh"}
                    required="First Name is required"

                />
                <FieldInput
                    name="lastName"
                    label="Last Name"
                    required="Last Name is required"
                    defaultValue={policyData ?  policyData.lastName : "Bachu"}
                />
                <FieldInput
                    name="phone"
                    label="Phone"
                    required="Phone is required"
                    defaultValue={policyData ?  policyData.phone : "480-123-1234"}
                    type="tel"

                />
                <FieldInput
                    name="email"
                    label="Email"
                    type="email"
                    required="Email is required"
                    defaultValue={policyData ?  policyData.email : "a@a.com"}
                    validations={[
                        {
                            rule: isEmail(),
                            message: 'Not a valid email',
                        }
                    ]}

                />
            </SimpleGrid>
        </Box>

    </ChakraProvider>



    )
}

export default PolicyRequest;

