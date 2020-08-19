/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component,useState, useEffect, } from 'react'
import {
        ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
        Divider,
        } from "@chakra-ui/core";
//import {  useForm } from '@formiz/core';
import {FieldInput} from "../Fields/FieldInput"
import { v4 as uuidv4 } from 'uuid'
import vehicleMakes from "../../data/vehicleMakes.json"
import allModelsByMakeByYear from "../../data/models.json"


const driverCollection = [
    {
        id: uuidv4(),
        fName: 'New Driver',
    },
];

export const Driver = () =>{
    //const form = useForm({ subscribe: 'form' });
    const [drivers, setDrivers] = useState(driverCollection);

    useEffect(() => {
        setDrivers(driverCollection);
    });
    // [form.resetKey]);

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
                    <SimpleGrid key={id} isInline spacing="4" mb="6" data-test={`repeater-item[${index}]`}>

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
                            name={`drivers[${index}].fName`}
                            label="First Name"
                            required="First Name is required"
                            defaultValue={fName}
                            value={fName}
                        />
                        <FieldInput
                            name={`drivers[${index}].lName`}
                            label="Last Name"
                            required="Last Name is required"
                            defaultValue="Bachu"
                        />
                        <FieldInput
                            name={`drivers[${index}].dob`}
                            label="Date of Birth"
                            required="Date of Birth is required"
                            defaultValue="01/01/1980"
                            type="date"
                        />
                        <FieldInput
                            name={`drivers[${index}].licenseAgeAt`}
                            label="First License Age At"
                            required="First License At"
                            defaultValue="Bachu"
                        />

                        <Box pt="1.75rem">

                        </Box>
                    </SimpleGrid>
                </Box>
            ))}

        {drivers.length <= 20 && (
            <Button label="Add member" onClick={addItem} p="6"> Add Vehicle</Button>
        )}

    </ThemeProvider>
        // <div>
        //     <h3></h3>
        //     <Form>
        //
        //         <Form.Group controlId="dob">
        //             <Form.Label>Date of Birth</Form.Label>
        //             <Form.Control type="date" min="1930-01-01" max="2020-01-01"/>
        //         </Form.Group>
        //         <Form.Group controlId="licenseAgeAt">
        //             <Form.Label>First license at age of</Form.Label>
        //             <Form.Control type="number" placeholder="16" />
        //         </Form.Group>
        //         <Form.Group controlId="maritalStatus">
        //             <Form.Label>Home Ownership</Form.Label>
        //             <Form.Control as="select">
        //                 <option>Married</option>
        //                 <option>Single</option>
        //                 <option>Widowed</option>
        //                 <option>Divorced</option>
        //             </Form.Control>
        //         </Form.Group>
        //     </Form>
        // </div>
    )


}

export default Driver;
