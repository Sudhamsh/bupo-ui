/**
 * Created by sudhamshbachu on 1/11/21.
 */
import React, { Component,useState, useEffect, } from 'react'
import {Tags} from "./Tags"
import {Notes} from "./Notes"
import {Docs} from "./Docs"
import {WorkFlow} from "./WorkFlow"
import {AiOutlineShareAlt} from "react-icons/ai"
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Badge,Icon,Popover,
    } from "@chakra-ui/react";
import {getWithExpiry,isUserLoggedIn} from '../common/utils'
import {Summary} from './Summary'
import {EmailShareButton,FacebookShareButton,FacebookIcon,EmailIcon,
    WhatsappShareButton,WhatsappIcon} from 'react-share'
import {FinInfo} from './FinInfo'

export const PropertyDetails = (props) =>{

    const[propId, setPropId] = useState(props.propId);
    const[listNoi, setListNoi] = useState(props.listNoi);
    const[listCap, setListCap] = useState(props.listCap);
    const[askingPrice, setAskingPrice] = useState(props.askingPrice);
    const[notesInit, setNotesInit] = useState(false);


    return(
        <>
        {/*<Icon as={AiOutlineShareAlt}/>*/}
        <FacebookShareButton
            url="http://www.reit.com"
            quote="Title"
        >
            <FacebookIcon size={32} round />
        </FacebookShareButton>
        <EmailShareButton
            url="http://www.reit.com"
            subject="subject"
            body="body"

        >
            <EmailIcon size={32} round />
        </EmailShareButton>
        <WhatsappShareButton
            url="http://www.reit.com"
            title="title"
            separator=":: "
        >
            <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <Tabs variant="enclosed" isLazy defaultIndex={1}>
            <TabList>
                <Tab>Summary</Tab>
                <Tab>FinInfo</Tab>
                <Tab>Tags</Tab>
                <Tab>Notes</Tab>
                <Tab>Docs</Tab>
                <Tab>Deal Group</Tab>
            </TabList>

            <TabPanels>

                <TabPanel>
                    {isUserLoggedIn() ?
                        <Summary propId={propId}/>:
                        <>
                            <Icon name="lock" color="red.500"/><Badge variantColor="red">Login required!!!</Badge>
                        </>
                    }
                </TabPanel>
                <TabPanel>

                    {isUserLoggedIn() ?
                        <FinInfo propId={propId}/>:
                        <>
                        <Icon name="lock" color="red.500"/><Badge variantColor="red">Login required!!!</Badge>
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {isUserLoggedIn() ?
                        <Tags propId={propId}/> :
                        <>
                            <Icon name="lock" color="red.500"/><Badge variantColor="red">Login required!!!</Badge>
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {isUserLoggedIn() ?
                        <Notes propId={propId} /> :
                        <>
                            <Icon name="lock" color="red.500"/><Badge variantColor="red">Login required!!!</Badge>
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {isUserLoggedIn() ?
                    <Docs propId={propId} listNoi={listNoi} listCap={listCap} askingPrice={askingPrice}/> :
                        <>
                        <Icon name="lock" color="red.500"/><Badge variantColor="red">Login required!!!</Badge>
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {isUserLoggedIn() ?
                    <WorkFlow propId={propId}/> :
                        <>
                        <Icon name="lock" color="red.500"/><Badge variantColor="red">Login required!!!</Badge>
                        </>
                    }
                </TabPanel>
            </TabPanels>
        </Tabs>

        </>
    )

}

export default PropertyDetails;
