/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { ButtonGroup,
         Button,
        } from 'react-bootstrap';

class InfoOptions extends Component{

    constructor(props) {
        super(props)
    }
    sendToParent = (event) => {
        //console.log(this.props.parentCallback);
        this.props.parentCallback(event.target.attributes.getNamedItem('data-key').value)
    }
    render(){
        console.log("this.props.currentStep " + this.props.currentStep);
        if (this.props.currentStep !== 'InfoOptions') { // Prop: The current step
            return null
        }
        return(
            <div>
                <ButtonGroup className="mr-2" aria-label="First group" onClick={this.sendToParent}>
                    <Button data-key="UPLOAD">Upload Policy</Button>
                    <Button data-key="ENTER_DETAILS">Enter Details</Button>
                </ButtonGroup>
            </div>
        )
    }

}

export default InfoOptions;
