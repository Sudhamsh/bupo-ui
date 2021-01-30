/**
 * Created by sudhamshbachu on 1/19/21.
 */


import {FieldSelect} from "../Fields/FieldSelect"

import React, { Component,useState, useEffect, } from 'react'
import {
    ChakraProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,Input,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Icon,
    useToast,
} from "@chakra-ui/react";
import {AddPlaceholder} from "../AddPlaceholder"
import { v4 as uuidv4 } from 'uuid'
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import axios from 'axios';
const defaultUsers = [
    {
        id: uuidv4(),

    },
];


export const WorkFlow = (props) =>{

    const form = useForm({ subscribe: 'form' });
    const [isLoading, setIsLoading] = React.useState(false)
    const[propId, setPropId] = useState(props.propId);
    const toast = useToast()
    let init = false;
    const [dealUsers, setDealUsers] = useState(defaultUsers);
    //const [existingUsers, setExistingUsers] = useState();
    const [dropDownOptions,setDropDownOptions] = useState();


    useEffect(() => {

    }, [form.resetKey]);

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


    const addItem = () => {
        setDealUsers((c) => [
            ...c,
            {
                id: uuidv4(),

            },
        ]);
    };

    const removeItem = (id) => {
        setDealUsers((c) => c.filter((x) => x.id !== id));
    };
    const handleSubmit = (values) => {
        console.log("values : " +values);

        setIsLoading(true);

        values["propObjId"] = propId;
        console.log("values : " +values);

        axios.post("/rest/deal",values)
            .then((response) => {
                setIsLoading(false);

                toast({
                    title: "User Creation Successful.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })

            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "User Creation Failed.",
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
        <Formiz
            connect={form}
            onValidSubmit={handleSubmit}
        >
            <form
                noValidate
                onSubmit={form.submit}
                className="demo-form"
                style={{ minHeight: '16rem' }}
            >

                <Stack spacing={10}>
                    <Text fontSize="3xl">Users(s)</Text>
                </Stack>


                {   dealUsers.map(({ id }, index) => (
                    <>
                    <Stack
                        key={id}
                        direction="row"
                        spacing="4"
                        mb="6"
                        data-test={`repeater-item[${index}]`}
                    >
                        <Box flex="1">
                        <FieldSelect
                            name={`userRoleList[${index}].email`}
                            label="User"
                            placeholder="Select one..."
                            required="User is required"
                            options={dropDownOptions}
                        />
                        </Box>
                        <Box flex="1">
                        <FieldSelect
                            name={`userRoleList[${index}].role`}
                            label="Role on this Deal"
                            placeholder="Select one..."
                            required="Role is required"
                            options={[
                                { value: 'SELLER_AGENT', label: 'Seller Agent' },
                                { value: 'BUYER_AGENT', label: 'Buyer Agent' },
                                { value: 'SELLER_ATTORNEY', label: 'Sellet Attorney' },
                                { value: 'BUYER_ATTORNEY', label: 'Buyer Attorney' },
                                { value: 'BUYER', label: 'Buyer' },
                                { value: 'SELLER', label: 'Seller' },
                            ]}
                        />
                        </Box>
                        <Box pt="1.75rem">
                        <Icon
                            aria-label="Delete"
                            icon="delete"
                            onClick={() => removeItem(id)}
                            variant="ghost"
                            name="delete"
                            size="20px"
                            color="red.500" />
                        </Box>
                      </Stack>
                    </>
                ))}
                {dealUsers.length <= 20 && (
                    <AddPlaceholder label="Add User" onClick={addItem} />

                )}
                <Flex mt="4">
                    <Button
                        type="submit"
                        ml="auto"
                        variantColor="green"
                        isDisabled={!form.isValid && form.isSubmitted}
                    >
                        Submit
                    </Button>
                </Flex>
            </form>
        </Formiz>
        </>
    )
}

export default WorkFlow;
