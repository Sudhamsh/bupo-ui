/**
 * Created by sudhamshbachu on 8/10/20.
 */
import Downshift from 'downshift'
import { Input,InputGroup, } from "@chakra-ui/core";
import React, { useEffect, useState } from 'react';
import {FormGroup} from '../FormGroup'
import { useField, fieldPropTypes, fieldDefaultProps } from '@formiz/core';

export const FieldAutoComplete = (props) => {
    const {
        items, label,setValue, type, required, placeholder, helper, ...otherProps
    } = props;

    const formGroupProps = {
        label,
    };

    return (
        <Downshift
            itemToString={item => (item ? item.value : '')}
            onChange={selection => setValue(selection.value)}
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
                            <InputGroup>
                            <Input {...getInputProps()} />
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <ul {...getMenuProps()}>
                        {isOpen
                            ? items
                                .filter(item => !inputValue || item.value.toString().toLowerCase().includes(inputValue.toString().toLowerCase()))
                                .map((item, index) => (
                                    <li
                                        {...getItemProps({
                                            key: item.value,
                                            index,
                                            item,
                                            style: {
                                                backgroundColor:
                                                    highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                        })}
                                    >
                                        {item.value}
                                    </li>
                                ))
                            : null}
                    </ul>
                </div>
            )}
        </Downshift>
    );
};