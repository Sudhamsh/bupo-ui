import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Input, InputGroup, InputRightElement, Spinner,
} from '@chakra-ui/react';
import { useField, fieldPropTypes, fieldDefaultProps } from '@formiz/core';
import { FormGroup } from '../FormGroup';

const propTypes = {
    label: PropTypes.node,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    helper: PropTypes.node,
    ...fieldPropTypes,
};
const defaultProps = {
    label: '',
    type: 'text',
    placeholder: '',
    helper: '',
    ...fieldDefaultProps,
};

export const FieldInput = (props) => {
    const {
        errorMessage,
        id,
        isValid,
        isSubmitted,
        isValidating,
        resetKey,
        value,
        setValue,
    } = useField(props);

    const {
        defaultValue,label, type, required, placeholder, helper,parentCallBack,name, ...otherProps
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
            <InputGroup>
                <Input
                    key={resetKey}
                    type={type || 'text'}
                    id={id}
                    value={defaultValue ? defaultValue : value}
                    onChange={(e) => {setValue(e.target.value); parentCallBack && parentCallBack(name,e.target.value)}}
                    onBlur={() => setIsTouched(true)}
                    aria-invalid={showError}
                    aria-describedby={!isValid ? `${id}-error` : null}
                    placeholder={placeholder}
                />
                {(isTouched || isSubmitted) && isValidating && (
                    <InputRightElement>
                        <Spinner size="sm" />
                    </InputRightElement>
                )}
            </InputGroup>
        </FormGroup>
    );
};

FieldInput.propTypes = propTypes;
FieldInput.defaultProps = defaultProps;