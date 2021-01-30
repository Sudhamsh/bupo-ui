/**
 * Created by sudhamshbachu on 1/1/21.
 */
import React, { Component,useState, useEffect,useRef, } from 'react'
import { ChakraProvider,CSSReset,SimpleGrid,Text,Stack,Button,Box,useToast } from "@chakra-ui/react";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter,selectFilter } from 'react-bootstrap-table2-filter';
import { MdBuild , MdCall } from "react-icons/md"
import { IconButton,SearchIcon } from "@chakra-ui/react"
import { AiOutlineStar,AiFillStar,AiOutlineProfile } from "react-icons/ai";

import PropertyDetails from "./PropertyDetails";
import Notes from "./Notes"
import { Link,Icon,Flex,FormLabel,Switch } from "@chakra-ui/react";
import {formatCurrency,formatNumber} from "../common/utils";
import axios from 'axios'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

export const Properties = (props) =>{

    const[propertiesList, setPropertiesList] = useState();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [isAdvanceFilter, setAdvanceFilter] = useState(false);
    const target = useRef(null);
    const toast = useToast();

    function handleErrors(response) {
        if (!response.ok) {
            alert('Error 3')
            throw Error(response.statusText);
        }
        return response;
    }

    function indication() {
        // return something here
    }

     function fav(propertyId){
        setIsFav(true);

         axios.put('/rest/reit/settings/propertyId/'+propertyId)
             .then((response) => {
                 setIsLoading(false);
                 toast({
                     title: "Fav Saved.",
                     status: "success",
                     duration: 9000,
                     isClosable: true,
                 })
             })
             .catch((error) => {
                 setIsLoading(false);
                 // Error
                 toast({
                     title: "Error while saving fav. Try again.",
                     status: "error",
                     duration: 9000,
                     isClosable: true,
                 })
                 if (error.response) {
                     // The request was made and the server responded with a status code
                     // that falls out of the range of 2xx
                     // console.log(error.response.data);
                     // console.log(error.response.status);
                     // console.log(error.response.headers);
                 } else if (error.request) {
                     // The request was made but no response was received
                     // `error.request` is an instance of XMLHttpRequest in the
                     // browser and an instance of
                     // http.ClientRequest in node.js
                     console.log(error.request);
                 } else {
                     // Something happened in setting up the request that triggered an Error
                     console.log('Error', error.message);
                 }
                 console.log(error.config);
             });
    };


    //this.fav = this.fav.bind(this);

    useEffect(()=>{

        if(propertiesList == null) {
            axios.post('/rest/reit/property')
                .then((response) => {
                    setIsLoading(false);
                    const data = response.data;
                    if (data != null && data.results) {
                        console.log("JSON : " + JSON.stringify(data.results));
                        const propList = data.results;
                        setPropertiesList(propList)

                    } else {
                        toast({
                            title: "Error Getting Property list.",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                })
                .catch((error) => {
                    setIsLoading(false);

                    if (error.response) {
                        // Error
                        toast({
                            title: "Error Getting Property list.",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    } else if (error.request) {
                        // Error
                        toast({
                            title: "Error Getting Property list. Remote Server took a break :)",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }
    },[propertiesList]);

    useEffect(() => {

    },[isFav]);

    const statusOptions = {
        SHORTLISTED:"SHORTLISTED",
        LOI_SUBMITTED:"LOI_SUBMITTED",
        LOI_ACCEPTED:"LOI_ACCEPTED",
        PSA_RECEIVED:"PSA_RECEIVED",
        PSA_SIGNED:"PSA_SIGNED",
        INSPECTION_PERIOD:"INSPECTION_PERIOD",
        INSPECTION_COMPLETED:"INSPECTION_COMPLETED",
        FINANCE_APPROVED:"FINANCE_APPROVED",
        CLOSED:"CLOSED",
        IGNORE:"IGNORE"
    };

    const simpleColumns = [
        {
            dataField: 'id',
            text: 'Property ID',
            hidden: true
        },{
            dataField: 'propertyName',
            text: 'Property Name',
        }, {
            dataField: 'remainingTerm',
            text: 'Remaining Term',
            sort: true
        },  {
            dataField: 'statusBean.status',
            text: 'Status',
        },  {
            dataField: 'externalLink',
            text: 'External Link',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    <Link href={cellContent} isExternal>
                        Source <Icon name="external-link" mx="2px" />
                    </Link>
                );
            }
        }, {
            dataField: 'askingPrice',
            text: 'Asking Price',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent)
                );
            }
        }, {
            dataField: 'cap',
            text: 'CAP',
            sort: true,
        },{
            dataField: 'noi',
            text: 'NOI',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent)
                );
            }
        },{
            dataField: 'population',
            text: 'Population',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent)
                );
            }
        }, {
            dataField: 'weightedScore',
            text: 'Weighted Score',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent,3)
                );
            }
        }];
    const [columns, setColumns] = useState(simpleColumns);

    const advanceColumns = [
        {
            dataField: 'id',
            text: 'Property ID',
            hidden: true
        },
        {
            dataField: 'df1',
            isDummyField: true,
            text: 'Actions',
            formatter: (cellContent, row) => {
                return (
                    <>
                    <Box as={AiOutlineStar} size="32px" color="yellow.400" onClick={() => fav(row.id)}/>
                    </>
                );

                //<IconButton aria-label="Search database" icon="search" onClick={() => fav(row.id)}/>
            }
        },{
            dataField: 'propertyName',
            text: 'Property Name',
        }, {
            dataField: 'remainingTerm',
            text: 'Remaining Term',
            filter: numberFilter(),
            sort: true
        },  {
            dataField: 'status',
            text: 'Status',
            filter: selectFilter({
                options: statusOptions
            })
        },  {
            dataField: 'externalLink',
            text: 'External Link',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    <Link href={cellContent} isExternal>
                        Source <Icon name="external-link" mx="2px" />
                    </Link>
                );
            }
        }, {
            dataField: 'askingPrice',
            text: 'Asking Price',
            sort: true,
            filter: numberFilter(),
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent)
                );
            }
        }, {
            dataField: 'cap',
            text: 'CAP',
            sort: true,
            filter: numberFilter(),
        },{
            dataField: 'noi',
            text: 'NOI',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent)
                );
            }
        },{
            dataField: 'population',
            text: 'Population',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent)
                );
            }
        }, {
            dataField: 'weightedScore',
            text: 'Weighted Score',
            sort: true,
            formatter: (cellContent, row) => {
                return (
                    formatNumber(cellContent,3)
                );
            }
        }];

    const expandRow = {
        renderer: row => (
            <div>
                <PropertyDetails propId={`${row.id}`} listNoi={`${row.noi}`} listCap={`${row.cap}`} askingPrice={`${row.askingPrice}`}/>
            </div>
        ),
        showExpandColumn: true
    };

    const toggleFilter = () =>{

        if(!isAdvanceFilter) {
            setColumns(advanceColumns);
        }else{
            setColumns(simpleColumns);
        }
        setAdvanceFilter(!isAdvanceFilter);
    }

    if(propertiesList == null) {
        return (
            <p>No Data!</p>
        )
    }else{
        return (
            <ChakraProvider>

                <Flex justify="left" align="right">
                    <FormLabel htmlFor="advance-filters">Advance Filters</FormLabel>
                    <Switch id="advance-filters" onChange={toggleFilter}/>
                </Flex>
                <BootstrapTable
                    keyField='id'
                    data={ propertiesList }
                    columns={ columns }
                    filter={ filterFactory() }
                    striped
                    noDataIndication={ indication }
                    expandRow={ expandRow }
                    cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }

                />
            </ChakraProvider>
        )
    }
}

export default Properties;