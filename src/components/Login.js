/**
 * Created by sudhamshbachu on 1/17/21.
 */

/**
 * Created by sudhamshbachu on 1/4/21.
 */
import React, { Component,useState, useEffect,useRef, } from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack,Button,useToast,Link, } from "@chakra-ui/core";
import {FieldInput} from "./Fields/FieldInput"
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import  {isEmail}  from '@formiz/validations'
import { GoogleLogin } from 'react-google-login';
import {localStore} from './common/utils'
import axios from 'axios';


export const Login = (props) => {
    const myForm = useForm({ subscribe: 'form' })
    const [isLoading, setIsLoading] = React.useState(false)
    const toast = useToast()
    const [ isLoggedIn, setIsLoggedIn] = React.useState(false);
    const {successCallBack} = props;

    const onSuccess = (res) => {
        //Works for Google login, will need changes for other third party sign-in.
        console.log('Login Success: currentUser:', JSON.stringify(res));
        if(res.profileObj) {
            setIsLoggedIn(true);
            let name = res.profileObj.givenName == null ? res.profileObj.name : res.profileObj.givenName;
            //perform serverside login

            //createUser(res.profileObj,"google")
            let values = {};
            values.email = res.profileObj.email;
            values.token = res.tokenId;
            login(values);

            successCallBack(name)
        }
    };


    function handleErrors(response) {
        if (!response.ok) {
            toast({
                title: "Error",
                description: "Unexpected Error Occured. Please retry.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            throw Error(response.statusText);
        }
        return response;
    }

    const createUser = (userDetails, type) =>{
        let apiPayload = {};
        if(type == "google"){
            apiPayload["email"] = userDetails.email;
            let name = userDetails.givenName == null ? userDetails.name : userDetails.givenName;
            apiPayload["displayName"] = name;
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(apiPayload),
            headers: {
                "Content-Type": "application/json"
            },
        };
        fetch('/rest/user', requestOptions)
            .then(response => {
                setIsLoading(false);
                if(response.status == 409){
                    toast({
                        title: "User Exists already",
                        description: "User Exists",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .then((result) => {
                    setIsLoading(false);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoading(false);
                    toast({
                        title: "Error",
                        description: "Error",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                });
    }

    const login = (values) => {
        setIsLoading(true);
        console.log(values);

        axios.post("/rest/auth",values)
            .then((response) => {
                setIsLoading(false);
                successCallBack(values.email);

                localStore("token",'Bearer '+response.data.token);
                localStore("userDisplayName",values.email);
                toast({
                    title: "Login Successful.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                //TODO: change this to event driven
                window.location.reload(true);
            })
            .catch((error) => {
                setIsLoading(false);
                // Error
                toast({
                    title: "Login Failed.",
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

    }

    const onFailure = (res) => {
        console.log('Login failed: res:', JSON.stringify(res));
        setIsLoggedIn(false);
    };


    return (
        <ThemeProvider>
            <CSSReset />
            <Stack spacing={10}>
                <Text fontSize="3xl">Please sign in.</Text>
            </Stack>
            <Formiz
                connect={myForm}
                onValidSubmit={login}
            >
                <form
                    noValidate
                    onSubmit={myForm.submit}
                    className="demo-form"
                    style={{ minHeight: '16rem' }}
                >
                    <FieldInput
                        name="email"
                        label="User Email"
                        type="email"
                        required="Email is required"
                        defaultValue="1610901538067@a.com"
                        validations={[
                            {
                                rule: isEmail(),
                                message: 'Not a valid email',
                            }
                        ]}

                    />
                    <FieldInput
                        name="password"
                        label="Password"
                        required="Password is required"
                        defaultValue="1610901538067"
                    />

                    <Button
                        type="submit"
                        disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                    >
                        {isLoading ? 'Saving...' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="760467338442-8mqcug72s5vn07njthobdd8tb6eqkek8.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'none'}
                    />
                </form>
            </Formiz>
            <Text>
                <Link color="teal.500" href="#">
                    Forgot User Id or Password
                </Link>
            </Text>
            <Text>
                <Link color="teal.500" href="#">
                    Create Account
                </Link>
            </Text>
        </ThemeProvider>
    )
}

export default Login;

