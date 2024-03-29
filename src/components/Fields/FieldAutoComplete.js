/**
 * Created by sudhamshbachu on 8/10/20.
 */
import Downshift from 'downshift'
import { Input,InputGroup, } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useField, fieldPropTypes, fieldDefaultProps } from '@formiz/core';
import {FormGroup} from '../FormGroup'


export const FieldAutoComplete = (props) => {
    const {
        items,name, index, label,setValueCallback, type, required, placeholder, helper,...otherProps
    } = props;

    const {
        errorMessage,
        id,
        isValid,
        isSubmitted,
        isValidating,
        resetKey,
        setValue,
        value,
    } = useField(props);

    const [isTouched, setIsTouched] = useState(false);
    const showError = !isValid && (isTouched || isSubmitted);

    const formGroupProps = {
        label,
        errorMessage,
        helper,
        id,
        isRequired: !!required,
        label,
        showError,
        ...otherProps,
    };


    return (
        <Downshift
            itemToString={item => (item ? item : '')}
            onChange={selection => setValue(selection) || setValueCallback(selection,index)}
            initialSelectedItem={value}
        >
            {({
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem,
                  getRootProps,
              }) => (
                <div>

                    <div
                        style={{display: 'inline-block'}}
                        {...getRootProps({}, {suppressRefError: true})}
                    >
                        <FormGroup {...formGroupProps}>
                            <InputGroup >
                            <Input {...getInputProps()} />
                            </InputGroup>
                        </FormGroup>

                    </div>
                    <ul {...getMenuProps()}>
                        {isOpen
                            ? items
                                .filter(item => !inputValue || item.toString().toLowerCase().includes(inputValue.toLowerCase()))
                                .map((item, index) => (
                                    <li
                                        {...getItemProps({
                                            key: item,
                                            index,
                                            item,
                                            style: {
                                                backgroundColor:
                                                    highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                        })}
                                    >
                                        {item}
                                    </li>
                                ))
                            : null}
                    </ul>
                </div>
            )}
        </Downshift>
    );
};