import React, {useState} from "react"
import {CCard, CCardBody, CCol, CRow} from "@coreui/react"
import TempAdminApi, {EndPoint, HttpMethod} from "../../constant/TempAdminApi"
import {isEmpty} from "../../utils/common/commonFunction"
import {useHistory} from "react-router-dom"
import {handleFirebaseUpload} from "../../utils/firebase/uploadFirebase"
import TextCell from "../component/cell/TextCell"
import TextareaCell from "../component/cell/TextareaCell"
import BottomButtons from "../component/Button"
import ImageCell from "../component/cell/ImageCell"

const AddBoard = () => {
  const history = useHistory()

  const [userIdx, setUserIdx] = useState(0)
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")
  const [imageURLs, setImageURLs] = useState([])

  // 사용자 추가 API 요청
  async function postUser(parameters) {
    try {
      const {data: res} = await TempAdminApi.request({
        method: HttpMethod.POST,
        url: EndPoint.POST_BOARD,
        data: parameters
      })

      if (!res?.isSuccess || isEmpty(res?.result)) {
        alert(res.message)
        return
      }

      alert("게시물 추가에 성공하였습니다.")
      history.push("/boards")
    } catch (error) {
      console.log(error)
      alert("네트워크 통신 실패. 잠시후 다시 시도해주세요.")
    }
  }

  // 추가 버튼 onClick
  function onPostButtonClick() {
    if (isEmpty(title.trim())) {
      alert("제목을 입력해주세요.")
    }
    if (isEmpty(contents.trim())) {
      alert("내용을 입력해주세요.")
    }

    if (window.confirm("추가하시겠습니까?")) {
      const parameters = {
        title: title.trim(),
        contents: contents,
        imageUrls: imageURLs
      }
      postUser(parameters).then()
    }
  }

  // 이미지 추가 onClick
  function onImageChange(input) {
    setImageURLs(() => [])
    input.target.files.forEach( (file, index) => {
      const filename = `${new Date().getTime()}_${index}_${file.name}`
      handleFirebaseUpload("web-admin/boards", filename, file).then(url => {
        setImageURLs(imageURLs => [...imageURLs, url].sort())
      })
    })
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <div className="form-group">
              <TextCell
                label="사용자 고유번호"
                placeholder="사용자 고유번호를 입력해주세요"
                value={userIdx}
                onChange={e => setUserIdx(e.target.value)}
              />
              <TextCell
                label="제목"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <TextareaCell
                label="내용"
                placeholder="내용을 입력해주세요"
                value={contents}
                onChange={e => setContents(e.target.value)}
              />
              <ImageCell
                multiple
                label="이미지"
                src={imageURLs}
                onChange={onImageChange}
              />
            </div>
          </CCardBody>
        </CCard>
        <BottomButtons onPostClick={onPostButtonClick}/>
      </CCol>
    </CRow>
  )
}

export default AddBoard
