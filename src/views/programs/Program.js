import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCol } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';

const Program = ({ match }) => {
    const history = useHistory();
    const [programId] = useState(match.params.programId);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [minPerson, setMinPerson] = useState(false);
    const [maxPerson, setMaxPerson] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [programInfo, setProgramInfo] = useState('');
    const [mealInfo, setMealInfo] = useState('');
    const [personPerMoney, setPersonPerMoney] = useState('');
    const [dayPerMoney, setDayPerMoney] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    // 프로그램 상세 조회 API 요청
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_PROGRAM,
                    path: { programId: programId },
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    alert(res.message);
                    history.push('/enterprises');
                    return;
                }

                const program1 = res.result;
                const program = program1[0];
                setName(program.name);
                setTag(program.tag);
                setThumbnailURL(program.thumbnailURL);
                setMaxPerson(program.maxPerson);
                setMinPerson(program.minPerson);
                setCheckIn(program.checkIn);
                setCheckOut(program.checkOut);
                setProgramInfo(program.programInfo);
                setMealInfo(program.mealInfo);
                setPersonPerMoney(program.personPerMoney);
                setDayPerMoney(program.dayPerMoney);
                setCreatedAt(program.createdAt);
                if (!program.thumbnailURL) {
                    setProfileImgURL('');
                } else {
                    setProfileImgURL(program.thumbnailURL);
                }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                history.push('/enterprises');
            }
        };

        getProgram().then();
    }, []);

    // 프로그램 수정 API 요청
    async function patchProgram(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_PROGRAM,
                path: { programId: programId },
                data: parameters,
            });

            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('프로그램 수정에 성공하였습니다.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }

    // 회원 탈퇴 API 요청
    async function patchProgramStatus(programId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_PROGRAM_STATUS,
                path: { programId: programId },
                data: { status: 'INACTIVE' },
            });
            if (!res.isSuccess) {
                alert(res.message);
                return;
            }

            alert('프로그램 삭제에 성공하였습니다.');
            history.push('/enterprise');
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
        // if (!isEditing) {
        //     setIsEditing(true);
        //     return;
        // }
        // // if (isEmpty(email.trim())) {
        // //     alert('이메일을 입력해주세요.');
        // //     return;
        // // }
        // // if (!isValidEmail(email.trim())) {
        // //     alert('이메일 형식을 확인해주세요.');
        // //     return;
        // // }
        // if (isEmpty(nickname.trim())) {
        //     alert('닉네임을 입력해주세요.');
        //     return;
        // }
        // // if (!isEmpty(phoneNumber.trim()) && !isValidPhoneNumber(phoneNumber.trim())) {
        // //     alert('전화번호 형식을 확인해주세요.');
        // //     return;
        // // }
        // if (window.confirm('수정하시겠습니까?')) {
        //     const parameters = {
        //         nickname: nickname.trim(),
        //     };
        //     patchUser(parameters).then();
        // }
    }

    // 삭제 버튼 onClick
    function onDeleteButtonClick() {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            patchProgramStatus(programId).then(() => {});
        }
    }

    return (
        <CCol>
            <CCard>
                <CCardBody>
                    <p>
                        <div class="text-center">
                            <img
                                src={thumbnailURL}
                                alt=""
                                class="img-thumbnail"
                                width="300px"
                                height="300px"
                            ></img>
                        </div>
                    </p>
                    <div className="form-group">
                        <TextCell label="프로그램 고유번호" value={programId} />
                        <TextCell
                            label="프로그램 이름"
                            value={name}
                            onChange={isEditing ? (e) => setNickname(e.target.value) : null}
                        />
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

export default Program;
