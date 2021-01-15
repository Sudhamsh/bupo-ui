/**
 * Created by sudhamshbachu on 1/13/21.
 */

import React, { Component,useState, useEffect, } from 'react'

import { Box, Heading, Flex , MenuButton,Menu,
    MenuList,MenuItem,Button,Textarea,Spinner,useDisclosure} from "@chakra-ui/core";
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
} from "@chakra-ui/core"
import {formatCurrency} from "../common/utils";



export const Docs = (props) => {

    function generateLoi() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/rest/reit/doc', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data != null && data.results) {
                    console.log("JSON : " + JSON.stringify(data.results));

                } else {
                    alert("Error 4");
                }
            }).catch(function (error) {
            console.log("Error:" + error);
        });

    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[listNoi, setListNoi] = useState(props.listNoi);
    const[listCap, setListCap] = useState(props.listCap);
    const[askingPrice, setAskingPrice] = useState(props.askingPrice);
    const[offerPrice, setOfferPrice] = useState();

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
                            <Input placeholder="Offer Price"  isReadOnly="true" value={offerPrice}/>
                        </InputGroup>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Generate LOI</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
        )
}