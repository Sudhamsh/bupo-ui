import React from "react";
import { Box, Heading, Flex, Text, MenuButton,Menu,
        MenuList,MenuItem,Button} from "@chakra-ui/core";
import {
    Container,

} from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
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
    const [ isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [ isLoading, setIsLoading] = React.useState(false);
    const [ userDisplayName, setUserDisplayName] = React.useState();
    const toast = useToast();

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        if(res.profileObj) {
            setIsLoggedIn(true);
            let name = res.profileObj.givenName == null ? res.profileObj.name : res.profileObj.givenName;
            setUserDisplayName(name)
            //createUser(res.profileObj,"google")
        }
    };


    function handleErrors(response) {
        if (!response.ok) {
            toast({
                title: "Error",
                description: "Unexpected Error Occured. Please retry.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            throw Error(response.statusText);
        }
        return response;
    }

    const createUser = (userDetails, type) =>{
        let apiPayload = {};
        if(type == "google"){
            apiPayload["email"] = userDetails.email;
            let name = userDetails.givenName == null ? userDetails.name : userDetails.givenName;
            apiPayload["displayName"] = name;
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(apiPayload),
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch('/rest/user', requestOptions)
            .then(response => {
                setIsLoading(false);
                if(response.status == 409){
                    toast({
                        title: "User Exists already",
                        description: "User Exists",
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
                        title: "Error",
                        description: "Error",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                });
    }

    const onFailure = (res) => {
        console.log('Login failed: res:', JSON.stringify(res));
        setIsLoggedIn(false);
    };

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
                    <Text color="tomato">{userDisplayName}</Text>
                }




                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <GoogleLogin
                            clientId="760467338442-8mqcug72s5vn07njthobdd8tb6eqkek8.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'none'}
                        />
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
