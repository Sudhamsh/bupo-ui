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
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("propId:"+propId)
        if(propId != null) {
            setIsLoading(true);
            fetch('/rest/reit/tag/propertyId/'+propId, requestOptions)
                .then(handleErrors)
                .then(response => response.json())
                .then((data) => {
                        setIsLoading(false);
                        setTags(data);

                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setIsLoading(false);
                        toast({
                            title: "Failed to get tags. Try again.",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    }).catch(function (error) {
                console.log("Error:" + error);
            });
        }
    },[]);

    const deleteTag = (delTagValue) =>{
        console.log("tagValue..."+delTagValue);

        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/rest/reit/tag/propertyId/'+propId+'/tag/'+delTagValue, requestOptions)
            .then(response => {
                setIsLoading(false);
                if(response.status == 200){
                    //updated displayed tags
                    setTags(tags.filter(function (e){
                        return e != delTagValue;
                    }));
                    toast({
                        title: "Tag Deleted",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                }else{
                    toast({
                        title: "Tag Delete failed. Try again.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .then((result) => {
                    setIsLoading(false);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoading(false);
                    toast({
                        title: "Tag Delete failed. Try again.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                });
    }

    const handleSubmit = (values) => {
        setIsLoading(true);
        console.log(values);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/rest/reit/tag/propertyId/'+propId+'/tag/'+values.newTag, requestOptions)
            .then(response => {
                setIsLoading(false);
                if(response.status == 200){
                    toast({
                        title: "Tag Saved",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                }else{
                    toast({
                        title: "Failed to save Tag. Try again.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .then((result) => {
                    setIsLoading(false);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoading(false);
                    toast({
                        title: "Failed to save Tag. Try again.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
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
