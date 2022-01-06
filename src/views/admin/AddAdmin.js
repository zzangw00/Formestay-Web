import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCol } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';

const AddAdmin = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [enterpriseId, setEnterpriseId] = useState(null);

    // 업체 상세 조회 API 요청
    useEffect(() => {
        const getEnterprise = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_STATUS,
                });
                if (!res?.isSuccess || isEmpty(res?.result) || res.result.status != 0) {
                    alert('관리자만 관계자를 추가할 수 있습니다.');
                    history.push('/users');
                    return;
                }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                history.push('/users');
            }
        };

        getEnterprise().then();
    }, []);
    // 관리자 추가 API 요청
    async function postAdmin(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.POST,
                url: EndPoint.POST_ADMIN,
                data: parameters,
            });

            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }

            alert('관계자 추가에 성공하였습니다.');
            history.push('/users');
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }

    // 추가 버튼 onClick
    function onPostButtonClick() {
        if (isEmpty(email.trim())) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if (!isValidEmail(email.trim())) {
            alert('이메일 형식을 확인해주세요.');
            return;
        }
        if (isEmpty(password)) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if (isEmpty(confirmPassword)) {
            alert('비밀번호 확인을 입력해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (isEmpty(nickname.trim())) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        if (!isEmpty(phoneNumber.trim()) && !isValidPhoneNumber(phoneNumber.trim())) {
            alert('전화번호 형식을 확인해주세요.');
            return;
        }
        if (isEmpty(enterpriseId)) {
            alert('업체 고유번호를 입력해주세요.');
            return;
        }
        if (window.confirm('추가하시겠습니까?')) {
            const parameters = {
                email: email.trim(),
                password: password,
                confirmPassword: confirmPassword,
                nickname: nickname.trim(),
                phoneNumber: phoneNumber.trim(),
                enterpriseId: enterpriseId,
            };
            postAdmin(parameters).then();
        }
    }

    return (
        <CCol>
            <CCard>
                <CCardBody>
                    <div className="form-group">
                        <TextCell
                            label="이메일"
                            placeholder="이메일 주소를 입력해주세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextCell
                            type="password"
                            label="비밀번호"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextCell
                            type="password"
                            label="비밀번호 확인"
                            placeholder="비밀번호를 한번 더 입력해주세요"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <TextCell
                            label="닉네임"
                            placeholder="닉네임을 입력해주세요"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <TextCell
                            label="전화번호"
                            placeholder="전화번호를 입력해주세요"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <TextCell
                            label="업체 고유번호"
                            placeholder="업체 고유번호를 입력해주세요"
                            value={enterpriseId}
                            onChange={(e) => setEnterpriseId(e.target.value)}
                        />
                    </div>
                </CCardBody>
            </CCard>
            <BottomButtons onAdminClick={onPostButtonClick} />
        </CCol>
    );
};

export default AddAdmin;
