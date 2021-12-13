import React from 'react';
import { CCol, CFormGroup, CLabel, CTextarea } from '@coreui/react';

const TextareaCell = (props) => {
    const { label, placeholder, value, onChange } = props;

    return (
        <CFormGroup row>
            <CCol md="2" align="right">
                <CLabel htmlFor="text-input">{label}</CLabel>
            </CCol>
            <CCol>
                <CTextarea
                    rows="10"
                    disabled={!onChange}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </CCol>
        </CFormGroup>
    );
};

export default TextareaCell;
