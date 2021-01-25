/**
 * Created by sudhamshbachu on 1/13/21.
 */
/**
 * Created by sudhamshbachu on 1/11/21.
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
import { Tag, TagIcon, TagLabel, TagCloseButton,Stack, } from "@chakra-ui/core";
import axios from 'axios';

export const Tags = (props) =>{
    const myForm = useForm({ subscribe: 'form' })
    const[propId, setPropId] = useState(props.propId);
    const[tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()

    function handleErrors(response) {
        if (!response.ok) {
            alert('Error 1.2')
            throw Error(response.statusText);
        }
        return response;
    }

    useEffect(()=>{

        if(propId != null) {
            setIsLoading(true);


            axios.get('/rest/reit/tag/propertyId/'+propId,)
                .then((response) => {
                    setIsLoading(false);
                    setTags(response.data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    // Error
                    toast({
                        title: "Failed to get tags. Try again.",
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

    const deleteTag = (delTagValue) =>{
        console.log("tagValue..."+delTagValue);

        axios.delete('/rest/reit/property/propertyId/'+propId+'/notes/',)
            .then((response) => {
                setIsLoading(false);
                setTags(tags.filter(function (e){
                    return e != delTagValue;
                }));
                toast({
                    title: "Tag Deleted",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })

            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "Tag Delete failed. Try again.",
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

    const handleSubmit = (values) => {
        setIsLoading(true);
        console.log(values);

        axios.post('/rest/reit/tag/propertyId/'+propId+'/tag/'+values.newTag,values)
            .then((response) => {
                setIsLoading(false);
                setTags(tags.concat(values.newTag));
                toast({
                    title: "Tag Saved",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "Failed to save Tag. Try again.",
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
        <Heading as="h4" size="md">
            Existing Tags
        </Heading>
        <Stack spacing={4} isInline>
            {tags.map(value => (
                <Tag
                    size="md"
                    key="md"
                    rounded="full"
                    variant="solid"
                    variantColor="cyan"

                >
                    <TagLabel>{value}</TagLabel>
                    <TagCloseButton onClick={() => deleteTag(value)} />
                </Tag>
            ))}
        </Stack>

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
                    name="newTag"
                    label="New Tag"
                    required="Tag value is  required"
                    defaultValue="TestTag"
                />
                <Button
                    type="submit"
                    disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                >
                    {isLoading ? 'Saving...' : 'Create'}
                </Button>
            </form>
        </Formiz>


        </>
    )

}

export default Tags;
