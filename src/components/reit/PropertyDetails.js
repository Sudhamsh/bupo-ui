/**
 * Created by sudhamshbachu on 1/11/21.
 */
import React, { Component,useState, useEffect, } from 'react'
import {Tags} from "./Tags"
import {Notes} from "./Notes"
import {Docs} from "./Docs"

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
export const PropertyDetails = (props) =>{

    const[propId, setPropId] = useState(props.propId);
    const[listNoi, setListNoi] = useState(props.listNoi);
    const[listCap, setListCap] = useState(props.listCap);
    const[askingPrice, setAskingPrice] = useState(props.askingPrice);
    const[notesInit, setNotesInit] = useState(false);

    return(
        <>
        <Tabs variant="enclosed" isLazy defaultIndex={2}>
            <TabList>
                <Tab>Tags</Tab>
                <Tab>Notes</Tab>
                <Tab>Docs</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Tags propId={propId}/>
                </TabPanel>
                <TabPanel>
                    <Notes propId={propId} />
                </TabPanel>
                <TabPanel>
                    <Docs propId={propId} listNoi={listNoi} listCap={listCap} askingPrice={askingPrice}/>
                </TabPanel>
            </TabPanels>
        </Tabs>

        </>
    )

}

export default PropertyDetails;
