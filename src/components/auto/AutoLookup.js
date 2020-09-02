/**
 * Created by sudhamshbachu on 8/31/20.
 */
import React, { Component,useState, useEffect, } from 'react'
import {
    ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,Grid,
} from "@chakra-ui/core";
import {  useForm,Formiz, } from '@formiz/core';
import {FieldInput} from "../Fields/FieldInput"
import Auto from "../auto"

import { useHistory } from "react-router-dom";

export const AutoLookup = () =>{
    const myForm = useForm()
    const [showSearch, setShowSearch] = useState(true);
    let history = useHistory();

    useEffect(() => {
        return history.listen(location => {


            if (history.action === 'POP') {
                setShowSearch(true)
            }
        })
    }, [  ])

    const handleSubmit = (values) => {
         console.log(values);
         const params = new URLSearchParams(values).toString();
         console.log(params);
        const requestOptions = {
            method: 'GET',
        };
        fetch('/rest/auto/search?'+params, requestOptions)
            .then(response => response.json())
            .then((data) => {
                    setShowSearch(false);
                    let newUrlIS =  window.location.origin + '/auto';
                    window.history.pushState({"html":"a.html","pageTitle":"test"},"", newUrlIS);
                }
            );
    }
    if(showSearch) {
        return (
            <ThemeProvider>
                <CSSReset />

                <Formiz connect={myForm} onValidSubmit={handleSubmit}>
                    <Stack spacing={10}>
                        <Text fontSize="3xl">Policy Request Search</Text>
                    </Stack>
                    <form
                        noValidate
                        // Change the myForm.submit to myForm.submitStep
                        onSubmit={myForm.submit}
                    >
                        <SimpleGrid direction="row" spacing="4" mb="6" maxW="200px">
                            <FieldInput
                                name="code"
                                label="Quote Code"
                                required="Quote Code is required"
                                defaultValue="1VP7Y-AZ32G-YTW7P-8BFA2"
                            />
                            <FieldInput
                                name="lastName"
                                label="Last Name"
                                required="Last Name is required"
                                defaultValue="Bachu"
                            />
                            <FieldInput
                                name="zip"
                                label="Zip"
                                required="Zip is required"
                                defaultValue="40000"
                                type="number"
                            />
                        </SimpleGrid>
                        <Grid templateColumns="1fr 2fr 1fr" alignItems="center">


                            <Button
                                type="submit"
                                gridColumn="3"
                                isDisabled={
                                    !myForm.isStepValid && myForm.isStepSubmitted
                                }
                            >
                                Submit
                            </Button>

                        </Grid>
                    </form>
                </Formiz>
            </ThemeProvider>
        )
    }else{
        return <Auto/>
    }
}



export default AutoLookup;
