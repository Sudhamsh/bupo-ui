/**
 * Created by sudhamshbachu on 1/5/21.
 */
/**
 * Created by sudhamshbachu on 1/5/21.
 */
/**
 * Created by sudhamshbachu on 5/29/20.
 */

import {FieldInput} from "../Fields/FieldInput"
import {FieldSelect} from "../Fields/FieldSelect"
import {FieldAutoComplete} from "../Fields/FieldAutoComplete"
import React, { Component,useState, useEffect, } from 'react'
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import {
    ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,Input,
    Icon,Grid,useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
} from "@chakra-ui/core";

import {AddPlaceholder} from "../AddPlaceholder"
import User from "../User"
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';


export const Members = (props) =>{

    const form = useForm({ subscribe: 'form' });
    const [users,setUsers] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()
    let init = false;

    useEffect(()=>{
        if(!init){
            init = true;
            axios.get("/rest/user")
                .then((response) => {
                    setIsLoading(false);
                    setUsers(response.data)
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
    },[]);

    const newUserCallBack = (newUser) =>{
        console.log("newUser : " +newUser);
        newUser.id=1234;
        users.push( newUser );
        console.log("size" + JSON.stringify(users))
        setUsers(users)
    }


    const columns = [{
        dataField: 'giveName',
        text: 'Name'
    }, {
        dataField: 'email',
        text: 'Email'
    }, {
        dataField: 'mobile',
        text: 'Mobile'
    }, {
        dataField: 'role',
        text: 'Role'
    }];
    return(
       <>
       <Button onClick={onOpen}>Add New User</Button>
       <Modal isOpen={isOpen} onClose={onClose}>
           <ModalOverlay />
           <ModalContent>
               <ModalHeader>Create New User</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                   <User newUserCallBack={newUserCallBack}/>

               </ModalBody>
               <ModalFooter>
                   <Button variantColor="blue" mr={3} onClick={onClose}>
                       Close
                   </Button>
               </ModalFooter>
           </ModalContent>
       </Modal>

       <BootstrapTable keyField='email' data={users} columns={columns} />
       </>
    )
}

export default Members;

