/**
 * Created by sudhamshbachu on 9/17/20.
 */

import React, { Component,useState, useEffect, } from 'react'
import {
    ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
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
} from "@chakra-ui/core";
import {
    Formiz,
} from '@formiz/core'
import {  useForm } from '@formiz/core';
import {FieldInput} from "../../Fields/FieldInput"
import {FieldSelect} from "../../Fields/FieldSelect"
import AutoCoveragePremium from "../../auto/AutoCoveragePremium"
import {AddPlaceholder} from "../../AddPlaceholder"
import { useToast } from "@chakra-ui/core";

const defaultQuotes = [
    {

    },
];
export const SubmitQuote = (props) =>{
    const [quotes, setQuotes] = useState(defaultQuotes);
    const [policyDetails, setPolicyDetails] = useState(null);
    const myForm = useForm({ subscribe: 'form' })
    const toast = useToast();

    const addItem = () => {
        setQuotes((c) => [
            ...c,
            {

            },
        ]);
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

    const handleSubmit = (values) => {
        console.log(values)

        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch('/rest/quote/code/'+policyDetails.code, requestOptions)
            .then(handleErrors);

    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
        };
        if(policyDetails == null) {
            //Get code from URL
            const queryString = window.location.search;
            const params = new URLSearchParams(queryString);
            if(params.get('code')) {
                fetch('/rest/auto/code/' + params.get('code'), requestOptions)
                    .then(handleErrors)
                    .then(response => response.json())
                    .then((data) => {
                        console.log("data" + data)
                        if (data != null && data.results.length == 1) {
                            console.log("JSON : " + JSON.stringify(data.results[0]));

                            setPolicyDetails(data.results[0])
                        } else {
                            alert("Error");
                        }

                    }).catch(function (error) {
                    console.log("Error:" + error);
                });
            }
        }
    },[policyDetails])
    return(
        <ThemeProvider>
            <CSSReset />


            <Heading as="h1" size="xl">Provide Quote</Heading>
            <Box  borderWidth="1px" rounded="lg" overflow="hidden" p="6">
                <Box p="6">
                <Heading as="h1" size="xl">Customer Information</Heading>
                </Box>

                <SimpleGrid columns={2} spacing={10}>
                    <Text fontSize="1xl"><b>Quote Code : </b>{policyDetails != null && policyDetails.code} </Text>
                    <Text fontSize="1xl"><b>Zip Code : </b>{policyDetails != null && policyDetails.address != null && policyDetails.address.zip}</Text>
                </SimpleGrid>
                <Formiz>
                    <hr/>
                    <Heading as="h1" size="xl" p="6">Vehicle</Heading>
                <Tabs variant="enclosed">
                    <TabList>
                        {  policyDetails != null &&
                           policyDetails.vehicles != null &&
                           policyDetails.vehicles.map(({ make, model, year}, index) => (
                            <Tab>{year} - {make} - {model}</Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                        {   policyDetails != null &&
                            policyDetails.vehicles != null &&
                            policyDetails.vehicles.map(({ make, model, year,yearlyMileage, vin}, index) => (
                        <TabPanel>
                            <Stack spacing={1} p="6">
                                <Text fontSize="1xl"><b>Year: </b> {year}</Text>
                                <Text fontSize="1xl"><b>Make: </b> {make} </Text>
                                <Text fontSize="1xl"><b>Model: </b> {model}</Text>
                                <Text fontSize="1xl"><b>Vin: </b> {vin}</Text>
                                <Text fontSize="1xl"><b>Yearly Mileage #:</b> {yearlyMileage}</Text>
                            </Stack>
                        </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>

                    <hr/>
                    <Heading as="h1" size="xl" p="6">Drivers</Heading>
                <Tabs variant="enclosed">
                    <TabList>
                        {
                            policyDetails != null &&
                            policyDetails.drivers != null &&
                            policyDetails.drivers.map(({ }, index) => (

                                <Tab>Driver {index+1}</Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                        {
                            policyDetails != null &&
                            policyDetails.drivers != null &&
                            policyDetails.drivers.map(({educationLevel,maritalStatus,licenseAgeAt }, index) => (
                                <TabPanel>
                                    <Stack spacing={1} p="6">
                                        <Text fontSize="1xl"><b>Education Level :</b> {educationLevel}</Text>
                                        <Text fontSize="1xl"><b>Marriage Status :</b> {maritalStatus}</Text>
                                        <Text fontSize="1xl"><b>First License Age At : </b> {licenseAgeAt} </Text>
                                    </Stack>
                        </TabPanel>
                            ))}

                    </TabPanels>
                </Tabs>
                    <hr/>
                    <Heading as="h1" size="xl" p="6">User provided coverage</Heading>

                    <Stack spacing={1} p="6">
                        <Text fontSize="1xl"><b>Bodily Injury Limits:</b>
                            { policyDetails != null &&  policyDetails.coverage != null &&  policyDetails.coverage.bodilyInjuryLimit}
                        </Text>
                        <Text fontSize="1xl"><b>Property Damage Liability : </b>
                            { policyDetails != null &&  policyDetails.coverage != null &&  policyDetails.coverage.propDamLiability}
                        </Text>
                        <Text fontSize="1xl"><b>Medical Payments : </b>
                            { policyDetails != null &&  policyDetails.coverage != null &&  policyDetails.coverage.medicalPayments}
                        </Text>
                        <Text fontSize="1xl"><b>Uninsured/UnderInsured Motorist :</b>
                            { policyDetails != null &&  policyDetails.coverage != null &&  policyDetails.coverage.uninsuredMotorist}
                        </Text>
                    </Stack>

            </Formiz>
            </Box>
            <br/>
            <br/>
            <Box  borderWidth="1px" rounded="lg" overflow="hidden" p="6">
                <Box p="6">
                    <Heading as="h1" size="xl">Quote(s)</Heading>
                </Box>
                <Formiz
                    connect={myForm}
                    onValidSubmit={handleSubmit}
                >
                    <form
                        noValidate
                        // Change the myForm.submit to myForm.submitStep
                        onSubmit={myForm.submit}
                    >
                        <Accordion>
                            {quotes.map(({ }, index) => (
                                <AccordionItem>
                                    <AccordionHeader _expanded={{ bg: "green.500", color: "white" }} _disabled={{ bg: "red.500", color: "white" }}>
                                        <Box flex="1" textAlign="left">
                                            Quote # {index}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionHeader>
                                    <AccordionPanel >
                                        <AutoCoveragePremium index={index}/>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <AddPlaceholder label="Provide More Quotes" onClick={addItem} />

                        <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
                            <Button
                                type="submit"
                                gridColumn="3"
                            >
                               Submit
                            </Button>

                        </Grid>
                    </form>

                </Formiz>
            </Box>


        </ThemeProvider>
    )
}

export default SubmitQuote;