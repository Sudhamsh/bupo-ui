import React from "react";
import { Box, Heading, Flex, Text, MenuButton,Menu,
        MenuList,MenuItem,Button} from "@chakra-ui/core";
import {
    Container,

} from 'react-bootstrap'

const MenuItems = ({ children }) => (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        {children}
    </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = props => {
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

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

                <Menu>
                    <MenuButton as={Button} rightIcon="chevron-down" variantColor="black" align="top">
                        Company
                    </MenuButton>
                    <MenuList>
                        <MenuItem minH="48px" as="a" href="#">About Us</MenuItem>
                        <MenuItem minH="48px" as="a" href="#">Contact Us</MenuItem>
                    </MenuList>

                </Menu>


                <a class="btn btn-outline-primary" href="#">Sign up</a>
            </div>

        </nav>



        </>
    );
};

export default Header;
