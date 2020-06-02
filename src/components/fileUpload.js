/**
 * Created by sudhamshbachu on 5/16/20.
 */
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';

import React, { Component,useState } from 'react'


class FileUpload extends Component{
    constructor(props) {
        super(props)
        this.state = {
            file: '',
        }

        this.updateInput = this.updateInput.bind(this)
        this.uploadWithFormData = this.uploadWithFormData.bind(this)
    }
    updateInput(e) {
        const value = e.target.files[0]
        this.setState({
            file: value
        })
    }
    uploadWithFormData(){
        console.log("uploadWithFormData" + this.state.file);
        const formData = new FormData();
        formData.append("file", this.state.file);

        submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    }
    render(){

        if (this.props.currentStep !== 'FileUpload') { // Prop: The current step
            return null
        }
        return (
            <div>
                    Upload
                    <Form.Group controlId="firstName">
                        <Form.Control type="file" placeholder=""  onChange={this.updateInput}/>
                    </Form.Group>

                    <button onClick={this.uploadWithFormData}>
                        Submit
                    </button>

            </div>
        )
    }

}

function submitForm(contentType, data, setResponse) {
    console.log("submitForm" + data);
    axios({
        url: 'http://localhost:8080/rest/upload/pdf',
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': contentType,
//            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    }).then((response) => {
        console.log("response" + response.data);
    }).catch((error) => {
        console.log("error : " + error);
    })
}

export default FileUpload
