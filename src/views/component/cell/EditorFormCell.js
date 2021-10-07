import React from "react"
import {CCol, CFormGroup, CLabel} from "@coreui/react"
import EditorForm from "../EditorForm"

const EditorFormCell = props => {
	const {label, placeholder, value, onChange, imageHandler} = props

	return (
		<CFormGroup row>
			<CCol md="2" align="right">
				<CLabel htmlFor="text-input">{label}</CLabel>
			</CCol>
			<CCol>
				<EditorForm
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					imageHandler={imageHandler}
				/>
			</CCol>
		</CFormGroup>
	)
}

export default EditorFormCell
