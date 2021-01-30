import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';

import Auto from './components/auto.js'
import AutoLookup from './components/auto/AutoLookup'
import SubmitQuote from './components/agent/quote/SubmitQuote'
import PolicyRequests from './components/agent/PolicyRequests'
import ViewQuotes from './components/auto/ViewQuotes'
import Properties from './components/reit/properties'
import CreateTenant from './components/tenant/CreateTenant'
import OrgMgmt from './components/tenant/OrgMgmt'
import HowItWorks from './components/reit/HowItWorks'
import Investments from './components/reit/Investments'
import FAQs from './components/reit/FAQs'
import AboutUs from './components/reit/AboutUs'
import ContactUs from './components/reit/ContactUs'

import {
    ChakraProvider,CSSReset,Box,Stack,Text,Button,Flex,
} from "@chakra-ui/react";

import {
    Container,
    Jumbotron,
    Row,
    Col,
} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import axios from 'axios';
import {getWithExpiry} from './components/common/utils'



const About = () => (
    <div>
        <h2>About</h2>
    </div>
)



export const App = () =>{
    const history = useHistory();
    axios.defaults.headers.common['Authorization'] = getWithExpiry('token');
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const autoSearch = () =>{
        window.location.href = '/auto/search'
    }

    return (
        <ChakraProvider>

            <Header/>
            <Container>

                <Flex justify="space-between">
                    <Flex  align="flex-end">
                        <Text fontSize="4xl"> Save money with Privacy Protection.</Text>
                    </Flex>
                    <Flex  align="center" justify="right">
                        <Button leftIcon="search" onClick={autoSearch}>Retrieve Existing Quote</Button>
                    </Flex>
                </Flex>


                <Container fluid>
                    <Router>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/auto" component={Auto}/>

                        <Route exact path="/auto/search" component={AutoLookup}/>
                        <Route exact path="/auto/quote" component={SubmitQuote}/>
                        <Route exact path="/agent/requests" component={PolicyRequests}/>
                        <Route exact path="/viewQuotes" component={ViewQuotes}/>
                        <Route exact path="/properties" component={Properties}/>
                        <Route exact path="/createTenant" component={CreateTenant}/>
                        <Route exact path="/OrgMgmt" component={OrgMgmt}/>
                        <Route exact path="/HowItWorks" component={HowItWorks}/>
                        <Route exact path="/Investments" component={Investments}/>
                        <Route exact path="/FAQs" component={FAQs}/>
                        <Route exact path="/ContactUs" component={ContactUs}/>
                        <Route exact path="/AboutUs" component={AboutUs}/>
                    </Router>
                </Container>
                <br/>
                <Container className="bg-grey">
                    <Row>
                        <Col sm={4}>

                        </Col>
                        <Col sm={8}>
                            <h2>Our Values</h2>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <h2>SERVICES</h2>
                    Auto & Home Insurance Quotes

                </Container>
                <hr/>
                <span>Footer</span>
            </Container>
        </ChakraProvider>

    )
}

export default App;
