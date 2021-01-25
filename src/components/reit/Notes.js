/**
 * Created by sudhamshbachu on 1/10/21.
 */
import React, { Component,useState, useEffect, } from 'react'
import { Box, Heading, Flex, Text, MenuButton,Menu,
    MenuList,MenuItem,Button,Textarea,Spinner} from "@chakra-ui/core";
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
    useToast
} from "@chakra-ui/core";
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

export const Notes = (props) =>{
    const[propId, setPropId] = useState(props.propId);

    const[prevNotes, setPrevNotes] = useState([]);
    const myForm = useForm({ subscribe: 'form' })
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()
    let init = false;

    function handleErrors(response) {
        if (!response.ok) {
            alert('Error 1.2')
            throw Error(response.statusText);
        }
        return response;
    }

    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        if(!init) {
            init = true;
            setIsLoading(true);
            axios.get('/rest/reit/property/propertyId/'+propId+'/notes/',)
                .then((response) => {
                    setIsLoading(false);
                    if (response && response.data != null) {
                        setPrevNotes(response.data);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    // Error
                    toast({
                        title: "Notes retrieval Failed.",
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
    },[]);


    const handleSubmit = (values) => {
        setIsLoading(true);
        console.log(values);

        axios.put('/rest/reit/property/propertyId/'+propId+'/notes/',values)
            .then((response) => {
                setIsLoading(false);

                if(response.status == 200){
                    toast({
                        title: "Note Saved",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                }else{
                    toast({
                        title: "Failed to save Notes. Try again.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "Failed to save Notes. Try again.",
                    description: "We've created your account for you.",
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

    const notesColumns = [{
        dataField: 'epochTime',
        text: 'Product Name'
    }, {
        dataField: 'userEmail',
        text: 'User'
    }, {
        dataField: 'note',
        text: 'Note'
    }];

    return (
        <>
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
                        name="note"
                        label="Notes"
                        required="Notes are required"
                        defaultValue="Test Note..."
                    />
                    <Button
                        type="submit"
                        disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                    >
                        {isLoading ? 'Saving...' : 'Create'}
                    </Button>
                </form>
            </Formiz>
            <Text fontSize="md">Previous Notes</Text>
            {
                isLoading ? <Spinner/>:""

            }
            <BootstrapTable keyField='epochTime' data={ prevNotes } columns={ notesColumns } />
        </>
    );
}

export default Notes;