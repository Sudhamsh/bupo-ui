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



export const Docs = (props) => {
    const loiForm = useForm()
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[listNoi, setListNoi] = useState(props.listNoi);
    const[listCap, setListCap] = useState(props.listCap);
    const[askingPrice, setAskingPrice] = useState(props.askingPrice);
    const[offerPrice, setOfferPrice] = useState();


    const handleSubmit = (values) => {
        setIsLoading(true);
        let data = {};
        data.purchasePrice = offerPrice;
        data.noi_amount = listNoi;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(data)
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
                                <Text fontSize="xl">NOI : {`formatCurrency(${listNoi})`}</Text>
                                <Text fontSize="xl">CAP : {listCap}</Text>
                                <Text fontSize="xl">Asking Price: {formatCurrency(askingPrice)}</Text>
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
                                    <Input placeholder="Offer Price" name="purchasePrice" isReadOnly="true" value={offerPrice}/>
                                </InputGroup>
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