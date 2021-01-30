/**
 * Created by sudhamshbachu on 9/22/20.
 */

import React, { Component,useState, useEffect, } from 'react'
import {
    ChakraProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Icon,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Heading,
    Grid,
    Link,
} from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router"
import {
    Formiz,
} from '@formiz/core'
import {  useForm } from '@formiz/core';

export  const PolicyRequests = (props) =>{
    const[policyRequests, setPolicyRequests] = useState();

    function handleErrors(response) {
        if (!response.ok) {
            alert('Error')
            throw Error(response.statusText);
        }
        return response;
    }
    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
        };
        if(policyRequests == null) {
            fetch('/rest/auto/search/status/open', requestOptions)
                .then(handleErrors)
                .then(response => response.json())
                .then((data) => {
                    console.log("data" + data)
                    if (data != null && data.results) {
                        console.log("JSON : " + JSON.stringify(data.results));

                        setPolicyRequests(data.results)
                    } else {
                        alert("Error");
                    }

                }).catch(function (error) {
                console.log("Error:" + error);
            });
        }
    })

    return(
        <ChakraProvider>

            Policy Requests
            <SimpleGrid columns={3} spacing={10} border="1px">
                <Text>Request #</Text>
                <Text>Zip</Text>
                <Text>Status</Text>
            {   policyRequests && policyRequests.map(({ code,zip,status }, index) => (
                <>

                <Text fontSize="lg" isTruncated>
                    <Link  href={`/auto/quote?code=${code}`} color="teal.500">
                        {code}
                    </Link>
                </Text>
                <Text fontSize="lg">{zip}</Text>

                <Text fontSize="lg">{status}</Text>


                </>
            ))}
            </SimpleGrid>
        </ChakraProvider>
    )

}

export default PolicyRequests;
