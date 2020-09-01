/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component,useState, useEffect, } from 'react'
import {
        ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
        Divider,
        } from "@chakra-ui/core";
import {  useForm } from '@formiz/core';
import {FieldInput} from "../Fields/FieldInput"
import {FieldSelect} from "../Fields/FieldSelect"
import { v4 as uuidv4 } from 'uuid'
import {AddPlaceholder} from "../AddPlaceholder"


const driverCollection = [
    {
        id: uuidv4(),
        fName: 'New Driver',
    },
];

export const Driver = () =>{
    const form = useForm({ subscribe: 'form' });
    const [drivers, setDrivers] = useState(driverCollection);

    useEffect(() => {
        setDrivers(driverCollection);
    },[form.resetKey]);

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
    <ThemeProvider>
        <CSSReset />
        <Stack spacing={10}>
            <Text fontSize="3xl">Drivers()</Text>
        </Stack>
            {drivers.map(({ id, fName }, index) => (
                <Box borderWidth="1px" rounded="lg" p="6">
                    <SimpleGrid key={id} direction="row" spacing="4" mb="6" data-test={`repeater-item[${index}]`} maxW="200px">

                            <Stack spacing={10} maxW="200px">
                                <Text fontSize="3xl">Driver : {fName}
                                <IconButton
                                    aria-label="Delete"
                                    icon="delete"
                                    onClick={() => removeItem(id)}
                                    variant="ghost"
                                />
                                </Text>
                            </Stack>

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
                                defaultValue="01/01/1980"
                                type="date"
                            />
                            <FieldSelect
                                name={`drivers[${index}].educationLevel`}
                                label="Education Level"
                                placeholder="Select one..."
                                keepValue
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
            ))}

        {drivers.length <= 20 && (

            <AddPlaceholder label="Add Driver" onClick={addItem} />
        )}

    </ThemeProvider>

    )


}

export default Driver;
