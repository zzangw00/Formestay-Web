import React, {useEffect, useState} from "react"
import {CCard, CCardBody, CCol} from "@coreui/react"
import TempAdminApi, {EndPoint, HttpMethod} from "../../constant/TempAdminApi"
import {isEmpty, isValidEmail, isValidPhoneNumber} from "../../utils/common/commonFunction"
import {useHistory} from "react-router-dom"
import TextCell from "../component/cell/TextCell"
import BottomButtons from "../component/Button"

const User = ({match}) => {
  const history = useHistory()
  const [userIdx] = useState(match.params.userIdx)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // 사용자 상세 조회 API 요청
  useEffect(() => {
    const getUser = async () => {
      try {
        const {data: res} = await TempAdminApi.request({
          method: HttpMethod.GET,
          url: EndPoint.GET_USER,
          path: {userIdx: userIdx}
        })

        if (!res?.isSuccess || isEmpty(res?.result)) {
          alert(res.message)
          history.push("/users")
          return
        }

        const user = res.result
        setEmail(user.email)
        setNickname(user.nickname)
        setPhoneNumber(user.phoneNumber)
      } catch (error) {
        console.log(error)
        alert("네트워크 통신 실패. 잠시후 다시 시도해주세요.")
        history.push("/users")
      }
    }

    getUser().then()
  }, [])

  // 사용자 수정 API 요청
  async function patchUser(parameters) {
    try {
      const {data: res} = await TempAdminApi.request({
        method: HttpMethod.PATCH,
        url: EndPoint.PATCH_USER,
        path: {userIdx: userIdx},
        data: parameters
      })

      if (!res?.isSuccess || isEmpty(res?.result)) {
        alert(res.message)
        return
      }

      alert("사용자 수정에 성공하였습니다.")
      history.go(0)
    } catch (error) {
      console.log(error)
      alert("네트워크 통신 실패. 잠시후 다시 시도해주세요.")
    }
  }

  // 회원 탈퇴 API 요청
  async function patchUserStatus(userIdx) {
    try {
      const {data: res} = await TempAdminApi.request({
        method: HttpMethod.PATCH,
        url: EndPoint.PATCH_USER_STATUS,
        path: {userIdx: userIdx},
        data: {status: "INACTIVE"}
      })

      if (!res.isSuccess) {
        alert(res.message)
        return
      }

      alert("사용자 삭제에 성공하였습니다.")
      history.push("/users")
    } catch (error) {
      console.log(error)
      alert("네트워크 통신 실패. 잠시후 다시 시도해주세요.")
    }
  }

  // 뒤로가기 버튼 onClick
  function onBackButtonClick() {
    history.push(`/users`)
  }

  // 수정 버튼 onClick
  function onPatchButtonClick() {
    if (!isEditing) {
      setIsEditing(true)
      return
    }

    if (isEmpty(email.trim())) {
      alert("이메일을 입력해주세요.")
      return
    }
    if (!isValidEmail(email.trim())) {
      alert("이메일 형식을 확인해주세요.")
      return
    }
    if (isEmpty(password)) {
      alert("비밀번호를 입력해주세요.")
      return
    }
    if (isEmpty(confirmPassword)) {
      alert("비밀번호 확인을 입력해주세요.")
      return
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    if (isEmpty(nickname.trim())) {
      alert("닉네임을 입력해주세요.")
      return
    }
    if (!isEmpty(phoneNumber.trim()) && !isValidPhoneNumber(phoneNumber.trim())) {
      alert("전화번호 형식을 확인해주세요.")
      return
    }

    if (window.confirm("수정하시겠습니까?")) {
      const parameters = {
        email: email.trim(),
        password: password,
        confirmPassword: confirmPassword,
        nickname: nickname.trim(),
        phoneNumber: phoneNumber.trim()
      }
      patchUser(parameters).then()
    }
  }

  // 삭제 버튼 onClick
  function onDeleteButtonClick() {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      patchUserStatus(userIdx).then(() => {})
    }
  }

  return (
    <CCol>
      <CCard>
        <CCardBody>
          <div className="form-group">
            <TextCell
              label="게시물 고유번호"
              value={userIdx}/>
            <TextCell
              label="이메일"
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={isEditing ? e => setEmail(e.target.value) : null}
            />
            <TextCell
              type="password"
              label="비밀번호"
              placeholder="변경할 비밀번호를 입력해주세요"
              value={password}
              onChange={isEditing ? e => setPassword(e.target.value) : null}
            />
            <TextCell
              type="password"
              label="비밀번호 확인"
              placeholder="변경할 비밀번호 한번 더 입력해주세요"
              value={confirmPassword}
              onChange={isEditing ? e => setConfirmPassword(e.target.value) : null}
            />
            <TextCell
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={isEditing ? e => setNickname(e.target.value) : null}
            />
            <TextCell
              label="전화번호"
              placeholder="전화번호를 입력해주세요"
              value={phoneNumber}
              onChange={isEditing ? e => setPhoneNumber(e.target.value) : null}
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

export default User
