/**
 * Created by sudhamshbachu on 5/29/20.
 */

import {FieldInput} from "../Fields/FieldInput"
import {FieldAutoComplete} from "../Fields/FieldAutoComplete"
import React, { Component,useState, useEffect, } from 'react'
import vehicleMakes from "../../data/vehicleMakes.json"
import allModelsByMakeByYear from "../../data/models.json"
import {
    ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,
} from "@chakra-ui/core";
import {  useForm } from '@formiz/core';

import { v4 as uuidv4 } from 'uuid'

const defaultVehicles = [
    {
        id: uuidv4(),

    },
];


export const Automobile = () =>{

    const form = useForm({ subscribe: 'form' });
    const [autoYears, setAutoYears] = useState([]);
    const [vehicles, setVehicles] = useState(defaultVehicles);

    useEffect(() => {
        setVehicles(defaultVehicles);
    }, [form.resetKey]);

    useEffect(() => {
        //populate years json for downshift. Last 30 years
        if(autoYears.length == 0){
            var startModelYear = new Date().getFullYear() - 30;
            var latestModel = new Date().getFullYear() + 1;
            console.log(  startModelYear+ "This Year:" +latestModel);
            for( var i = startModelYear ; i <= latestModel ; i++){
                autoYears.push(i+"");
            }
            setAutoYears(autoYears);
        }

        console.log("useEffect....");
    });//[vehicles]);


    const addItem = () => {
        setVehicles((c) => [
            ...c,
            {
                id: uuidv4(),

            },
        ]);
    };

    const removeItem = (id) => {
        setVehicles((c) => c.filter((x) => x.id !== id));
    };

    function setMake(make,index){

        vehicles[index]["selectedMake"] = make;

        //Reset model if it has a value
        vehicles[index]["selectedModel"] = "";
        vehicles[index]["models"] = allModelsByMakeByYear[vehicles[index]["year"]][make];

        setVehicles( JSON.parse(JSON.stringify(vehicles)))
        //console.log("models : " + allModelsByMakeByYear[userSelectedYear][make])
    }

    function setModel(model,index){
        vehicles[index]["selectedModel"] = model;
    }

    function selectedYear(year,index){
        console.log("index"+index);
        vehicles[index]["year"] = year;
        vehicles[index]["makes"] = vehicleMakes[year];

        //reset make if it has a value
        vehicles[index]["selectedMake"] = "";
        setVehicles( JSON.parse(JSON.stringify(vehicles)))
    }

    return(
        <ThemeProvider>
            <CSSReset />
            <Stack spacing={10}>
                <Text fontSize="3xl">Vehicle(s)</Text>
            </Stack>
            {vehicles.map(({ id,models,selectedMake,selectedModel }, index) => (
                <Box borderWidth="1px" rounded="lg" p="6">
                    <SimpleGrid columns={1} maxW="200px">

                        <FieldAutoComplete label="Year" name={`vehicles[${index}].year`} index={index} items={autoYears} setValueCallback={selectedYear} value=""/>
                        <FieldAutoComplete label="Make" name={`vehicles[${index}].make`}  index={index} items={vehicles[index]["makes"]} setValueCallback={setMake}  value={vehicles[index]["selectedMake"]}/>
                        <FieldAutoComplete label="Model" name={`vehicles[${index}].model`}  index={index} items={vehicles[index]["models"]} setValueCallback={setModel}  value={selectedModel}/>
                        <FieldInput
                            name={`vehicles[${index}].vin`}
                            label="VIN #"
                            defaultValue="57x3v"
                        />
                        <FieldInput
                            name={`vehicles[${index}].yearlyMileage`}
                            label="Yearly Mileage"
                            required="Yearly Mileage is required"
                            defaultValue="6000"
                        />
                    </SimpleGrid>
                </Box>
            ))}


            {vehicles.length <= 20 && (
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
