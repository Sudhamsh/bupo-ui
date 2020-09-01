import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';

import Auto from './components/auto.js'
import Driver from './components/auto/driver.js'
import AutoLookup from './components/auto/AutoLookup'

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


const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)


function App() {
    return (
    <Container>
        <Header/>
        <Jumbotron>
            Get Best price in the market with least effort. Or Let seller come to you. Or Seller bids for your business.
        </Jumbotron>
        <Container fluid>
            <Router>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/auto" component={Auto}/>

                {/*<Route path="/auto/search" component={AutoLookup}/>*/}

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

    )
}

export default App;
