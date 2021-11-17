import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';
import { tablePagination, tableScopedSlots, tableStatusField } from '../component/Table';
import { itemsPerPage } from '../../constant/Constants';
import { TagsInput } from 'react-tag-input-component';

const Enterprise = ({ match }) => {
    const history = useHistory();
    const [enterpriseId] = useState(match.params.enterpriseId);
    const [korName, setKorName] = useState('');
    const [engName, setEngName] = useState('');
    const [category, setCategory] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primeLocation, setPrimeLocation] = useState('');
    const [location, setLocation] = useState('');
    const [tag, setTag] = useState([]);
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [selected, setSelected] = useState(['papaya', 'apapap']);
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
                setDescription(enterprise.description);
                setCreatedAt(enterprise.createdAt);
                setTag(enterprise.tag.split('|'));
                if (!enterprise.thumbnailURL) {
                    setThumbnailURL('');
                } else {
                    setThumbnailURL(enterprise.thumbnailURL);
                }
                if (enterprise.category == 1) {
                    setCategory('단식원');
                } else if (enterprise.category == 2) {
                    setCategory('템플스테이');
                } else if (enterprise.category == 3) {
                    setCategory('힐링캠프');
                } else {
                    setCategory('산후조리원');
                }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                history.push('/enterprises');
            }
        };

        getEnterprise().then();
    }, []);

    // 업체 수정 API 요청
    async function patchEnterprise(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_ENTERPRISE,
                path: { enterpriseId: enterpriseId },
                data: parameters,
            });
            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('업체 수정에 성공하였습니다.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }

    // 업체 삭제 API 요청
    async function patchEnterpriseStatus(enterpriseId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_ENTERPRISE_STATUS,
                path: { enterpriseId: enterpriseId },
                data: { status: 'INACTIVE' },
            });

            if (!res.isSuccess) {
                alert(res.message);
                return;
            }

            alert('업체가 삭제 되었습니다.');
            history.push('/enterprises');
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
        if (!isEditing) {
            setIsEditing(true);
            return;
        }
        if (isEmpty(korName.trim())) {
            alert('한글 이름을 입력해주세요.');
            return;
        }
        if (isEmpty(engName.trim())) {
            alert('영어 이름을 입력해주세요.');
            return;
        }
        if (isEmpty(category.trim())) {
            alert('카테고리를 입력해주세요.');
            return;
        }
        if (isEmpty(primeLocation.trim())) {
            alert('대표주소를 입력해주세요.');
            return;
        }
        if (isEmpty(location.trim())) {
            alert('주소를 입력해주세요.');
            return;
        }
        if (isEmpty(tag.trim())) {
            alert('태그를 입력해주세요.');
            return;
        }
        if (isEmpty(description.trim())) {
            alert('설명을 입력해주세요.');
            return;
        }
        if (!isEmpty(phoneNumber.trim()) && !isValidPhoneNumber(phoneNumber.trim())) {
            alert('전화번호 형식을 확인해주세요.');
            return;
        }
        if (window.confirm('수정하시겠습니까?')) {
            const parameters = {
                korName: korName.trim(),
                engName: engName.trim(),
                category: category.trim(),
                primeLocation: primeLocation.trim(),
                location: location.trim(),
                tag: tag.trim(),
                description: description.trim(),
                phoneNumber: phoneNumber.trim(),
            };
            patchEnterprise(parameters).then();
        }
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
            patchEnterpriseStatus(enterpriseId).then(() => {});
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
                        {isEditing ? (
                            <div
                                className="row form-group"
                                // style={{
                                //     width: '100%',
                                //     display: 'flex',
                                //     justifyContent: 'center',
                                // }}
                            >
                                <label name="tag">태그</label>
                                <TagsInput
                                    id="tag"
                                    label="태그"
                                    placeholder="태그를 입력해주세요"
                                    value={tag}
                                    onChange={isEditing ? (e) => setTag(e) : null}
                                />
                            </div>
                        ) : (
                            <TextCell label="태그" placeholder="태그를 입력해주세요" value={tag} />
                        )}
                        <TextCell
                            label="설명"
                            placeholder="설명을 입력해주세요"
                            value={description}
                            onChange={isEditing ? (e) => setDescription(e.target.value) : null}
                        />
                        <TextCell label="등록일" value={createdAt} />
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
