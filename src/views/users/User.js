import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCol } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';

const User = ({ match }) => {
    const history = useHistory();
    const [userId] = useState(match.params.userId);
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showGender, setShowGender] = useState(null);
    const [birthday, setBirthday] = useState('');
    const [snsId, setSnsId] = useState(null);
    const [profileImgURL, setProfileImgURL] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const nullImage = <i class="cis-file-image"></i>;
    // 사용자 상세 조회 API 요청
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_USER,
                    path: { userId: userId },
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    alert(res.message);
                    history.push('/users');
                    return;
                }

                const user1 = res.result;
                const user = user1[0];
                setEmail(user.email);
                setNickname(user.nickname);
                setPhoneNumber(user.phoneNumber);
                setName(user.name);
                if (user.gender == 1) {
                    setShowGender('남자');
                } else {
                    setShowGender('여자');
                }
                setBirthday(user.birthday);
                if (user.snsId == 0) {
                    setSnsId('일반');
                } else {
                    setSnsId('카카오');
                }
                setCreatedAt(user.createdAt);
                if (!user.profileImgURL) {
                    setProfileImgURL('');
                } else {
                    setProfileImgURL(user.profileImgURL);
                }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                history.push('/users');
            }
        };

        getUser().then();
    }, []);

    // 사용자 수정 API 요청
    async function patchUser(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_USER,
                path: { userId: userId },
                data: parameters,
            });

            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('사용자 수정에 성공하였습니다.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }

    // 회원 탈퇴 API 요청
    async function patchUserStatus(userId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_USER_STATUS,
                path: { userId: userId },
                data: { status: 'INACTIVE' },
            });
            if (!res.isSuccess) {
                alert(res.message);
                return;
            }

            alert('사용자 삭제에 성공하였습니다.');
            history.push('/users');
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }

    // 뒤로가기 버튼 onClick
    function onBackButtonClick() {
        history.push(`/users`);
    }

    // 수정 버튼 onClick
    function onPatchButtonClick() {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        // if (isEmpty(email.trim())) {
        //     alert('이메일을 입력해주세요.');
        //     return;
        // }
        // if (!isValidEmail(email.trim())) {
        //     alert('이메일 형식을 확인해주세요.');
        //     return;
        // }
        if (isEmpty(nickname.trim())) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        // if (!isEmpty(phoneNumber.trim()) && !isValidPhoneNumber(phoneNumber.trim())) {
        //     alert('전화번호 형식을 확인해주세요.');
        //     return;
        // }

        if (window.confirm('수정하시겠습니까?')) {
            const parameters = {
                nickname: nickname.trim(),
            };
            patchUser(parameters).then();
        }
    }

    // 삭제 버튼 onClick
    function onDeleteButtonClick() {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            patchUserStatus(userId).then(() => {});
        }
    }

    return (
        <CCol>
            <CCard>
                <CCardBody>
                    <p>
                        <div class="text-center">
                            <img
                                src={profileImgURL}
                                alt=""
                                class="img-thumbnail"
                                width="300px"
                                height="300px"
                            ></img>
                        </div>
                    </p>
                    <div className="form-group">
                        <TextCell label="유저 고유번호" value={userId} />
                        <TextCell
                            label="이메일"
                            // placeholder="이메일 주소를 입력해주세요"
                            value={email}
                            // onChange={isEditing ? (e) => setEmail(e.target.value) : null}
                        />
                        <TextCell label="이름" value={name} />
                        <TextCell
                            label="닉네임"
                            placeholder="닉네임을 입력해주세요"
                            value={nickname}
                            onChange={isEditing ? (e) => setNickname(e.target.value) : null}
                        />
                        <TextCell
                            label="전화번호"
                            // placeholder="전화번호를 입력해주세요"
                            value={phoneNumber}
                            // onChange={isEditing ? (e) => setPhoneNumber(e.target.value) : null}
                        />
                        <TextCell label="성별" value={showGender} />
                        <TextCell label="생년월일" value={birthday} />
                        <TextCell label="로그인 유형" value={snsId} />
                        <TextCell label="가입 날짜" value={createdAt} />
                    </div>
                </CCardBody>
            </CCard>
            <BottomButtons
                onBackClick={onBackButtonClick}
                onPatchClick={onPatchButtonClick}
                onDeleteClick={onDeleteButtonClick}
                patchLabel={isEditing ? '수정완료' : '수정하기'}
            />
        </CCol>
    );
};

export default User;
