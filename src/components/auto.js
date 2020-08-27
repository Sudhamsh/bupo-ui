import React from 'react'
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import { isEmail } from '@formiz/validations'
import { MyField } from './Fields/FieldInput'
import  GeneralInfo  from './generalInfo'
import  Vehicle  from './auto/vehicle'
import  Driver  from './auto/driver'
import PolicyRequest from './PolicyRequest'
import Coverage from "./auto/autoCoverage";
import { Button,Box,Grid,ThemeProvider,CSSReset,Stack,Text,SimpleGrid,ButtonGroup,useToast,Heading,Spinner, } from "@chakra-ui/core";
import SimpleStorage from 'react-simple-storage'
import { useToastValues } from '../hooks/useToastValues'

export const MyForm = () => {
    const myForm = useForm()
    const toastValues = useToastValues();
    const toast = useToast();
    const [isUploadVisible, setIsUploadVisible] = React.useState(true)
    const [isManualEntryVisible, setIsManualEntryVisible] = React.useState(true)
    const [uniqueCode, setUniqueCode] = React.useState('')
    const [saveLoading, setSaveLoading] = React.useState(false)


    const handleSubmit = (values) => {
        console.log(values);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        fetch('/rest/auto', requestOptions)
            .then(response => response.json())
            .then(data => setUniqueCode(data.uniqueCode));
    }
    if(false){
        return (
            <Box maxW="32rem">
                <Text fontSize="4xl">Thank You, Your Policy Request code : {uniqueCode}</Text>
            </Box>
        )
    }else{
        return (
        <ThemeProvider>
            <CSSReset />
            <Box maxW="32rem">
                <Text fontSize="4xl">Thank You, Your Policy Request code : {uniqueCode}</Text>
            </Box>
                <Formiz
                    connect={myForm}
                    onValidSubmit={handleSubmit}
                >
                    <SimpleStorage parent="{this}"/>
                    <form
                        noValidate
                        // Change the myForm.submit to myForm.submitStep
                        onSubmit={myForm.submitStep}
                    >


                        <FormizStep
                            name="step1" // Split the form with FormizStep
                            label="General Info"
                        >
                            <PolicyRequest/>
                        </FormizStep>


                        <FormizStep
                            name="step4" // Split the form with FormizStep
                            isEnabled={isManualEntryVisible}
                            label="Manual Entry"
                        >
                            <GeneralInfo/>
                        </FormizStep>
                        <FormizStep
                            name="step5" // Split the form with FormizStep
                            label="Driver"
                        >
                            <Driver/>
                        </FormizStep>

                        <FormizStep
                            name="step6" // Split the form with FormizStep
                            label="Vehicle"
                        >
                            <Vehicle/>
                        </FormizStep>

                        <FormizStep
                            name="step7" // Split the form with FormizStep
                            label="Coverage"
                        >
                            <Coverage/>
                        </FormizStep>


                        {/* Update the submit button to allow navigation between steps. */}
                        <Grid templateColumns="1fr 2fr 1fr" alignItems="center">

                            {
                                !myForm.isFirstStep && (
                                <Button
                                    gridColumn="1"
                                    onClick={myForm.prevStep}
                                >
                                    Previous
                                </Button>
                            )}

                            <Button
                                type="submit"
                                gridColumn="3"
                                isDisabled={
                                    !myForm.isStepValid && myForm.isStepSubmitted
                                }
                            >
                                {myForm.isLastStep ? 'Submit' : 'Next'}
                            </Button>
                            {saveLoading ? <Spinner /> : ''}
                        </Grid>


                    </form>
                </Formiz>
            </ThemeProvider>

        )
    }
}

export default MyForm;