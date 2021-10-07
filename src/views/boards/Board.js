import React, {useEffect, useState} from "react"
import {CCard, CCardBody, CCol} from "@coreui/react"
import TempAdminApi, {EndPoint, HttpMethod} from "../../constant/TempAdminApi"
import {isEmpty} from "../../utils/common/commonFunction"
import {useHistory} from "react-router-dom"
import {handleFirebaseUpload} from "../../utils/firebase/uploadFirebase"
import TextCell from "../component/cell/TextCell"
import TextareaCell from "../component/cell/TextareaCell"
import BottomButtons from "../component/Button"
import ImageCell from "../component/cell/ImageCell"

const Board = ({match}) => {
  const history = useHistory()
  const [boardIdx] = useState(match.params.boardIdx)
  const [userIdx, setUserIdx] = useState(0)
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")
  const [imageURLs, setImageURLs] = useState([])
  const [isEditing, setIdEditing] = useState(false)

  // 게시물 상세 조회 API 요청
  useEffect(() => {
    const getBoard = async () => {
      try {
        const {data: res} = await TempAdminApi.request({
          method: HttpMethod.GET,
          url: EndPoint.GET_BOARD,
          path: {boardIdx: boardIdx}
        })

        if (!res?.isSuccess || isEmpty(res?.result)) {
          alert(res.message)
          history.push("/boards")
          return
        }

        const board = res.result
        setUserIdx(board.userIdx)
        setTitle(board.title)
        setContents(board.contents)
        setImageURLs(board.imageUrls)
      } catch (error) {
        console.log(error)
        alert("네트워크 통신 실패. 잠시후 다시 시도해주세요.")
        history.push("/boards")
      }
    }

    getBoard().then()
  }, [])

  // 게시물 수정 API 요청
  async function patchBoard(parameters) {
    try {
      const {data: res} = await TempAdminApi.request({
        method: HttpMethod.PATCH,
        url: EndPoint.PATCH_BOARD,
        path: {boardIdx: boardIdx},
        data: parameters
      })

      if (!res?.isSuccess || isEmpty(res?.result)) {
        alert(res.message)
        return
      }

      alert("게시물 수정에 성공하였습니다.")
      history.go(0)
    } catch (error) {
      console.log(error)
      alert("네트워크 통신 실패. 잠시후 다시 시도해주세요.")
    }
  }

  // 게시물 삭제 API 요청
  async function patchBoardStatus(boardIdx) {
    try {
      const {data: res} = await TempAdminApi.request({
        method: HttpMethod.PATCH,
        url: EndPoint.PATCH_BOARD_STATUS,
        path: {boardIdx: boardIdx},
        data: {status: "INACTIVE"}
      })

      if (!res.isSuccess) {
        alert(res.message)
        return
      }

      alert("게시물 삭제에 성공하였습니다.")
      history.push("/boards")
    } catch (error) {
      console.log(error)
      alert("네트워크 통신 실패. 잠시후 다시 시도해주세요.")
    }
  }

  // 뒤로가기 버튼 onClick
  function onBackButtonClick() {
    history.push(`/boards`)
  }

  // 수정 버튼 onClick
  function onPatchButtonClick() {
    if (!isEditing) {
      setIdEditing(true)
      return
    }

    if (isEmpty(title.trim())) {
      alert("제목을 입력해주세요.")
    }
    if (isEmpty(contents.trim())) {
      alert("내용을 입력해주세요.")
    }

    const parameters = {
      title: title,
      contents: contents,
      imageUrls: imageURLs
    }
    patchBoard(parameters).then()
  }

  // 삭제 버튼 onClick
  function onDeleteButtonClick() {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      patchBoardStatus(boardIdx).then(() => {})
    }
  }

  // 이미지 추가 onClick
  function onImageChange(input) {
    setImageURLs(() => [])
    input.target.files.forEach( (file, index) => {
      handleFirebaseUpload("boards", `${new Date().getTime()}_${index}_${file.name}`, file).then(url => {
        setImageURLs(imageURLs => [...imageURLs, url].sort())
      })
    })
  }

  return (
    <CCol>
      <CCard>
        <CCardBody>
          <div className="form-group">
            <TextCell
              label="게시물 고유번호"
              value={boardIdx}/>
            <TextCell
              label="사용자 고유번호"
              value={userIdx}/>
            <TextCell
              label="제목"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={isEditing ? e => setTitle(e.target.value) : null}/>
            <TextareaCell
              label="내용"
              placeholder="내용을 입력해주세요"
              value={contents}
              onChange={isEditing ? e => setContents(e.target.value) : null}/>
            <ImageCell
              multiple
              label="이미지"
              src={imageURLs}
              onChange={isEditing ? onImageChange : null}
            />
          </div>
        </CCardBody>
      </CCard>
      <BottomButtons
        onBackClick={onBackButtonClick}
        onPatchClick={onPatchButtonClick}
        onDeleteClick={onDeleteButtonClick}
        patchLabel={isEditing ? "수정완료" : "수정하기"}
      />
    </CCol>
  )
}

export default Board
