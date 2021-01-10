/**
 * Created by sudhamshbachu on 1/5/21.
 */
import React, { Component,useState, useEffect,useRef, } from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button,useToast } from "@chakra-ui/core";
import {FieldInput} from "../Fields/FieldInput"
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import  {isEmail}  from '@formiz/validations'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core"
import Teams from  './Teams'
import Members from './Members'

export const OrgMgmt = (props) => {
    return (
        <ThemeProvider>
            <CSSReset />
            <Stack spacing={10}>
                <Text fontSize="3xl">Organization Management</Text>
            </Stack>
            <Tabs isFitted variant="enclosed">
                <TabList>
                    <Tab>Teams</Tab>
                    <Tab>Members</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p><Teams/></p>
                    </TabPanel>
                    <TabPanel>
                        <p><Members/></p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </ThemeProvider>
    )

}

export default OrgMgmt;
