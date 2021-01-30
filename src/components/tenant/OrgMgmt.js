/**
 * Created by sudhamshbachu on 1/5/21.
 */
import React, { Component,useState, useEffect,useRef, } from 'react'
import { ChakraProvider,CSSReset,SimpleGrid,Text,Stack,Button,useToast } from "@chakra-ui/react";
import {FieldInput} from "../Fields/FieldInput"
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import  {isEmail}  from '@formiz/validations'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import Teams from  './Teams'
import Members from './Members'

export const OrgMgmt = (props) => {
    return (
        <ChakraProvider>

            <Stack spacing={10}>
                <Text fontSize="3xl">Organization Management</Text>
            </Stack>
            <Tabs isFitted variant="enclosed">
                <TabList>
                    <Tab>Members</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p><Members/></p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </ChakraProvider>
    )

}

export default OrgMgmt;
