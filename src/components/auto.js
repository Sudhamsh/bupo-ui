import React from 'react'
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import { isEmail } from '@formiz/validations'
import { MyField } from './MyField'
import  AutoGeneralInfo  from './auto/autoGeneralInfo'
import  Vehicle  from './auto/vehicle'
import  Driver  from './auto/driver'
import AutoPolicyRequest from './auto/autoPolicyRequest'
import Coverage from "./auto/autoCoverage";

export const MyForm = () => {
    const myForm = useForm()
    const [isUploadVisible, setIsUploadVisible] = React.useState(true)
    const [isManualEntryVisible, setIsManualEntryVisible] = React.useState(true)


    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formiz
            connect={myForm}
            onValidSubmit={handleSubmit}
        >
            <form
                noValidate
                // Change the myForm.submit to myForm.submitStep
                onSubmit={myForm.submitStep}
            >

                <div className="demo-form__tabs">
                    {myForm.steps.map(step => (
                        <button
                            key={step.name}
                            className={`demo-form__tab ${step.name === myForm.currentStep.name ? 'is-active' : ''}`}
                            type="button"
                            onClick={() => myForm.goToStep(step.name)}
                        >
                            {!step.isValid && step.isSubmitted && (
                                <small className="mr-2">⚠️</small>
                            )}
                            { step.label } { step.isEnabled }
                        </button>
                    ))}
                </div>

                <FormizStep
                    name="step1" // Split the form with FormizStep
                    label="General Info"
                >
                    <AutoPolicyRequest/>
                </FormizStep>


                <FormizStep
                    name="step2" // Split the form with FormizStep
                    /* Tech Debt - Should move to a separate module*/
                    label="Info Options"
                >

                    <div className="mt-4 text-center">

                        <button
                            type="button"
                            onClick={(e) => {
                                setIsUploadVisible(true);
                                setIsManualEntryVisible(false);
                                myForm.goToStep("step3");

                            }}
                            className="demo-button is-secondary is-small mx-1"
                        >
                            Policy Upload
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                setIsManualEntryVisible(true);
                                setIsUploadVisible(false);
                                myForm.goToStep("step4");
                            }}
                            className="demo-button is-secondary is-small mx-1"
                        >
                            Manual Entry
                        </button>
                    </div>
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
                    <AutoGeneralInfo/>
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
                {!myForm.isFirstStep && (
                    <button type="button" onClick={myForm.prevStep}>
                        Back
                    </button>
                )}
                {myForm.isLastStep ? (
                    <button type="submit" disabled={!myForm.isValid}>
                        Submit
                    </button>
                ) : (
                    <button type="submit" disabled={!myForm.isStepValid}>
                        Continue
                    </button>
                )}
            </form>
        </Formiz>
    )
}

export default MyForm;