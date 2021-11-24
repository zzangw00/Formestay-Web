import React, { useCallback, useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CFormGroup } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';
import { tablePagination, tableScopedSlots, tableStatusField } from '../component/Table';
import { itemsPerPage } from '../../constant/Constants';
import tagStyles from '../../scss/tag.scss';
// import modalStyles from '../../scss/_custom.scss';
// import { TagsInput } from 'react-tag-input-component';
// import ReactTagInput from "@pathofdev/react-tag-input";
import { WithContext as ReactTags } from 'react-tag-input';
import firebase from 'firebase';
import { firebaseConfig } from '../../utils/firebase/configFirebase';
import { handleFirebaseUpload } from '../../utils/firebase/uploadFirebase';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import TimeInput from 'react-time-picker-input/dist/components/TimeInput';

const customStyles = {
    content: {
        width: '700px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Enterprise = ({ match }) => {
    const history = useHistory();
    const [enterpriseId] = useState(match.params.enterpriseId);
    const [korName, setKorName] = useState('');
    const [engName, setEngName] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primeLocation, setPrimeLocation] = useState('');
    const [location, setLocation] = useState('');
    const [tag, setTag] = useState([]);
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [file, setFile] = useState(null);
    const [visible, setVisible] = useState(false);
    const [programId, setProgramId] = useState(null);
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const [name, setName] = useState('');
    const [descriptionP, setDescriptionP] = useState('');
    const [tagP, setTagP] = useState([]);
    const [thumbnailURLP, setThumbnailURLP] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [programInfo, setProgramInfo] = useState('');
    const [mealInfo, setMealInfo] = useState('');
    const [createdAtP, setCreatedAtP] = useState('');
    const [fileP, setFileP] = useState(null);
    const [roomPrice, setRoomPrice] = useState([]);
    const [showRoomPrice, setShowRoomPrice] = useState([]);
    const [isEditingP, setIsEditingP] = useState(false);
    function openModal(programId) {
        setIsOpen(true);
        setProgramId(programId);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        history.go(0);
    }
    // 업체 상세 조회 API 요청
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

                let tempArr = [];
                let tagArr = [];
                const enterprise1 = res.result;
                const enterprise = enterprise1[0];
                setKorName(enterprise.korName);
                setEngName(enterprise.engName);
                setPhoneNumber(enterprise.phoneNumber);
                setPrimeLocation(enterprise.primeLocation);
                setLocation(enterprise.location);
                setDescription(enterprise.description);
                setCreatedAt(enterprise.createdAt);
                tempArr = enterprise.tag.split('|');
                let jsonData;
                for (let i = 0; i < tempArr.length; i++) {
                    jsonData = new Object();
                    jsonData.id = tempArr[i];
                    jsonData.text = tempArr[i];
                    tagArr.push(jsonData);
                }
                setTag(tagArr);
                if (!enterprise.thumbnailURL) {
                    setThumbnailURL('');
                } else {
                    setThumbnailURL(enterprise.thumbnailURL);
                }
                if (enterprise.category == 1) {
                    setCategoryId('1');
                } else if (enterprise.category == 2) {
                    setCategoryId('2');
                } else if (enterprise.category == 3) {
                    setCategoryId('3');
                } else {
                    setCategoryId('4');
                }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                history.push('/enterprises');
            }
        };

        getEnterprise().then();
    }, []);

    // 프로그램 상세 조회 API 요청
    async function getProgram(programId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.GET,
                url: EndPoint.GET_PROGRAM,
                path: { programId: programId },
            });

            if (!res?.isSuccess || isEmpty(res?.result)) {
                alert(res.message);
                history.go(0);
                return;
            }

            let tempArr = [];
            let tagArr = [];
            let priceArr = [];
            const program1 = res.result;
            const program = program1[0];
            setName(program1.programResult[0].name);
            setThumbnailURLP(program1.programResult[0].thumbnailURL);
            setCheckIn(program1.programResult[0].checkIn);
            setCheckOut(program1.programResult[0].checkOut);
            setProgramInfo(program1.programResult[0].programInfo);
            setMealInfo(program1.programResult[0].mealInfo);
            setDescriptionP(program1.programResult[0].description);
            setCreatedAtP(program1.programResult[0].createdAt);
            tempArr = program1.programResult[0].tag.split('|');
            for (let i = 0; i < program1.programRoomResult.length; i++) {
                priceArr.push([
                    program1.programRoomResult[i].inRoom,
                    program1.programRoomResult[i].price,
                ]);
            }
            setRoomPrice(priceArr);
            let showPriceArr = [];
            let tempString = '';
            for (let i = 0; i < priceArr.length; i++) {
                tempString = String(priceArr[i][0]) + '인실: ' + String(priceArr[i][1]) + '원';
                showPriceArr.push(tempString);
            }
            setShowRoomPrice(showPriceArr);
            let jsonData;
            for (let i = 0; i < tempArr.length; i++) {
                jsonData = new Object();
                jsonData.id = tempArr[i];
                jsonData.text = tempArr[i];
                tagArr.push(jsonData);
            }
            setTagP(tagArr);
            if (!program1.programResult[0].thumbnailURL) {
                setThumbnailURLP('');
            } else {
                setThumbnailURLP(program1.programResult[0].thumbnailURL);
            }
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
            history.push('/enterprises');
        }
    }

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

    // 프로그램 수정 API 요청
    async function patchProgram(parameters) {
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

    // 프로그램 삭제 API 요청
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

            alert('프로그램이 삭제 되었습니다.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }

    const onFileChange = useCallback(async (event) => {
        const previewImage = document.getElementById('thumbnailImg');
        // const {
        //     target: { files, value },
        // } = event;
        const theFile = event.target.files[0];
        let reader = new FileReader();
        setFile(event.target.files[0]);
        reader.onload = (e) => {
            previewImage.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(theFile);
        let firebaseURL = await handleFirebaseUpload(
            'enterprise',
            theFile.name,
            event.target.files[0],
        );
        setThumbnailURL(firebaseURL);
    }, []);

    const onFileChangeP = useCallback(async (event) => {
        const previewImage = document.getElementById('thumbnailImgP');
        // const {
        //     target: { files, value },
        // } = event;
        const theFile = event.target.files[0];
        let reader = new FileReader();
        setFileP(event.target.files[0]);
        reader.onload = (e) => {
            previewImage.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(theFile);
        let firebaseURL = await handleFirebaseUpload(
            'program',
            theFile.name,
            event.target.files[0],
        );
        setThumbnailURLP(firebaseURL);
    }, []);

    // 뒤로가기 버튼 onClick
    function onBackButtonClick() {
        history.push(`/enterprises`);
    }

    // 수정 버튼 onClick
    function onPatchButtonClick() {
        let tags = '';
        for (let i = 0; i < tag.length; i++) {
            tags += tag[i].text;
            tags += '|';
        }
        tags = tags.substring(0, tags.length - 1);
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
        if (isEmpty(categoryId.trim())) {
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
        if (isEmpty(tags.trim())) {
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
                category: categoryId.trim(),
                primeLocation: primeLocation.trim(),
                location: location.trim(),
                tag: tags.trim(),
                description: description.trim(),
                phoneNumber: phoneNumber.trim(),
                thumbnailURL: thumbnailURL.trim(),
            };
            patchEnterprise(parameters).then();
        }
    }

    // 프로그램 수정 버튼 onClick
    function onPatchProgramButtonClick() {
        let tags = '';
        for (let i = 0; i < tagP.length; i++) {
            tags += tagP[i].text;
            tags += '|';
        }
        tags = tags.substring(0, tags.length - 1);
        if (!isEditing) {
            setIsEditingP(true);
            return;
        }
        if (isEmpty(name.trim())) {
            alert('프로그램명을 입력해주세요.');
            return;
        }
        if (isEmpty(descriptionP.trim())) {
            alert('설명을 입력해주세요.');
            return;
        }
        if (isEmpty(tags.trim())) {
            alert('태그를 입력해주세요.');
            return;
        }
        if (isEmpty(checkIn.trim())) {
            alert('체크인 시간을 입력해주세요.');
            return;
        }
        if (isEmpty(checkOut.trim())) {
            alert('체크아웃 시간을 입력해주세요.');
            return;
        }
        if (!isEmpty(programInfo.trim())) {
            alert('프로그램 정보를 입력해주세요.');
            return;
        }
        if (!isEmpty(mealInfo.trim())) {
            alert('식단 정보를 입력해주세요.');
            return;
        }
        if (window.confirm('수정하시겠습니까?')) {
            const parameters = {
                name: name.trim(),
                description: descriptionP.trim(),
                tag: tags.trim(),
                checkIn: checkIn.trim(),
                checkOut: checkOut.trim(),
                programInfo: programInfo.trim(),
                mealInfo: mealInfo.trim(),
            };
            patchProgram(parameters).then();
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

                if (!res?.isSuccess) {
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
        openModal(item.programId);
        getProgram(item.programId);
    }

    // 업체 삭제 버튼 onClick
    function onDeleteButtonClick() {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            patchEnterpriseStatus(enterpriseId).then(() => {});
        }
    }

    // 프로그램 삭제 버튼 onClick
    function onDeleteProgramButtonClick() {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            patchProgramStatus(programId).then(() => {});
        }
    }
    // const changeTag = (e) => {
    //   setTag()
    // }

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = useCallback(
        (i) => {
            setTag(tag.filter((onetag, index) => index !== i));
        },
        [tag],
    );

    const handleAddition = useCallback(
        (oneTag) => {
            // let jsonData = new Object()
            // jsonData.id = tag.length + 1
            // jsonData.text = oneTag
            // let testTag = jsonData
            setTag([...tag, oneTag]);
        },
        [tag],
    );

    const handleDeleteP = useCallback(
        (i) => {
            setTagP(tagP.filter((onetagP, index) => index !== i));
        },
        [tagP],
    );

    const handleAdditionP = useCallback(
        (oneTagP) => {
            // let jsonData = new Object()
            // jsonData.id = tag.length + 1
            // jsonData.text = oneTag
            // let testTag = jsonData
            setTagP([...tagP, oneTagP]);
        },
        [tagP],
    );
    const onChangeCategory = useCallback((e) => {
        let target = document.getElementById('categoryId');
        setCategoryId(target.options[target.selectedIndex].value);
    }, []);

    const onChangeCheckInTime = useCallback((e) => {
      alert(e.target.value)
    }, [])

    const onChangeCheckOutTime = useCallback((e) => {
      alert(e.target.value)
    }, [])

    return (
        <CCol>
            <CCard>
                <CCardBody>
                    <p>
                        <div class="text-center">
                            <img
                                id="thumbnailImg"
                                src={thumbnailURL}
                                alt=""
                                class="img-thumbnail"
                                width="300px"
                                height="300px"
                            ></img>
                        </div>
                    </p>
                    <div>
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
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">카테고리</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <select
                                        id="categoryId"
                                        value={categoryId}
                                        onChange={onChangeCategory}
                                        style={{ width: '100px', height: '30px' }}
                                    >
                                        <option value="1">단식원</option>
                                        <option value="2">템플스테이</option>
                                        <option value="3">힐링캠프</option>
                                        <option value="4">산후조리원</option>
                                    </select>
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">카테고리</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <select
                                        id="categoryId"
                                        value={categoryId}
                                        onChange={onChangeCategory}
                                        disabled
                                        style={{ width: '100px', height: '30px' }}
                                    >
                                        <option value="1">단식원</option>
                                        <option value="2">템플스테이</option>
                                        <option value="3">힐링캠프</option>
                                        <option value="4">산후조리원</option>
                                    </select>
                                </div>
                            </CFormGroup>
                        )}
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
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">태그</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '10px' }}>
                                    <ReactTags
                                        tags={tag}
                                        suggestions={tag}
                                        inline
                                        handleDelete={handleDelete}
                                        handleAddition={handleAddition}
                                        delimiters={delimiters}
                                        placeholder="입력후 엔터 눌러주세요."
                                    />
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">태그</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '10px' }}>
                                    <ReactTags
                                        tags={tag}
                                        suggestions={tag}
                                        inline
                                        delimiters={delimiters}
                                        placeholder="수정하기 버튼 클릭해주세요."
                                    />
                                </div>
                            </CFormGroup>
                        )}
                        <TextCell
                            label="설명"
                            placeholder="설명을 입력해주세요"
                            value={description}
                            onChange={isEditing ? (e) => setDescription(e.target.value) : null}
                        />
                        <TextCell label="등록일" value={createdAt} />
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">이미지</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <input type="file" accept="image/*" onChange={onFileChange} />
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">이미지</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <inputTimeInput
                                        type="file"
                                        accept="image/*"
                                        onChange={onFileChange}
                                        disabled
                                    />
                                </div>
                            </CFormGroup>
                        )}
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
                        <div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                // classNames={{
                                //     overlay: 'customOverlay',
                                //     modal: 'customModal',
                                // }}
                                style={customStyles}
                            >
                                <p>
                                    <div class="text-center">
                                        <img
                                            id="thumbnailImgP"
                                            src={thumbnailURLP}
                                            alt=""
                                            class="img-thumbnail"
                                            width="300px"
                                            height="300px"
                                        ></img>
                                    </div>
                                </p>
                                <TextCell
                                    label="프로그램명"
                                    placeholder="프로그램명을 입력해주세요"
                                    value={name}
                                    onChange={isEditingP ? (e) => setName(e.target.value) : null}
                                />
                                <TextCell
                                    label="설명"
                                    placeholder="설명을 입력해주세요"
                                    value={descriptionP}
                                    onChange={
                                        isEditingP ? (e) => setDescription(e.target.value) : null
                                    }
                                />
                                {isEditingP ? (
                                    <CFormGroup row>
                                        <CCol md="2" align="right">
                                            <label name="tag">태그</label>
                                        </CCol>
                                        <div className="app" style={{ marginLeft: '10px' }}>
                                            <ReactTags
                                                tags={tagP}
                                                suggestions={tagP}
                                                inline
                                                handleDelete={handleDeleteP}
                                                handleAddition={handleAdditionP}
                                                delimiters={delimiters}
                                                placeholder="입력후 엔터 눌러주세요."
                                            />
                                        </div>
                                    </CFormGroup>
                                ) : (
                                    <CFormGroup row>
                                        <CCol md="2" align="right">
                                            <label name="tag">태그</label>
                                        </CCol>
                                        <div className="app" style={{ marginLeft: '10px' }}>
                                            <ReactTags
                                                tags={tagP}
                                                suggestions={tagP}
                                                inline
                                                delimiters={delimiters}
                                                placeholder="수정하기 버튼 클릭해주세요."
                                            />
                                        </div>
                                    </CFormGroup>
                                )}
                                <TextCell
                                    label="가격 정보"
                                    placeholder="가격 정보를 입력 해주세요"
                                    value={showRoomPrice}
                                    onChange={
                                        isEditingP ? (e) => setRoomPrice(e.target.value) : null
                                    }
                                />
                                {isEditingP ? (
                                    <CFormGroup row>
                                        <CCol md="2" align="right">
                                            <label name="tag">체크인 시간</label>
                                        </CCol>
                                        <div className="app" style={{ marginLeft: '15px' }}>
                                          <input type="time" id="checkInInput" placeholder={checkIn} onChange={onChangeCheckInTime}/>
                                            {/*<TimeInput*/}
                                            {/*    value={checkIn}*/}
                                            {/*    eachInputDropdown*/}
                                            {/*    onChange={(dateString) => setCheckIn(dateString)}*/}
                                            {/*/>*/}
                                        </div>
                                    </CFormGroup>
                                ) : (
                                    <TextCell
                                        label="체크인 시간"
                                        placeholder="체크인 시간을 입력해주세요"
                                        value={checkIn}
                                        onChange={
                                            isEditingP ? (e) => setCheckIn(e.target.value) : null
                                        }
                                    />
                                )}
                                {isEditingP ? (
                                    <CFormGroup row>
                                        <CCol md="2" align="right">
                                            <label name="tag">체크아웃 시간</label>
                                        </CCol>
                                        <div className="app" style={{ marginLeft: '15px' }}>
                                          <input type="time" id="checkOutInput" placeholder={checkOut} onChange={onChangeCheckOutTime}/>
                                            {/*<TimeInput*/}
                                            {/*    value={checkOut}*/}
                                            {/*    eachInputDropdown*/}
                                            {/*    onChange={(dateString) => setCheckOut(dateString)}*/}
                                            {/*/>*/}
                                        </div>
                                    </CFormGroup>
                                ) : (
                                    <TextCell
                                        label="체크아웃 시간"
                                        placeholder="체크아웃 시간을 입력해주세요"
                                        value={checkOut}
                                        onChange={
                                            isEditingP ? (e) => setCheckOut(e.target.value) : null
                                        }
                                    />
                                )}
                                <TextCell
                                    label="프로그램 정보"
                                    placeholder="프로그램 정보를 입력해주세요"
                                    value={programInfo}
                                    onChange={
                                        isEditingP ? (e) => setProgramInfo(e.target.value) : null
                                    }
                                />
                                <TextCell
                                    label="식단 정보"
                                    placeholder="식단 정보를 입력해주세요"
                                    value={mealInfo}
                                    onChange={
                                        isEditingP ? (e) => setMealInfo(e.target.value) : null
                                    }
                                />
                                <TextCell label="등록일" value={createdAtP} />
                                {isEditingP ? (
                                    <CFormGroup row>
                                        <CCol md="2" align="right">
                                            <label name="thumbnailImg">이미지</label>
                                        </CCol>
                                        <div style={{ marginLeft: '15px' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onFileChangeP}
                                            />
                                        </div>
                                    </CFormGroup>
                                ) : (
                                    <CFormGroup row>
                                        <CCol md="2" align="right">
                                            <label name="thumbnailImg">이미지</label>
                                        </CCol>
                                        <div style={{ marginLeft: '15px' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onFileChangeP}
                                                disabled
                                            />
                                        </div>
                                    </CFormGroup>
                                )}
                                <BottomButtons
                                    onCloseClick={closeModal}
                                    onPatchClick={onPatchProgramButtonClick}
                                    onDeleteClick={onDeleteProgramButtonClick}
                                    patchLabel={isEditingP ? '수정완료' : '수정하기'}
                                />
                            </Modal>
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
