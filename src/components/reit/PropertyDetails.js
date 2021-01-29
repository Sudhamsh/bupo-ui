/**
 * Created by sudhamshbachu on 1/11/21.
 */
import React, { Component,useState, useEffect, } from 'react'
import {Tags} from "./Tags"
import {Notes} from "./Notes"
import {Docs} from "./Docs"
import {WorkFlow} from "./WorkFlow"
import {AiOutlineLock} from "react-icons/ai"
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Badge,Icon,Popover,
    } from "@chakra-ui/core";
import {getWithExpiry} from '../common/utils'
import {Summary} from './Summary'

export const PropertyDetails = (props) =>{

    const[propId, setPropId] = useState(props.propId);
    const[listNoi, setListNoi] = useState(props.listNoi);
    const[listCap, setListCap] = useState(props.listCap);
    const[askingPrice, setAskingPrice] = useState(props.askingPrice);
    const[notesInit, setNotesInit] = useState(false);

    return(
        <>
        <Tabs variant="enclosed" isLazy defaultIndex={3}>
            <TabList>
                <Tab>Summary</Tab>
                <Tab>Tags</Tab>
                <Tab>Notes</Tab>
                <Tab>Docs</Tab>
                <Tab>Deal Group</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Summary propId={propId}/>
                </TabPanel>
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
                <TabPanel>
                    <WorkFlow propId={propId}/>
                </TabPanel>
            </TabPanels>
        </Tabs>

        </>
    )

}

export default PropertyDetails;
