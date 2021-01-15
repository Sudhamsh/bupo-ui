/**
 * Created by sudhamshbachu on 1/4/21.
 */
import React, { Component,useState, useEffect,useRef, } from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button,useToast } from "@chakra-ui/core";
import {FieldInput} from "../Fields/FieldInput"
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import  {isEmail}  from '@formiz/validations'


export const CreateTenant = (props) => {
    const myForm = useForm({ subscribe: 'form' })
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()
    const handleSubmit = (values) => {
        setIsLoading(true);
        console.log(values);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        };
        fetch('/rest/reit/tenant', requestOptions)
            .then(response => {
                setIsLoading(false);
                if(response.status == 201){
                    toast({
                        title: "Org created.",
                        description: "We've created your account for you.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                }else{
                    toast({
                        title: "Failed to create Org.",
                        description: "We've created your account for you.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .then((result) => {
                    setIsLoading(false);
                },
                (error) => {
                    setIsLoading(false);
                    toast({
                        title: "Failed to create Org.",
                        description: "We've created your account for you.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                });
    }
    return (
        <ThemeProvider>
            <CSSReset />
            <Stack spacing={10}>
                <Text fontSize="3xl">Create new Organization</Text>
            </Stack>
            <Formiz
                connect={myForm}
                onValidSubmit={handleSubmit}
            >
                <form
                    noValidate
                    onSubmit={myForm.submit}
                    className="demo-form"
                    style={{ minHeight: '16rem' }}
                >
                    <FieldInput
                        name="tenantName"
                        label="Org Name"
                        required="Org Name is required"
                        defaultValue="dev_org"
                    />
                    <FieldInput
                        name="orgPrimaryContact.email"
                        label="Org Owner Email"
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
                    <Button
                        type="submit"
                        disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                    >
                        {isLoading ? 'Saving...' : 'Create'}
                    </Button>
                </form>
            </Formiz>
        </ThemeProvider>
    )
}

export default CreateTenant;
