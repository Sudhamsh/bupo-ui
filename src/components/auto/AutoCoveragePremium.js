/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, {Component} from 'react'
import { ThemeProvider,CSSReset,SimpleGrid,Text,Stack, } from "@chakra-ui/core";
import {FieldInput} from "../Fields/FieldInput"
import {FieldSelect} from "../Fields/FieldSelect"



export const AutoCoveragePremium = (props) =>{
    const { policyData,index} = props;

    return (
        <ThemeProvider>
            <CSSReset />

            <SimpleGrid columns={2} spacing={10}>
                <FieldSelect
                    name={`quote[${index}].bodilyInjuryLimit`}
                    label="Bodily Injury Limits"
                    placeholder="Select one..."
                    defaultValue={policyData && policyData.coverage ?  policyData.coverage.bodilyInjuryLimit : ""}
                    keepValue
                    options={[
                        { value: '$15,000/$30,000', label: '$15,000/$30,000' },
                        { value: '$20,000/$40,000', label: '$20,000/$40,000' },
                        { value: '$25,000/$50,000', label: '$25,000/$50,000' },
                        { value: '$30,000/$60,000', label: '$30,000/$60,000' },
                        { value: '$50,000/$100,000', label: '$50,000/$100,000' },
                        { value: '$100,000/$200,000', label: '$100,000/$200,000' },
                        { value: '$100,000/$300,00', label: '$100,000/$300,000' },
                        { value: '$300,000/$300,000', label: '$300,000/$300,000' },
                        { value: '$300,000/$500,000', label: '$300,000/$500,000' },
                        { value: '$500,000/$500,000', label: '$500,000/$500,000' },
                    ]}
                />
                <FieldInput
                    name={`quote[${index}].bilPremium`}
                    label="Premium"
                    required="Premium is required"
                    type="number"
                    defaultValue="10"
                />

                <FieldSelect
                    name={`quote[${index}].propDamLiability`}
                    label="Property Damage Liability"
                    placeholder="Select one..."
                    defaultValue={policyData && policyData.coverage ?  policyData.coverage.propDamLiability : ""}
                    keepValue
                    options={[
                        { value: '$5,000', label: '$5,000' },
                        { value: '$10,000', label: '$10,000' },
                        { value: '$15,000', label: '$15,000' },
                        { value: '$20,000', label: '$20,000' },
                        { value: '$25,000', label: '$25,000' },
                        { value: '$50,000', label: '$50,000' },
                    ]}
                />
                <FieldInput
                    name={`quote[${index}].pdlPremium`}
                    label="Premium"
                    required="Premium is required"
                    defaultValue="11"
                    type="number"
                />

                <FieldSelect
                    name={`quote[${index}].medicalPayments`}
                    label="Medical Payments"
                    placeholder="Select one..."
                    defaultValue={policyData && policyData.coverage ?  policyData.coverage.medicalPayments : ""}
                    keepValue
                    options={[
                        { value: '$1,000', label: '$1,000' },
                        { value: '$2,000', label: '$2,000' },
                        { value: '$3,000', label: '$3,000' },
                        { value: '$4,000', label: '$4,000' },
                        { value: '$5,000', label: '$5,000' },
                        { value: '$10,000', label: '$10,000' },
                        { value: '$25,000', label: '$25,000' },
                    ]}
                />
                <FieldInput
                    name={`quote[${index}].mpPremium`}
                    label="Premium"
                    required="Premium is required"
                    type="number"
                    defaultValue="13"
                />

                <FieldSelect
                    name={`quote[${index}].uninsuredMotorist`}
                    label="Uninsured/UnderInsured Motorist"
                    placeholder="Select one..."
                    defaultValue={policyData && policyData.coverage ?  policyData.coverage.uninsuredMotorist : ""}
                    keepValue
                    options={[
                        { value: '$15,000/$30,000', label: '$15,000/$30,000' },
                        { value: '$20,000/$40,00', label: '$20,000/$40,000' },
                        { value: '$25,000/$50,000', label: '$25,000/$50,000' },
                        { value: '$30,000/$60,000', label: '$30,000/$60,000' },
                        { value: '$50,000/$100,000', label: '$50,000/$100,000' },
                        { value: '$100,000/$200,000', label: '$100,000/$200,000' },
                        { value: '$100,000/$300,000', label: '$100,000/$300,000' },
                        { value: '$300,000/$300,000', label: '$300,000/$300,000' },
                        { value: '$300,000/$500,000', label: '$300,000/$500,000' },
                        { value: '$500,000/$500,000', label: '$500,000/$500,000' },
                    ]}
                />
                <FieldInput
                    name={`quote[${index}].mPremium`}
                    label="Premium"
                    required="Premium is required"
                    type="number"
                    defaultValue="14"
                />
            </SimpleGrid>
        </ThemeProvider>
    )
}

export default AutoCoveragePremium;
