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
            if(yearValue) {

                existingVehicles[index]["selectedYear"] = yearValue;
                existingVehicles[index]["makes"] = vehicleMakes[yearValue];
            }

            const  make = existingVehicles[index]["make"]
            if(make){
                existingVehicles[index]["models"] = allModelsByMakeByYear[2019][make];
            }
            //existingVehicles[index]["makes"] = allModelsByMakeByYear[2019]["BMW"];


            //Reset model if it has a value
            //existingVehicles[index]["makes"] = allModelsByMakeByYear[2019]["BMW"];
            //existingVehicles[index]["make"] = "BMW";


            }
        );

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
            {   vehicles.map(({ id,models,selectedMake,selectedModel,makes }, index) => (

                <Box borderWidth="1px" rounded="lg" p="6" maxW="200px">
                    <SimpleGrid columns={1} maxW="200px">

                        <FieldAutoComplete
                            label="Year"
                            name={`vehicles[${index}].year`}
                            index={index} items={autoYears}
                            setValueCallback={selectedYearCallback} defaultValue={policyData ? vehicles[index].year : '' }
                            />

                        <FieldAutoComplete
                            label="Make"
                            name={`vehicles[${index}].make`}
                            index={index} items={vehicles[index]["makes"]}
                            setValueCallback={setMake}
                            value={vehicles[index]["selectedMake"]}
                            defaultValue={policyData ? vehicles[index].make : '' }/>

                        <FieldAutoComplete
                            label="Model"
                            name={`vehicles[${index}].model`}
                            index={index}
                            items={vehicles[index]["models"]}
                            setValueCallback={setModel}
                            value={selectedModel}
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
            ))}


            {vehicles.length <= 20 && (
                <AddPlaceholder label="Add Vehicle" onClick={addItem} />

            )}
        </ThemeProvider>
    )
}

export default Vehicle;
