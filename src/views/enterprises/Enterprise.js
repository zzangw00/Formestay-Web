import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';
import { tablePagination, tableScopedSlots, tableStatusField } from '../component/Table';
import { itemsPerPage } from '../../constant/Constants';

const Enterprise = ({ match }) => {
    const history = useHistory();
    const [enterpriseId] = useState(match.params.enterpriseId);
    const [korName, setKorName] = useState('');
    const [engName, setEngName] = useState('');
    const [category, setCategory] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primeLocation, setPrimeLocation] = useState('');
    const [location, setLocation] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [programs, setPrograms] = useState([]);

    // 사용자 상세 조회 API 요청
    useEffect(() => {
        const getEnterprise = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_ENTERPRISE,
                    path: { enterpriseId: enterpriseId },
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    alert(res.message);
                    history.push('/enterprises');
                    return;
                }

                const enterprise1 = res.result;
                const enterprise = enterprise1[0];
                setKorName(enterprise.korName);
                setEngName(enterprise.engName);
                setPhoneNumber(enterprise.phoneNumber);
                setCategory(enterprise.category);
                setPrimeLocation(enterprise.primeLocation);
                setLocation(enterprise.location);
                setTag(enterprise.tag);
                setDescription(enterprise.description);
                // if (enterprise.category == 1) {
                //     setShowGender('남자');
                // } else {
                //     setShowGender('여자');
                // }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                history.push('/enterprises');
            }
        };

        getEnterprise().then();
    }, []);

    // 사용자 수정 API 요청
    async function patchUser(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_USER,
                path: { userId: enterpriseId },
                data: parameters,
            });

            if (!res?.isSuccess || isEmpty(res?.result)) {
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
        history.push(`/enterprises`);
    }

    // 수정 버튼 onClick
    function onPatchButtonClick() {
        // if (!isEditing) {
        //     setIsEditing(true);
        //     return;
        // }
        // if (isEmpty(email.trim())) {
        //     alert('이메일을 입력해주세요.');
        //     return;
        // }
        // if (!isValidEmail(email.trim())) {
        //     alert('이메일 형식을 확인해주세요.');
        //     return;
        // }
        // if (isEmpty(nickname.trim())) {
        //     alert('닉네임을 입력해주세요.');
        //     return;
        // }
        // if (!isEmpty(phoneNumber.trim()) && !isValidPhoneNumber(phoneNumber.trim())) {
        //     alert('전화번호 형식을 확인해주세요.');
        //     return;
        // }
        // if (window.confirm('수정하시겠습니까?')) {
        //     const parameters = {
        //         email: email.trim(),
        //         nickname: nickname.trim(),
        //         phoneNumber: phoneNumber.trim(),
        //     };
        //     patchUser(parameters).then();
        // }
    }

    //프로그램 리스트 조회 API 요청
    useEffect(() => {
        const getPrograms = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_PROGRAMS,
                    path: { enterpriseId: enterpriseId },
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    if (res?.code === 2002) {
                        history.push('/enterprises');
                    } else {
                        alert(res.message);
                    }
                    return;
                }

                setPrograms(res.result);
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
            }
        };

        getPrograms().then();
    }, []);

    // 테이블 속성 - fields
    const tableFields = [
        {
            key: 'programId',
            _classes: 'font-weight-bold',
            label: '고유번호',
            _style: { width: '120px' },
            filter: false,
            sorter: true,
        },
        {
            key: 'name',
            label: '프로그램 이름',
            filter: true,
            sorter: true,
        },
        tableStatusField,
    ];

    // 테이블 셀 onClick
    function onTableRowClick(item) {
        history.push(`/programs/${item.programId}`);
    }

    // 삭제 버튼 onClick
    function onDeleteButtonClick() {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            patchUserStatus(enterpriseId).then(() => {});
        }
    }

    return (
        <CCol>
            <CCard>
                <CCardBody>
                    <div className="form-group">
                        <TextCell label="업체 고유번호" value={enterpriseId} />
                        <TextCell
                            label="한글 이름"
                            placeholder="한글 이름을 입력해주세요"
                            value={korName}
                            onChange={isEditing ? (e) => setKorName(e.target.value) : null}
                        />
                        <TextCell
                            label="영어 이름"
                            placeholder="영어 이름을 입력해주세요"
                            value={engName}
                            onChange={isEditing ? (e) => setEngName(e.target.value) : null}
                        />
                        <TextCell
                            label="카테고리"
                            placeholder="카테고리를 입력해주세요"
                            value={category}
                            onChange={isEditing ? (e) => setCategory(e.target.value) : null}
                        />
                        <TextCell
                            label="전화번호"
                            placeholder="전화번호를 입력해주세요"
                            value={phoneNumber}
                            onChange={isEditing ? (e) => setPhoneNumber(e.target.value) : null}
                        />
                        <TextCell
                            label="대표주소"
                            placeholder="대표주소를 입력해주세요"
                            value={primeLocation}
                            onChange={isEditing ? (e) => setPrimeLocation(e.target.value) : null}
                        />
                        <TextCell
                            label="주소"
                            placeholder="주소를 입력해주세요"
                            value={location}
                            onChange={isEditing ? (e) => setLocation(e.target.value) : null}
                        />
                        <TextCell
                            label="태그"
                            placeholder="태그를 입력해주세요"
                            value={tag}
                            onChange={isEditing ? (e) => setTag(e.target.value) : null}
                        />
                        <TextCell
                            label="설명"
                            placeholder="설명을 입력해주세요"
                            value={description}
                            onChange={isEditing ? (e) => setDescription(e.target.value) : null}
                        />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <CDataTable
                                items={programs}
                                fields={tableFields}
                                scopedSlots={tableScopedSlots}
                                hover
                                striped
                                sorter
                                onRowClick={onTableRowClick}
                                columnFilter
                                pagination={tablePagination}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
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

export default Enterprise;
