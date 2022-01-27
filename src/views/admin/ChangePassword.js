import React, {useState, useEffect, useCallback} from 'react';
import { CCard, CCardBody, CCol } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';
import {handleFirebaseUpload} from "../../utils/firebase/uploadFirebase";

const ChangePassword = () => {
  const history = useHistory();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [enterpriseId, setEnterpriseId] = useState(null);

  const [password ,setPassword] = useState(null)
  const [newPassword ,setNewPassword] = useState(null)
  const [confirmPassword ,setConfirmPassword] = useState(null)
  //
  // async function postAdmin(parameters) {
  //   try {
  //     const { data: res } = await TempAdminApi.request({
  //       method: HttpMethod.POST,
  //       url: EndPoint.POST_ADMIN,
  //       data: parameters,
  //     });
  //
  //     if (!res?.isSuccess) {
  //       alert(res.message);
  //       return;
  //     }
  //
  //     alert('관계자 추가에 성공하였습니다.');
  //     history.push('/users');
  //   } catch (error) {
  //     console.log(error);
  //     alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
  //   }
  // }

  const onChangePasswordButton = useCallback(async (e) => {
    console.log(password, newPassword, confirmPassword)

    if (password == null) {
      alert("기존 비밀번호를 입력해주세요.")
      return
    }
    if (newPassword == null) {
      alert("새로운 비밀번호를 입력해주세요.")
      return
    }
    if (confirmPassword == null) {
      alert("확인 비밀번호를 입력해주세요.")
      return
    }
    if (newPassword !== confirmPassword) {
      alert("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다..")
      return
    }

    // const previewImage = document.getElementById('thumbnailImg');
    // // const {
    // //     target: { files, value },
    // // } = event;
    // const theFile = event.target.files[0];
    // let reader = new FileReader();
    // setFile(event.target.files[0]);
    // reader.onload = (e) => {
    //   previewImage.setAttribute('src', e.target.result);
    // };
    // reader.readAsDataURL(theFile);
    // let firebaseURL = await handleFirebaseUpload(
    //   'program',
    //   theFile.name,
    //   event.target.files[0],
    // );
    // setThumbnailURL(firebaseURL);
  }, [password, newPassword, confirmPassword, history]);

  return (
    <CCol>
      <CCard>
        <CCardBody>
          <div className="form-group">
            <TextCell
              type="password"
              label="기존 비밀번호"
              placeholder="기존 비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextCell
              type="password"
              label="새로운 비밀번호"
              placeholder="새로운 비밀번호를 입력해주세요"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextCell
              type="password"
              label="새로운 비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </CCardBody>
      </CCard>
      <BottomButtons onPatchClick={onChangePasswordButton} />
    </CCol>
  );
};

export default ChangePassword;
