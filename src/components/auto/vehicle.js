/**
 * Created by sudhamshbachu on 5/29/20.
 */

import {FieldInput} from "../Fields/FieldInput"
import {FieldAutoComplete} from "../Fields/FieldAutoComplete"
import React, { Component,useState, useEffect, } from 'react'
import vehicleMakes from "../../data/vehicleMakes.json"
import allModelsByMake from "../../data/models.json"
import {
    ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,
} from "@chakra-ui/core";
import {  useForm } from '@formiz/core';

import { v4 as uuidv4 } from 'uuid'

const defaultCollection = [
    {
        id: uuidv4(),
        fName: 'New Driver',
    },
];


export const Automobile = () =>{
    const form = useForm({ subscribe: 'form' });
    const [models, setModels] = useState([]);
    const [autoYears, setAutoYears] = useState([]);

    const [collection, setCollection] = useState(defaultCollection);
    useEffect(() => {
        setCollection(defaultCollection);
    }, [form.resetKey]);

    useEffect(() => {
        //populate years json for downshift. Last 30 years
        if(autoYears.length == 0){
            var startModelYear = new Date().getFullYear() - 30;
            var latestModel = new Date().getFullYear() + 1;
            console.log(  startModelYear+ "This Year:" +latestModel);
            for( var i = startModelYear ; i <= latestModel ; i++){
                var tempYear= {"value" : i};
                autoYears.push(tempYear);
            }
        }

        setAutoYears(autoYears);

    });


    const addItem = () => {
        console.log('addItem' +  uuidv4());
        setCollection((c) => [
            ...c,
            {
                id: uuidv4(),
                fName: 'New Driver',
            },
        ]);

        console.log('addItem' +  JSON.stringify(collection));
    };

    const removeItem = (id) => {
        setCollection((c) => c.filter((x) => x.id !== id));
    };

    function setMake(make){
        console.log("make : " + make)
        setModels(allModelsByMake[make])
        console.log("models : " + allModelsByMake[make])
    }

    function selectedYear(year){

    }

    return(
        <ThemeProvider>
            <CSSReset />
            <Stack spacing={10}>
                <Text fontSize="3xl">Vehicle(s)</Text>
            </Stack>

            {collection.map(({ id, fName }, index) => (
                <Box borderWidth="1px" rounded="lg" p="6">
                    <SimpleGrid columns={1} maxW="200px">

                        <FieldAutoComplete label="Year" name="year" items={autoYears} setValue={selectedYear}/>
                        <FieldAutoComplete label="Make" name="make" items={vehicleMakes} setValue={setMake}/>
                        <FieldAutoComplete label="Model" name="model" items={models}/>
                        <FieldInput
                            name="vin"
                            label="VIN #"
                            defaultValue="57x3v"
                        />
                        <FieldInput
                            name="yearlyMileage"
                            label="Yearly Mileage"
                            required="Yearly Mileage is required"
                            defaultValue="6000"
                        />
                    </SimpleGrid>
                </Box>
            ))}


            {collection.length <= 20 && (
                <Button label="Add member" onClick={addItem} p="6"> Add Driver</Button>

            )}
        </ThemeProvider>
        // {/*<div>*/}
        //     {/*<Form>*/}
        //         {/*<Form.Group controlId="make">*/}
        //             {/*<Form.Label>Make</Form.Label>*/}
        //             {/*<Form.Control type="text" placeholder="" />*/}
        //         {/*</Form.Group>*/}
        //         {/*<Form.Group controlId="model">*/}
        //             {/*<Form.Label>Model</Form.Label>*/}
        //             {/*<Form.Control type="text" placeholder="" />*/}
        //         {/*</Form.Group>*/}
        //         {/*<Form.Group controlId="year">*/}
        //             {/*<Form.Label>Year</Form.Label>*/}
        //             {/*<Form.Control type="number"  maxlength="4"/>*/}
        //         {/*</Form.Group>*/}
        //         {/*<Form.Group controlId="vin">*/}
        //             {/*<Form.Label>VIN #</Form.Label>*/}
        //             {/*<Form.Control type="text" placeholder="16" />*/}
        //         {/*</Form.Group>*/}
        //         {/*<Form.Group controlId="yearlyMileage">*/}
        //             {/*<Form.Label>Expected Yearly Mileage</Form.Label>*/}
        //             {/*<Form.Control type="number" placeholder="" maxlength="6"/>*/}
        //         {/*</Form.Group>*/}
        //     {/*</Form>*/}
        // {/*</div>*/}
    )


}

export default Automobile;
