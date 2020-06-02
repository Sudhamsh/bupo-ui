import React, { Component } from 'react'
import AutoGeneralInfo from "./auto/generalInfo";
import Automobile from "./auto/automobile";
import Coverage from "./auto/autoCoverage";
import Driver from "./auto/driver";
import AutoPolicyRequest from "./auto/autoPolicyRequest";
import InfoOptions from "./auto/infoOptions";
import FileUpload from "./fileUpload"
import { Form,ButtonGroup,Button } from 'react-bootstrap';

let Node = class {
    constructor(data,parent,left, right) {
        this.data = data;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
};

function initFormWorkflowTree(){
    var root = new Node('AutoPolicyRequest');
    var infoOptionsNode = new Node('InfoOptions',root);
    var fileUploadNode = new Node('FileUpload',infoOptionsNode);
    var autoGeneralInfoNode = new Node('AutoGeneralInfo',infoOptionsNode);
    var driverNode = new Node('Driver',autoGeneralInfoNode);
    var automobileNode = new Node('Automobile',driverNode);
    var coverageNode = new Node('Coverage',automobileNode);

    //two branches for info options
    root.left = infoOptionsNode;
    infoOptionsNode.left = fileUploadNode;
    infoOptionsNode.right = autoGeneralInfoNode;

    autoGeneralInfoNode.left = driverNode
    driverNode.left = automobileNode;
    automobileNode.left = coverageNode;

}

class MasterForm extends Component {
    constructor(props) {
        super(props)
        // Set the initial input values
        var root = initFormWorkflowTree()
        this.state = {
            currentIndex: 0,
            currentNode: root,
            email: '',
            username: '',
            password: '',
            stepsTree : root,
        }
        // Bind the submission to handleChange()
        this.handleChange = this.handleChange.bind(this)

        // Bind new functions for next and previous
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }


    // Test current step with ternary
    // _next and _previous functions will be called on button click
    _next() {
        let currentStep = this.state.currentStep
        let currentIndex = this.state.currentIndex
        // move current step is the present step is not last but one
        var stepLength = this.state.stepSequence.length;

        currentIndex = currentIndex < (stepLength -1) ?  currentIndex + 1 : (stepLength -1);

        console.log("this.state.stepSequence[currentIndex]"+this.state.stepSequence)
        this.setState({
            currentStep: this.state.stepSequence[currentIndex],
            currentIndex: currentIndex,
        })
    }

    _prev() {
        let currentIndex = this.state.currentIndex
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentIndex = (currentIndex >= 1) ? currentIndex - 1 : currentIndex ;
        this.setState({
            currentStep: this.state.stepSequence[currentIndex],
            currentIndex: currentIndex,
        })
    }

    // The "next" and "previous" button functions
    get previousButton(){
        let currentStep = this.state.currentStep;
        // If the current step is not 1, then render the "previous" button
        if(currentStep !== this.state.stepSequence[0]){
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        // ...else return nothing
        return null;
    }

    get nextButton(){
        let currentStep = this.state.currentStep;
        // If the current step is not 3, then render the "next" button
        if(currentStep !== this.state.stepSequence[this.state.stepSequence.length-1]){
            return (

                <Form.Group controlId="next">
                    <button
                        className="btn btn-primary float-right"
                        type="button" onClick={this._next}>
                        Next
                    </button>
                </Form.Group>
            )
        }
        // ...else render nothing
        return null;
    }

    // Use the submitted data to set the state
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleInfoOptions = (optionValue) =>{
        console.log("id", optionValue)
        if(optionValue === 'UPLOAD') {
            this.setState({
                "informationOption": optionValue,
                currentStep: 'FileUpload',
            })
        } else if (optionValue === 'ENTER_DETAILS'){
            this.setState({
                "informationOption": optionValue,
                currentStep: 'AutoGeneralInfo',
                currentIndex: 2
            })
        }
    }

    // Trigger an alert on form submission
    handleSubmit = (event) => {
        event.preventDefault()
        const { email, username, password } = this.state
        alert(`Your registration detail: \n 
      Email: ${email} \n 
      Username: ${username} \n
      Password: ${password}`)
    }

    // Render UI will go here...
    render() {
        return (
            <React.Fragment>
                <h1>Auto Policy</h1>

                <form onSubmit={this.handleSubmit}>

                    <AutoPolicyRequest
                        currentIndex={this.state.currentIndex}
                        currentStep={this.state.currentStep}
                        stepSequence={this.state.stepSequence}
                        handleChange={this.handleChange}
                    />
                    <InfoOptions
                        currentIndex={this.state.currentIndex}
                        currentStep={this.state.currentStep}
                        stepSequence={this.state.stepSequence}
                        parentCallback={this.handleInfoOptions}/>
                    <FileUpload
                        currentIndex={this.state.currentIndex}
                        currentStep={this.state.currentStep}
                        stepSequence={this.state.stepSequence}
                        />
                    <AutoGeneralInfo
                        currentIndex={this.state.currentIndex}
                        currentStep={this.state.currentStep}
                        stepSequence={this.state.stepSequence}
                        handleChange={this.handleChange}
                    />
                    <Driver
                        currentIndex={this.state.currentIndex}
                        currentStep={this.state.currentStep}
                        stepSequence={this.state.stepSequence}
                        handleChange={this.handleChange}
                    />
                    <Automobile
                        currentIndex={this.state.currentIndex}
                        currentStep={this.state.currentStep}
                        stepSequence={this.state.stepSequence}
                        handleChange={this.handleChange}
                    />
                    <Coverage
                        currentIndex={this.state.currentIndex}
                        currentStep={this.state.currentStep}
                        stepSequence={this.state.stepSequence}
                        handleChange={this.handleChange}
                    />

                    {this.previousButton}
                    {this.nextButton}

                </form>
            </React.Fragment>
        )
    }
}

export default MasterForm;