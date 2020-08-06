/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { ButtonGroup,
         Button,
        } from 'react-bootstrap';

class InfoOptions extends Component{

    render(){


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
