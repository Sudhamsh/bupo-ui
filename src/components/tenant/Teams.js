/**
 * Created by sudhamshbachu on 1/5/21.
 */
/**
 * Created by sudhamshbachu on 5/29/20.
 */

import {FieldInput} from "../Fields/FieldInput"
import {FieldAutoComplete} from "../Fields/FieldAutoComplete"
import React, { Component,useState, useEffect, } from 'react'
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import {
    ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button, Flex,Box,IconButton,
    Divider,Input,
    Icon,
} from "@chakra-ui/core";
import {AddPlaceholder} from "../AddPlaceholder"

import { v4 as uuidv4 } from 'uuid'

const defaultTeams = [
    {
        id: uuidv4(),

    },
];


export const Teams = (props) =>{

    const form = useForm({ subscribe: 'form' });
    const [teams, setTeams] = useState(defaultTeams);

    useEffect(() => {

    }, [form.resetKey]);



    const addItem = () => {
        setTeams((c) => [
            ...c,
            {
                id: uuidv4(),

            },
        ]);
    };

    const removeItem = (id) => {
        setTeams((c) => c.filter((x) => x.id !== id));
    };



    return(
        <ThemeProvider>
            <CSSReset />

            <Formiz>
                <Stack spacing={10}>
                    <Text fontSize="3xl">Teams</Text>
                </Stack>
                <Box>
                {   teams.map(({ id,name}, index) => (
                    <Box flex="1">
                        <FieldInput
                            name={`teams[${index}].name`}
                            defaultValue={name}
                            label="Name"
                            required="Required"
                            m="0"
                        />
                    </Box>
                ))}

                </Box>
                {teams.length <= 20 && (
                    <AddPlaceholder label="Add Vehicle" onClick={addItem} />

                )}
            </Formiz>
        </ThemeProvider>
    )
}

export default Teams;

