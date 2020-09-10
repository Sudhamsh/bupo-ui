import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';

import Auto from './components/auto.js'
import Driver from './components/auto/driver.js'
import AutoLookup from './components/auto/AutoLookup'
import {
    ThemeProvider,CSSReset,Box,Stack,Text,Button,Flex,
} from "@chakra-ui/core";

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


const About = () => (
    <div>
        <h2>About</h2>
    </div>
)



export const App = () =>{
    const history = useHistory();

    const autoSearch = () =>{
        window.location.href = '/auto/search'
    }

    return (
        <ThemeProvider>
            <CSSReset />
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
        </ThemeProvider>

    )
}

export default App;
