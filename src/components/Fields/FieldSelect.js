/**
 * Created by sudhamshbachu on 8/6/20.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Select,
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

export const FieldSelect = (props) => {
    const {
        errorMessage,
        id,
        isValid,
        isSubmitted,
        resetKey,
        setValue,
        value,
        name,
    } = useField(props);
    console.log(" value :"+value);
    const {
        children, label, options, required, placeholder, helper, ...otherProps
    } = props;
    const [isTouched, setIsTouched] = useState(false);
    const showError = !isValid && (isTouched || isSubmitted);

    useEffect(() => {
        setIsTouched(false);
    }, [resetKey]);

    const formGroupProps = {
        errorMessage,
        helper,
        id,
        isRequired: !!required,
        label,
        showError,
        ...otherProps,
    };

    return (
        <FormGroup {...formGroupProps}>
            <Select
                id={id}
                key={resetKey}
                value={value || ''}
                onBlur={() => setIsTouched(true)}
                aria-invalid={showError}
                aria-describedby={!isValid ? `${id}-error` : null}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                name={name}
            >
                {(options || []).map((item) => (
                    <option key={item.value} value={item.value} selected={item.value === value ? 'selected' : ''}>
                        {item.label || item.value}
                    </option>
                ))}
            </Select>
            {children}
        </FormGroup>
    );
};

FieldSelect.propTypes = propTypes;
FieldSelect.defaultProps = defaultProps;

