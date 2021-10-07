import ReactQuill, {Quill} from "react-quill"
import React from "react"
import ImageResize from "quill-image-resize-module-react"

Quill.register("modules/imageResize", ImageResize)

export const editorFormModules = [
	["bold", "italic", "underline", "strike", "blockquote"],
	[{size: ["small", false, "large", "huge"]}, {color: []}],
	[
		{list: "ordered"},
		{list: "bullet"},
		{indent: "-1"},
		{indent: "+1"},
		{align: []}
	],
	["link", "image", "video"],
	["clean"]
]

const EditorForm = props => {
	const {placeholder, value, onChange, imageHandler} = props

	return (
		<ReactQuill
			readOnly={!onChange}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			modules={{
				toolbar: {
					container: editorFormModules,
					handlers: {
						image: imageHandler
					}
				},
				imageResize: {
					modules: onChange ? ["Resize", "DisplaySize"] : []
				}
			}}
		/>
	)
}

export default EditorForm
