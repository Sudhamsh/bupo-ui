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
import { Button,Box,Grid,ThemeProvider,CSSReset,Stack,Text,SimpleGrid,ButtonGroup, } from "@chakra-ui/core";

export const MyForm = () => {
    const myForm = useForm()
    const [isUploadVisible, setIsUploadVisible] = React.useState(true)
    const [isManualEntryVisible, setIsManualEntryVisible] = React.useState(true)


    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <ThemeProvider>
            <CSSReset />
        <Formiz
            connect={myForm}
            onValidSubmit={handleSubmit}
        >
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
                    name="step2" // Split the form with FormizStep
                    /* Tech Debt - Should move to a separate module*/
                    label="Info Options"
                >

                    <Stack spacing={10}>
                        <Text fontSize="3xl">Information Options</Text>
                    </Stack>

                    <ButtonGroup spacing={4} padding={4} alignItems="center">
                        <Button variantColor="teal" size="lg"
                                onClick={(e) => {
                                    setIsUploadVisible(true);
                                    setIsManualEntryVisible(false);
                                    myForm.goToStep("step3");

                                }}
                        >
                            Upload Policy
                        </Button>
                        <Button variantColor="teal" size="lg"
                                onClick={(e) => {
                                    setIsManualEntryVisible(true);
                                    setIsUploadVisible(false);
                                    myForm.goToStep("step4");
                                }}
                        >
                            Enter Details
                        </Button>
                    </ButtonGroup>

                </FormizStep>

                <FormizStep
                    name="step3"
                    label="Upload Docs" // Split the form with FormizStep
                    isEnabled={isUploadVisible}

                >
                    file upload {isUploadVisible}
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
                </Grid>


            </form>
        </Formiz>
        </ThemeProvider>
    )
}

export default MyForm;