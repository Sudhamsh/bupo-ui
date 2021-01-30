/**
 * Created by sudhamshbachu on 8/6/20.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    RadioGroup,Radio,Box
} from '@chakra-ui/react';
import { useField, fieldPropTypes, fieldDefaultProps } from '@formiz/core';
import { FormGroup } from '../FormGroup';

const propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.string,
    helper: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.array,
    ...fieldPropTypes,
};
const defaultProps = {
    label: '',
    placeholder: '',
    helper: '',
    options: [],
    ...fieldDefaultProps,
};

export const FieldRadio = (props) => {
    const {
        id,
        radioOptions
    } = props;

    const {
        errorMessage,
        isValid,
        isPristine,
        isSubmitted,
        value,
        setValue
    } = useField({debounce: 0,...props});

    const handleChange = function(event) {
        setValue(event.target.value);
    }

    const showError = !isValid && (!isPristine || isSubmitted);



    return (
        <RadioGroup id={id} name={id} value={value} onChange={handleChange} isInline>
            {radioOptions.map((radioOption, i) => (
                <Box key={i}>
                    <Radio variantColor="red" isInvalid={showError} name="radioOption" value={radioOption.value}>
                        {radioOption.text}
                    </Radio>
                </Box>
            ))}
            {showError && (
                <div id={`${id}-error`} className="error-description">
                    {errorMessage}
                </div>
            )}
        </RadioGroup>
    );
};

FieldRadio.propTypes = propTypes;
FieldRadio.defaultProps = defaultProps;

