import React from "react";
import { Box, Heading, Flex, Text, MenuButton,Menu,
        MenuList,MenuItem,Button} from "@chakra-ui/react";
import {
    Container,

} from 'react-bootstrap'

import {storeToken,getWithExpiry} from './common/utils'
import {Login} from './Login';
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
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    ButtonGroup,
    Link,

} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { ChevronDownIcon} from '@chakra-ui/icons'
import { AiOutlineLogout } from "react-icons/ai";
import {removeKey} from '../components/common/utils';
import axios from 'axios'


const MenuItems = ({ children }) => (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        {children}
    </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = props => {
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()
    const displaySessionData = getWithExpiry("userDisplayName");
    console.log("displaySessionData" + displaySessionData)
    const [ userDisplayName, setUserDisplayName] = React.useState( displaySessionData);
    const [ isLoggedIn, setIsLoggedIn] = React.useState(displaySessionData && true);


    const successCallBack = (displayName) =>{
        console.log('header successCallBack' + displayName);
        setUserDisplayName(displayName);
        setIsLoggedIn(true);
        onClose();
    }

    const logOut = () =>{
        removeKey('token');
        removeKey('userDisplayName');
        //TODO: change this to event driven

        axios.delete("/rest/user")
            .then((response) => {
                setIsLoading(false);
                window.location.reload(true);
            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "Logout Failed.",
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

    let history = useHistory();

    function routeTo(page) {
        console.log("history:"+history);

        window.location.href = page

    }

    return (
        <>
        <nav class="site-header sticky-top py-1">
            <div class="container d-flex flex-column flex-md-row justify-content-between">
                <a class="py-2" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
                </a>

                <Menu >
                        <MenuButton as={Button} variantColor="black" align="top" onClick={()=>routeTo('/HowItWorks')}>
                            How It Works!
                        </MenuButton>
                </Menu>
                <Menu >
                    <MenuButton as={Button} variantColor="black" align="top" onClick={()=>routeTo('/Investments')}>
                        Investments
                    </MenuButton>
                </Menu>

                <Menu >
                    <MenuList>
                        <MenuItem minH="48px" as="a" href="/createTenant">Create Tenant</MenuItem>
                        <MenuItem minH="48px" as="a" href="/OrgMgmt">Org Management</MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variantColor="black" align="top">
                        Company
                    </MenuButton>
                    <MenuList>
                        <MenuItem minH="48px" as="a" href="/AboutUs">About Us</MenuItem>
                        <MenuItem minH="48px" as="a" href="/ContactUs">Contact Us</MenuItem>
                    </MenuList>
                </Menu>


               /* {
                    !isLoggedIn &&
                         <Button class="btn btn-outline-primary" onClick={onOpen}>Sign In</Button>

                }
                {
                    isLoggedIn &&
                    <>
                    <Popover>
                        <PopoverTrigger>
                            <Button>{userDisplayName}</Button>
                        </PopoverTrigger>
                        <PopoverContent zIndex={4}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                <ButtonGroup spacing={4}>
                                    <Button rightIcon={<AiOutlineLogout/>} colorScheme="red" variant="solid" onClick={logOut}>
                                        Sign Out
                                    </Button>

                                </ButtonGroup>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    </>
                }*/

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Login successCallBack={successCallBack}/>

                        </ModalBody>
                        <ModalFooter>
                            <Button variantColor="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost">Create Account</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </div>

        </nav>



        </>
    );
};

export default Header;
