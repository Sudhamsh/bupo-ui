/**
 * Created by sudhamshbachu on 1/29/21.
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

export const AboutUs = (props) =>{
    return (
        <>
        <Container maxW="xl" centerContent>
            <Box padding="4" bg="gray.100" maxW="3xl">
                About Us
            </Box>
        </Container>
        </>
    );
}

export default AboutUs;

