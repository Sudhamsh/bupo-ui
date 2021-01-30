/**
 * Created by sudhamshbachu on 5/29/20.
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
        } from "@chakra-ui/react";
import {  useForm } from '@formiz/core';
import {FieldInput} from "../Fields/FieldInput"
import {FieldSelect} from "../Fields/FieldSelect"
import { v4 as uuidv4 } from 'uuid'
import {AddPlaceholder} from "../AddPlaceholder"


const defaultDrivers = [
    {
        fName: 'New Driver',
    },
];

export const Driver = (props) =>{
    const { policyData } = props;
    const form = useForm({ subscribe: 'form' });


    useEffect(() => {

    },[form.resetKey]);

    let existingDrivers = defaultDrivers;
    if(policyData && policyData.drivers) {
        existingDrivers = policyData.drivers;
    }

    const [drivers, setDrivers] = useState(existingDrivers);

    const addItem = () => {
        console.log('addItem' +  uuidv4());
        setDrivers((c) => [
            ...c,
            {
                id: uuidv4(),
                fName: 'New Driver',
            },
        ]);

        console.log('addItem' +  JSON.stringify(drivers));
    };

    const removeItem = (id) => {
        setDrivers((c) => c.filter((x) => x.id !== id));
    };

    return(
    <ChakraProvider>

        <Stack spacing={10}>
            <Text fontSize="3xl">Driver(s)</Text>
        </Stack>
        <Accordion>
            {drivers.map(({ id, firstName, lastName}, index) => (
                <AccordionItem>
                    <AccordionHeader _expanded={{ bg: "green.500", color: "white" }}>
                        <Box flex="1" textAlign="left">
                            Driver : {firstName} {lastName}
                        </Box>
                        <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel >
                        <Box borderWidth="1px" rounded="lg" p="6">
                            <Box  textAlign="right">
                                <Icon
                                    aria-label="Delete"
                                    icon="delete"
                                    onClick={() => removeItem(id)}
                                    variant="ghost"
                                    name="delete"
                                    size="32px"
                                    color="red.500" />
                            </Box>
                            <SimpleGrid key={id} direction="row" spacing="4" mb="6" data-test={`repeater-item[${index}]`} maxW="200px">
                                    <FieldInput
                                        name={`drivers[${index}].firstName`}
                                        label="First Name"
                                        required="First Name is required"
                                        defaultValue="Sudhamsh"

                                    />
                                    <FieldInput
                                        name={`drivers[${index}].lastName`}
                                        label="Last Name"
                                        required="Last Name is required"
                                        defaultValue="Bachu"
                                    />
                                    <FieldInput
                                        name={`drivers[${index}].dateOfBirth`}
                                        label="Date of Birth"
                                        required="Date of Birth is required"
                                        defaultValue={(policyData && policyData.drivers && policyData.drivers[index]) ?  policyData.drivers[index].dateOfBirth : "1980-01-01"}
                                        type="date"
                                    />
                                    <FieldSelect
                                        name={`drivers[${index}].educationLevel`}
                                        label="Education Level"
                                        placeholder="Select one..."
                                        required="Education Level is required"
                                        defaultValue={(policyData && policyData.drivers && policyData.drivers[index]) ?  policyData.drivers[index].educationLevel : ""}
                                        options={[
                                            { value: 'HIGH_SCHOOL', label: 'High School' },
                                            { value: 'ASSOCIATE_DEGREE', label: 'Associate Degree' },
                                            { value: 'BACHELORS_DEGREE', label: 'Bachelor\'s Degree' },
                                            { value: 'MASTERS_DEGREE', label: 'Master\'s Degree' },
                                            { value: 'DOCTORAL_DEGREE', label: 'Doctoral degree' },

                                        ]}
                                    />
                                    <FieldSelect
                                        name={`drivers[${index}].maritalStatus`}
                                        label="Marrital Status"
                                        placeholder="Select one..."
                                        required="Marrital Status is required"
                                        defaultValue={(policyData  && policyData.drivers && policyData.drivers[index]) ?  policyData.drivers[index].maritalStatus : ""}
                                        keepValue
                                        options={[
                                            { value: 'Married', label: 'Married' },
                                            { value: 'Single', label: 'Single' },
                                            { value: 'Widowed', label: 'Widowed' },
                                            { value: 'Divorced', label: 'Divorced' },
                                            { value: 'N/A', label: 'N/A' },
                                        ]}
                                    />
                                    <FieldInput
                                        name={`drivers[${index}].licenseAgeAt`}
                                        label="First License Age At"
                                        required="First License At"
                                        defaultValue="16"
                                        type="number"
                                    />


                            </SimpleGrid>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            ))}

            {drivers.length <= 20 && (
                <AddPlaceholder label="Add Driver" onClick={addItem} />
            )}
        </Accordion>
    </ChakraProvider>

    )


}

export default Driver;
