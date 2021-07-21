/**
 * Created by sudhamshbachu on 2/2/21.
 */

import React, { Component,useState, useEffect, } from 'react'
import { Box, Heading, Flex, Text, MenuButton,Menu,
    MenuList,MenuItem,Button,Textarea,Spinner} from "@chakra-ui/react";
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import {FieldInput} from "../Fields/FieldInput"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Container
} from "@chakra-ui/react";
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

export const FinInfo = (props) =>{
    const years =2;
    const myForm = useForm({ subscribe: { form: true, fields: true } })
    const[propId, setPropId] = useState(props.propId);
    const[cap, setCap] = useState([]);
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()

    var rows = [];

    for (var i = 0; i < years; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(
            <FieldInput
                name={`cap[${i}]`}
                label={`Year ${i+1}.cap`}
                required="Each year CAP required"
                type="number"
                defaultValue={cap[i]}
            />
        );
    }
    const sameForAll = () =>{
        console.log("myForm.values " + JSON.stringify(myForm));
        let arr = [...Array(years)].fill(myForm.values.cap[0])
        setCap(arr)

        const inputs = document.querySelectorAll('input[type="number"]')

        var ev2 = new Event('input', { bubbles: true});
        for (var i=0; i<inputs.length; i++) {
            console.log(i);
            inputs[i].dispatchEvent(ev2);
        }
    }

    const handleSubmit = (values) => {
        axios.put('/rest/reit/property/propertyId/'+propId+'/caps/',values.cap)
            .then((response) => {
                setIsLoading(false);
                toast({
                    title: "CAPs Saved",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "Failed to save CAPS. Try again.",
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
        <Container maxW="xl" centerContent>

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
                        {/*<Button onClick={sameForAll}>Same For First Year</Button>*/}
                        {rows}

                        <Button
                            type="submit"
                            disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                        >
                            {isLoading ? 'Saving...' : 'Create'}
                        </Button>
                    </form>
                </Formiz>

        </Container>
        </>
    );
}

export default FinInfo;
