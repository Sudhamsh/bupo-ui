/**
 * Created by sudhamshbachu on 1/26/21.
 */
/**
 * Created by sudhamshbachu on 1/13/21.
 */
/**
 * Created by sudhamshbachu on 1/11/21.
 */
import React, { Component,useState, useEffect, } from 'react'
import { Box, Heading, Flex, Text, MenuButton,Menu,
    MenuList,MenuItem,Button,Textarea,Spinner,FormControl,FormHelperText,FormLabel,Select,
    Icon,
    SimpleGrid,
    } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { Tag, TagIcon, TagLabel, TagCloseButton,Stack, } from "@chakra-ui/react";
import axios from 'axios';
import {ToastUtil} from '../common/ToastUtil';
import {isUserLoggedIn} from '../common/utils'


export const Summary = (props) =>{

    const[propId, setPropId] = useState(props.propId);
    const [isLoading, setIsLoading] = React.useState(false)
    const [updateSuccess, setUpdateSuccess] = React.useState(false)
    const toast = useToast()

    const statusChange = (selectedValue) =>{

        const payload ={status:selectedValue};

        axios.put('/rest/reit/property/propertyId/'+propId+'/status',payload)
            .then((response) => {
                setIsLoading(false);
                setUpdateSuccess(true);
                ToastUtil.newToast(
                    "Status Saved.",
                     "success")
            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "Error while saving fav. Try again.",
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

    return(
        <>
        <FormControl id="status">
            <FormLabel>Status</FormLabel>
            <SimpleGrid columns={2} spacing={10}>
                <Select  onChange={e => statusChange(e.currentTarget.value)}>
                    <option value="IGNORE">IGNORE</option>
                    <option value="SHORTLISTED">SHORTLISTED</option>
                    <option value="LOI_SUBMITTED">LOI SUBMITTED</option>
                    <option value="LOI_ACCEPTED">LOI ACCEPTED</option>
                    <option value="PSA_RECEIVED">PSA RECEIVED</option>
                    <option value="PSA_SIGNED">PSA SIGNED</option>
                    <option value="INSPECTION_PERIOD">INSPECTION PERIOD</option>
                    <option value="INSPECTION_COMPLETED">INSPECTION COMPLETED</option>
                    <option value="FINANCE_APPROVED">FINANCE APPROVED</option>
                    <option value="CLOSED">CLOSED</option>
                </Select>
                {updateSuccess && <Icon name="check" size="32px" color="blue.400" />}
            </SimpleGrid>

            <FormHelperText>This is your Org status.</FormHelperText>

        </FormControl>


        </>
    )

}

export default Summary;
