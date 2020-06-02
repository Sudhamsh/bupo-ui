import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBeer } from 'react-icons/fa';
import Header from './components/Header';
import FileUpload from './components/fileUpload'
import MasterForm from './components/auto.js'

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

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
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
                <Route path="/topics" component={Topics}/>
                <Route path="/auto" component={MasterForm}/>
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


        <FileUpload/>
        <span>Footer</span>
    </Container>

    )
}

export default App;
