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
    Divider,Input,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Icon,
} from "@chakra-ui/core";
import {AddPlaceholder} from "../AddPlaceholder"
import {  useForm } from '@formiz/core';
import { v4 as uuidv4 } from 'uuid'

const defaultVehicles = [
    {
        id: uuidv4(),

    },
];


export const Vehicle = (props) =>{
    const { policyData } = props;
    const form = useForm({ subscribe: 'form' });
    const [autoYears, setAutoYears] = useState([]);


    //If there is existing Policy Data we need to trigger downshift items list
    let existingVehicles =  defaultVehicles;
    if(policyData){
        existingVehicles =  policyData.vehicles;
        existingVehicles.map(({ id,models,selectedMake,selectedModel }, index) => {

                //Reset makes if it has a value
                const yearValue = existingVehicles[index]["year"];
                if (yearValue) {

                    existingVehicles[index]["selectedYear"] = yearValue;
                    existingVehicles[index]["makes"] = vehicleMakes[yearValue];
                }

                const make = existingVehicles[index]["make"]
                if (make) {
                    existingVehicles[index]["models"] = allModelsByMakeByYear[2019][make];
                }
            });

    }
    const [vehicles, setVehicles] = useState(existingVehicles);

    useEffect(() => {

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
        vehicles[index]["models"] = allModelsByMakeByYear[vehicles[index]["selectedYear"]][make];

        setVehicles( JSON.parse(JSON.stringify(vehicles)))
        //console.log("models : " + allModelsByMakeByYear[userSelectedYear][make])
    }

    function setModel(model,index){
        vehicles[index]["selectedModel"] = model;
    }

    function selectedYearCallback(year,index){
        console.log("selectedYearCallback....");
        vehicles[index]["selectedYear"] = year;
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
            <Accordion>
                {   vehicles.map(({ id,models,selectedMake,selectedModel,makes }, index) => (
                    <AccordionItem>
                        <AccordionHeader _expanded={{ bg: "green.500", color: "black" }}>
                            <Box flex="1" textAlign="left">
                                Vehicle :  {vehicles[index].selectedYear} - {vehicles[index].make} -  {vehicles[index].model}
                            </Box>
                            <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel pb={4}>
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
                                    <FieldAutoComplete
                                        label="Year"
                                        name={`vehicles[${index}].year`}
                                        index={index} items={autoYears}
                                        required="Year is required"
                                        setValueCallback={selectedYearCallback} defaultValue={policyData ? vehicles[index].year : '' }
                                        />

                                    <FieldAutoComplete
                                        label="Make"
                                        name={`vehicles[${index}].make`}
                                        index={index} items={vehicles[index]["makes"]}
                                        setValueCallback={setMake}
                                        value={vehicles[index]["selectedMake"]}
                                        required="Make is required"
                                        defaultValue={policyData ? vehicles[index].make : '' }/>

                                    <FieldAutoComplete
                                        label="Model"
                                        name={`vehicles[${index}].model`}
                                        index={index}
                                        items={vehicles[index]["models"]}
                                        setValueCallback={setModel}
                                        value={selectedModel}
                                        required="Model is required"
                                        defaultValue={policyData ? vehicles[index].model : '' }/>

                                    <FieldInput
                                        name={`vehicles[${index}].vin`}
                                        label="VIN #"
                                        defaultValue={policyData ? vehicles[index].vin : "57x3v" }

                                    />

                                    <FieldInput
                                        name={`vehicles[${index}].yearlyMileage`}
                                        label="Yearly Mileage"
                                        required="Yearly Mileage is required"
                                        defaultValue={policyData ? vehicles[index].yearlyMileage : "9999" }
                                        type="number"
                                    />
                                </SimpleGrid>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                ))}


                {vehicles.length <= 20 && (
                    <AddPlaceholder label="Add Vehicle" onClick={addItem} />

                )}
            </Accordion>
        </ThemeProvider>
    )
}

export default Vehicle;
