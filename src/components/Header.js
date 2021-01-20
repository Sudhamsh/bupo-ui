import React from "react";
import { Box, Heading, Flex, Text, MenuButton,Menu,
        MenuList,MenuItem,Button} from "@chakra-ui/core";
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
} from "@chakra-ui/core";
import { AiOutlineLogout } from "react-icons/ai";
import {removeKey} from '../components/common/utils';


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
        window.location.reload(true);
    }

    return (
        <>
        <nav class="site-header sticky-top py-1">
            <div class="container d-flex flex-column flex-md-row justify-content-between">
                <a class="py-2" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
                </a>
                <Menu >
                    <MenuButton as={Button} rightIcon="chevron-down" variantColor="black" align="top">
                        Insurance
                    </MenuButton>
                    <MenuList>
                        <MenuItem minH="48px" as="a" href="/auto">Auto</MenuItem>
                        <MenuItem minH="48px" as="a" href="#">Home</MenuItem>
                        <MenuItem minH="48px" as="a" href="#">Life</MenuItem>
                        <MenuItem minH="48px" as="a" href="#">Visitor</MenuItem>
                    </MenuList>
                </Menu>
                <Menu >
                    <MenuButton as={Button} rightIcon="chevron-down" variantColor="black" align="top">
                        Admin
                    </MenuButton>
                    <MenuList>
                        <MenuItem minH="48px" as="a" href="/createTenant">Create Tenant</MenuItem>
                        <MenuItem minH="48px" as="a" href="/OrgMgmt">Org Management</MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon="chevron-down" variantColor="black" align="top">
                        Company
                    </MenuButton>
                    <MenuList>
                        <MenuItem minH="48px" as="a" href="#">About Us</MenuItem>
                        <MenuItem minH="48px" as="a" href="#">Contact Us</MenuItem>
                    </MenuList>
                </Menu>


                {
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
                                    <Button rightIcon={AiOutlineLogout} variantColor="red" variant="solid" onClick={logOut}>
                                        Sign Out
                                    </Button>

                                </ButtonGroup>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    </>
                }

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
