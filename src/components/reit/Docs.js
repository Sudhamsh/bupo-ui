/**
 * Created by sudhamshbachu on 1/13/21.
 */

import React, { Component,useState, useEffect, } from 'react'

import { Box, Heading, Flex , MenuButton,Menu,
    MenuList,MenuItem,Button,Textarea,Spinner,useDisclosure,
    RadioGroup,
    Radio,
    Link,
    Icon,
    } from "@chakra-ui/core";
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
import {FieldRadio} from "../Fields/FieldRadio"


export const Docs = (props) => {
    const loiForm = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [showDropboxLink, setShowDropboxLink] = useState()
    const[propId, setPropId] = useState(props.propId);
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[listNoi, setListNoi] = useState(props.listNoi);
    const[listCap, setListCap] = useState(props.listCap);
    const[askingPrice, setAskingPrice] = useState(props.askingPrice);
    const[offerPrice, setOfferPrice] = useState();
    const [dropDownOptions,setDropDownOptions] = useState();
    let init = false;
    const radioOptions =[
        {value:"digiSign", text: "Send for Digital Signature"},
        {value:"dropbox",text:"Draft in DropBox"}
        ]

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

        console.log("values:" + JSON.stringify(values));

        // axios.post('/rest/reit/doc',values)
        //     .then((response) => {
        //         setIsLoading(false);
        //         if(response.data && response.data.key == "dropboxPath"){
        //             setShowDropboxLink("https://dropbox.com/home/"+response.data.value)
        //         }
        //         toast({
        //             title: "Doc created.",
        //             description: "We've created your account for you.",
        //             status: "success",
        //             duration: 9000,
        //             isClosable: true,
        //         })
        //     })
        //     .catch((error) => {
        //         setIsLoading(false);
        //         // Error
        //         toast({
        //             title: "Doc creation failed.",
        //             status: "error",
        //             duration: 9000,
        //             isClosable: true,
        //         })
        //         if (error.response) {
        //             // The request was made and the server responded with a status code
        //             // that falls out of the range of 2xx
        //             // console.log(error.response.data);
        //             // console.log(error.response.status);
        //             // console.log(error.response.headers);
        //         } else if (error.request) {
        //             // The request was made but no response was received
        //             // `error.request` is an instance of XMLHttpRequest in the
        //             // browser and an instance of
        //             // http.ClientRequest in node.js
        //             console.log(error.request);
        //         } else {
        //             // Something happened in setting up the request that triggered an Error
        //             console.log('Error', error.message);
        //         }
        //         console.log(error.config);
        //     });

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
                                <FieldSelect
                                    name={`sellerEmail`}
                                    label="Siging Authority"
                                    placeholder="Select one..."
                                    required="User is required"
                                    options={dropDownOptions}
                                />
                                <FieldRadio name="type"
                                            radioOptions={radioOptions}
                                            required="Choose one Option"
                                />
                            </Stack>
                            {
                                showDropboxLink &&
                                <Link href={showDropboxLink} isExternal>
                                    Open DropBox File <Icon name="external-link" mx="2px" />
                                </Link>
                            }
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