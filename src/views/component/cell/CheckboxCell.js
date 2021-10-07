import React from "react"
import {CCol, CFormGroup, CInputCheckbox, CLabel} from "@coreui/react"

const CheckboxCell = props => {
	const {label, checked, onChange} = props

	return (
		<CFormGroup row>
			<CCol md="2" align="right">
				<CLabel htmlFor="text-input">{label}</CLabel>
			</CCol>
			<CCol>
				<CInputCheckbox style={{marginLeft: 0}} checked={checked} onChange={onChange}/>
			</CCol>
		</CFormGroup>
	)
}

export default CheckboxCell
