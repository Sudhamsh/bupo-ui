/**
 * Created by sudhamshbachu on 1/4/21.
 */

import React, { Component,useState, useEffect,useRef, } from 'react'
import { ChakraProvider,CSSReset,SimpleGrid,Text,Stack,Button,useToast } from "@chakra-ui/react";
import {FieldInput} from "./Fields/FieldInput"
import {FieldSelect} from "./Fields/FieldSelect"
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import  {isEmail}  from '@formiz/validations'
import axios from 'axios';

export const User = (props) => {
    const userForm = useForm({ subscribe: 'form' })
    const [isLoading, setIsLoading] = React.useState(false)
    const {newUserCallBack} = props;
    const toast = useToast()
    const handleSubmit = (values) => {
        setIsLoading(true);

        axios.post("/rest/user",values)
            .then((response) => {
                setIsLoading(false);

                toast({
                    title: "User Creation Successful.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })

                newUserCallBack(values)
            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "User Creation Failed.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        
    }
    return (
        <>
        <Formiz
            connect={userForm}
            onValidSubmit={handleSubmit}
        >
            <form
                noValidate
                onSubmit={userForm.submit}
                className="demo-form"
                style={{ minHeight: '16rem' }}
            >
                <FieldInput
                    name="givenName"
                    label="First Name"
                    required="First Name is required"
                    defaultValue="John"
                />
                <FieldInput
                    name="familyName"
                    label="Last Name"
                    required="Last Name is required"
                    defaultValue="Doe"
                />
                <FieldInput
                    name="mobile"
                    label="Mobile Number"
                    type="tel"
                    defaultValue="123-123-1234"
                />
                <FieldInput
                    name="email"
                    label="New User Email"
                    type="email"
                    required="Email is required"
                    defaultValue={"a@a.com"}
                    validations={[
                        {
                            rule: isEmail(),
                            message: 'Not a valid email',
                        }
                    ]}

                />
                <FieldSelect
                    name="role"
                    label="Role"
                    placeholder="Select one..."
                    required="Education Level is required"
                    options={[
                        { value: 'ORG_ADMIN', label: 'ORG_ADMIN' },
                        { value: 'AGENT_ADMIN', label: 'AGENT_ADMIN' },
                        { value: 'AGENT_MEMBER', label: 'AGENT_MEMBER' },
                        { value: 'BUYER', label: 'BUYER' },
                        { value: 'SELLER', label: 'SELLER' },
                    ]}
                />
                <Button
                    type="submit"
                    disabled={!userForm.isStepValid && userForm.isStepSubmitted}
                >
                    {isLoading ? 'Saving...' : 'Create'}
                </Button>
            </form>
        </Formiz>
        </>
    )
}

export default User;

