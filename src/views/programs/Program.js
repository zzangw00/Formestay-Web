import React, { useCallback, useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CFormGroup } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';
import tagStyles from '../../scss/tag.scss';
import { handleFirebaseUpload } from '../../utils/firebase/uploadFirebase';
import { WithContext as ReactTags } from 'react-tag-input';

const Program = ({ match }) => {
    const history = useHistory();
    const [programId] = useState(match.params.programId);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState([]);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [programInfo, setProgramInfo] = useState('');
    const [mealInfo, setMealInfo] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [file, setFile] = useState(null);
    const [enterpriseId, setEnterpriseId] = useState(null);
    const [roomPrice, setRoomPrice] = useState([]);
    const [showRoomPrice, setShowRoomPrice] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    // 프로그램 상세 조회 API 요청
    useEffect(() => {
        const getProgram = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_PROGRAM,
                    path: { programId: programId },
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    alert(res.message);
                    history.push(`/enterprises/${enterpriseId}`);
                    return;
                }

                let tempArr = [];
                let tagArr = [];
                let priceArr = [];
                const program1 = res.result;
                const program = program1[0];
                setEnterpriseId(program1.programResult[0].enterpriseId);
                setName(program1.programResult[0].name);
                setThumbnailURL(program1.programResult[0].thumbnailURL);
                setCheckIn(program1.programResult[0].checkIn);
                setCheckOut(program1.programResult[0].checkOut);
                setProgramInfo(program1.programResult[0].programInfo);
                setMealInfo(program1.programResult[0].mealInfo);
                setDescription(program1.programResult[0].description);
                setCreatedAt(program1.programResult[0].createdAt);
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
                setTag(tagArr);
                if (!program1.programResult[0].thumbnailURL) {
                    setThumbnailURL('');
                } else {
                    setThumbnailURL(program1.programResult[0].thumbnailURL);
                }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                history.go(0);
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
            alert('업체 수정에 성공하였습니다.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }

    // 프로램 삭제 API 요청
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

    const onFileChange = useCallback(async (event) => {
        const previewImage = document.getElementById('thumbnailImg');
        const theFile = event.target.files[0];
        let reader = new FileReader();
        setFile(event.target.files[0]);
        reader.onload = (e) => {
            previewImage.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(theFile);
        let firebaseURL = await handleFirebaseUpload(
            'program',
            theFile.name,
            event.target.files[0],
        );
        setThumbnailURL(firebaseURL);
    }, []);

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

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    // 뒤로가기 버튼 onClick
    function onBackButtonClick() {
        history.push(`/enterprises/${enterpriseId}`);
    }

    // 삭제 버튼 onClick
    function onDeleteButtonClick() {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            patchProgramStatus(programId).then(() => {});
        }
    }

    // 프로그램 수정 버튼 onClick
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
        if (isEmpty(name.trim())) {
            alert('프로그램명을 입력해주세요.');
            return;
        }
        if (isEmpty(description.trim())) {
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
                description: description.trim(),
                tag: tags.trim(),
                checkIn: checkIn.trim(),
                checkOut: checkOut.trim(),
                programInfo: programInfo.trim(),
                mealInfo: mealInfo.trim(),
            };
            patchProgram(parameters).then();
        }
    }

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
                        <TextCell
                            label="프로그램명"
                            placeholder="프로그램명을 입력해주세요"
                            value={name}
                            onChange={isEditing ? (e) => setName(e.target.value) : null}
                        />
                        <TextCell
                            label="설명"
                            placeholder="설명을 입력해주세요"
                            value={description}
                            onChange={isEditing ? (e) => setDescription(e.target.value) : null}
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
                            label="가격 정보"
                            placeholder="가격 정보를 입력 해주세요"
                            value={showRoomPrice}
                            onChange={isEditing ? (e) => setRoomPrice(e.target.value) : null}
                        />
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">체크인 시간</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input type="time" id="checkInInput" placeholder={checkIn} />
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
                                onChange={isEditing ? (e) => setCheckIn(e.target.value) : null}
                            />
                        )}
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">체크아웃 시간</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input type="time" id="checkOutInput" placeholder={checkOut} />
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
                                onChange={isEditing ? (e) => setCheckOut(e.target.value) : null}
                            />
                        )}
                        <TextCell
                            label="프로그램 정보"
                            placeholder="프로그램 정보를 입력해주세요"
                            value={programInfo}
                            onChange={isEditing ? (e) => setProgramInfo(e.target.value) : null}
                        />
                        <TextCell
                            label="식단 정보"
                            placeholder="식단 정보를 입력해주세요"
                            value={mealInfo}
                            onChange={isEditing ? (e) => setMealInfo(e.target.value) : null}
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
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onFileChange}
                                        disabled
                                    />
                                </div>
                            </CFormGroup>
                        )}
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
