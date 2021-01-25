/**
 * Created by sudhamshbachu on 1/13/21.
 */

import React, { Component,useState, useEffect, } from 'react'

import { Box, Heading, Flex , MenuButton,Menu,
    MenuList,MenuItem,Button,Textarea,Spinner,useDisclosure} from "@chakra-ui/core";
import {
    Formiz,
    useForm,
} from '@formiz/core'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    useToast,
} from "@chakra-ui/core"
import {formatCurrency} from "../common/utils";
import axios from 'axios';
import {FieldSelect} from "../Fields/FieldSelect"


export const Docs = (props) => {
    const loiForm = useForm()
    const [isLoading, setIsLoading] = React.useState(false)
    const[propId, setPropId] = useState(props.propId);
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[listNoi, setListNoi] = useState(props.listNoi);
    const[listCap, setListCap] = useState(props.listCap);
    const[askingPrice, setAskingPrice] = useState(props.askingPrice);
    const[offerPrice, setOfferPrice] = useState();
    const [dropDownOptions,setDropDownOptions] = useState();
    let init = false;

    useEffect(()=>{
        if(!init){
            init = true;
            axios.get("/rest/user")
                .then((response) => {
                    const existingUsers = response.data;
                    const dropDownValues = existingUsers.map( function(user) {
                        var user = { "value": user.email,
                            "label": user.email
                        }
                        return user;
                    })
                    console.log("dropDownValues:"+JSON.stringify(dropDownValues));
                    setDropDownOptions((dropDownValues));

                })
                .catch((error) => {
                    console.log(error)
                    // Error
                    toast({
                        title: "Get Users Failed.",
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
        values.propId=propId;
        values.offerPrice=offerPrice;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(values)
        };
        fetch('/rest/reit/doc', requestOptions)
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

    const computeOffer = ((e) => {
        //price = NOI*100/CAP%
        const capVal = e.target.value;
        const offerPrice = listNoi*100/capVal ;
        setOfferPrice(formatCurrency(offerPrice));
    })

    return(
        <>
        <Button onClick={onOpen}>LOI Generator</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>LOI Info</ModalHeader>
                <ModalCloseButton />
                <Formiz
                    connect={loiForm}
                    onValidSubmit={handleSubmit}
                >
                    <form
                        noValidate
                        onSubmit={loiForm.submit}
                        className="demo-form"
                        style={{ minHeight: '16rem' }}
                    >
                        <ModalBody>
                            <Heading as="h3" size="lg">List Details</Heading>
                            <Stack spacing={3}>
                                <Text fontSize="xl">NOI : ${listNoi}</Text>
                                <Text fontSize="xl">CAP : {listCap}</Text>
                                <Text fontSize="xl">Asking Price: ${askingPrice}</Text>
                            </Stack>
                            <br/>
                            <br/>
                            <br/>
                            <Heading as="h3" size="lg">My Offer Details</Heading>
                            <Stack spacing={4}>
                                <InputGroup>
                                    <InputLeftElement color="gray.300" fontSize="1.2em" children="%" />
                                    <Input placeholder="Enter CAP" onChange={computeOffer} type="number"/>
                                </InputGroup>

                                <InputGroup>
                                    <InputLeftElement color="gray.300" fontSize="1.2em" children="$" />
                                    <Input placeholder="Offer Price" name="offerPrice" isReadOnly="true" value={offerPrice}/>
                                </InputGroup>
                                <FieldSelect
                                    name={`buyerEmail`}
                                    label="Siging Authority"
                                    placeholder="Select one..."
                                    required="User is required"
                                    options={dropDownOptions}
                                />
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                type="submit"
                                disabled={!loiForm.isStepValid && loiForm.isStepSubmitted}
                            >
                                {isLoading ? 'Saving...' : 'Generate LOI'}
                            </Button>
                        </ModalFooter>
                    </form>
                </Formiz>

            </ModalContent>
        </Modal>
        </>
        )
}