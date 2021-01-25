/**
 * Created by sudhamshbachu on 1/1/21.
 */
import React, { Component,useState, useEffect,useRef, } from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button,Box,useToast } from "@chakra-ui/core";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { MdBuild , MdCall } from "react-icons/md"
import { IconButton,SearchIcon } from "@chakra-ui/core"
import { AiOutlineStar,AiFillStar,AiOutlineProfile } from "react-icons/ai";
import { Switch } from "@chakra-ui/core";
import PropertyDetails from "./PropertyDetails";
import Notes from "./Notes"
import { Link,Icon } from "@chakra-ui/core";
import {formatCurrency} from "../common/utils";
import axios from 'axios'

export const Properties = (props) =>{

    const[propertiesList, setPropertiesList] = useState();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const target = useRef(null);
    const toast = useToast()

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

                        setPropertiesList(data.results)
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



    const columns = [
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
        sort: true
    },  {
        dataField: 'status',
        text: 'Status',
        sort: true
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
                formatCurrency(cellContent)
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
                formatCurrency(cellContent)
            );
        }
    },{
        dataField: 'population',
        text: 'Population',
        sort: true,
        formatter: (cellContent, row) => {
            return (
                formatCurrency(cellContent)
            );
        }
    }, {
        dataField: 'weightedScore',
        text: 'Weighted Score',
        sort: true,
    }];
    const expandRow = {
        renderer: row => (
            <div>
                <PropertyDetails propId={`${row.id}`} listNoi={`${row.noi}`} listCap={`${row.cap}`} askingPrice={`${row.askingPrice}`}/>
            </div>
        ),
        showExpandColumn: true
    };

    if(propertiesList == null) {
        return (
            <p>No Data!</p>
        )
    }else{
        return (
            <ThemeProvider>
                <CSSReset />
                <BootstrapTable
                    keyField='id'
                    data={ propertiesList }
                    columns={ columns }
                    filter={ filterFactory() }
                    striped
                    noDataIndication={ indication }
                    expandRow={ expandRow }
                />
            </ThemeProvider>
        )
    }
}

export default Properties;