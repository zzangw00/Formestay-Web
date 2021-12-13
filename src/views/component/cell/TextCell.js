import React from "react"
import {CCol, CFormGroup, CInput, CLabel} from "@coreui/react"

const TextCell = props => {
	const {type, label, placeholder, value, onChange} = props

	return (
		<CFormGroup row>
			<CCol md="2" align="right">
				<CLabel htmlFor="text-input">{label}</CLabel>
			</CCol>
			<CCol>
				<CInput
          type={type || "text"}
          autoComplete={type === "password" ? "on" : "off"}
					disabled={!onChange}
					placeholder={placeholder}
					value={value || ""}
					onChange={onChange}
				/>
			</CCol>
    </CFormGroup>
	)
}

export default TextCell
