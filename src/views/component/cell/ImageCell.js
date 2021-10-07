import React from "react"
import {CCol, CFormGroup, CImg, CInputFile, CLabel, CSpinner} from "@coreui/react"

const ImageCell = props => {
	const {multiple, label, src, isLoading, onChange} = props

	return (
		<CFormGroup row>
			<CCol md="2" align="right">
				<CLabel htmlFor="text-input">{label}</CLabel>
			</CCol>
			<CCol>
				{onChange && <>
          <CInputFile multiple={multiple || false} accept="image/*" onChange={onChange}/>
          <br/>
        </>}
        {multiple
          ? src.map((imageURL, index) => (
            <CImg key={`image_${index}`} src={imageURL} height="150" fluid/>
          ))
          : isLoading
            ? <CSpinner style={{width: 120, height: 120}}/>
            : <CImg src={src} height="150" fluid/>
        }
			</CCol>
		</CFormGroup>
	)
}

export default ImageCell
