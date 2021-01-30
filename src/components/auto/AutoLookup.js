/**
 * Created by sudhamshbachu on 8/31/20.
 */
import React, { Component,useState, useEffect, } from 'react'
import {
    ChakraProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,Grid,
} from "@chakra-ui/react";
import {  useForm,Formiz, } from '@formiz/core';
import {FieldInput} from "../Fields/FieldInput"
import Auto from "../auto"
import {  useToast } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import {setWithExpiry} from '../../utils'

export const AutoLookup = () =>{
    const myForm = useForm()
    const [showSearch, setShowSearch] = useState(true);
    const [policyData, setPolicyData] = useState(null);
    let history = useHistory();
    const toast = useToast();

    useEffect(() => {
        return history.listen(location => {

            if (history.action === 'POP') {
                setShowSearch(true)
            }
        })
    }, [policyData]);

    function handleErrors(response) {
        if (!response.ok) {
            alert('Error')
            throw Error(response.statusText);
        }
        return response;
    }
    const handleSubmit = (values) => {

         const params = new URLSearchParams(values).toString();
         console.log(params);
        const requestOptions = {
            method: 'GET',
        };
        fetch('/rest/auto/search?'+params, requestOptions)
            .then(handleErrors)
            .then(response => response.json())
            .then((data) => {
                    console.log("data"+ data)
                    if(data.count == 1 ){
                        console.log("data"+ data.results[0])
                        setPolicyData(data.results[0]);
                        setWithExpiry("code", values.code,10 * 60 * 1000); // Expires after 10 minutes
                    }
                    setShowSearch(false);
                    let newUrl =  window.location.origin + '/auto';
                    window.history.pushState({"html":"a.html","pageTitle":"test"},"", newUrl);
                }).catch(function(error) {
                    console.log("Error:" +error);
                });
    }
    if(showSearch) {
        return (
            <ChakraProvider>


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
                                defaultValue="BKH2Z-5R7X7-8QD8B-WIYFF"
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
            </ChakraProvider>
        )
    }else{
        return <Auto policyData={policyData}/>
    }
}



export default AutoLookup;
