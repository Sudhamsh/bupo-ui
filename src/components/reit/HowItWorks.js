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
    Container,
    SimpleGrid,
    Icon,
    Center,
} from "@chakra-ui/react";
import {AiFillPieChart,AiFillBank,AiFillDollarCircle} from 'react-icons/ai';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

export const HowItWorks = (props) =>{
    return (
        <>
        <Box>

            <SimpleGrid columns={3} spacing={10} height="240px">
                <Box >
                    <Center>
                        Invest
                    </Center>
                    <br/>
                    <Center>
                        <Icon as={AiFillPieChart} w={20} h={20} color="green.300"/>
                    </Center>
                </Box>
                <Box >
                    <Center>
                        Assets Generate Rent
                    </Center>
                    <br/>
                    <Center>
                        <Icon as={AiFillBank} w={20} h={20} color="blue.300"/>
                    </Center>

                </Box>
                <Box >
                    <Center>
                        Collect Monthly
                        Distributions
                    </Center>
                    <br/>
                    <Center>
                        <Icon as={AiFillDollarCircle} w={20} h={20} color="green.300"/>
                    </Center>
                </Box>
            </SimpleGrid>
        </Box>
        </>
    );
}

export default HowItWorks;

