/**
 * Created by sudhamshbachu on 1/11/21.
 */
import React, { Component,useState, useEffect, } from 'react'
import {Tags} from "./Tags"
import {Notes} from "./Notes"
import {Docs} from "./Docs"
import {AiOutlineLock} from "react-icons/ai"
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Badge,Icon,Popover,
    } from "@chakra-ui/core";
import {getWithExpiry} from '../common/utils'

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
                    {getWithExpiry("userDisplayName") ?
                        <Notes propId={propId} /> :
                        <>
                            <Icon name="lock" color="red.500"/><Badge variantColor="red">Login required!!!</Badge>
                        </>
                    }
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
