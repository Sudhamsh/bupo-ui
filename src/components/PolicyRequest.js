/**
 * Created by sudhamshbachu on 6/1/20.
 */

import React, { useState,Component,useEffect, } from 'react'
import { Form,ButtonGroup,Button } from 'react-bootstrap';

import { Formiz, useForm } from '@formiz/core';
import  {isEmail}  from '@formiz/validations'
import {FieldInput} from "./Fields/FieldInput"
import {FieldAutoComplete} from "./Fields/FieldAutoComplete"
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack, } from "@chakra-ui/core";


export default function  PolicyRequest(props){


    return (
    <ThemeProvider>
        <CSSReset />
        <Stack spacing={10}>
            <Text fontSize="3xl">Basic Information</Text>
        </Stack>

        <SimpleGrid columns={1} maxW="200px">

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
                name="phone"
                label="Phone"
                required="Phone is required"
                defaultValue="480-123-1234"
                type="tel"

            />
            <FieldInput
                name="email"
                label="Email"
                type="email"
                required="Email is required"
                defaultValue="a@a.com"
                validations={[
                    {
                        rule: isEmail(),
                        message: 'Not a valid email',
                    }
                ]}

            />
        </SimpleGrid>

    </ThemeProvider>



    )
}

