import React, { useCallback, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CFormGroup, CInput, CLabel } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';
import tagStyles from '../../scss/tag.scss';
import { handleFirebaseUpload } from '../../utils/firebase/uploadFirebase';
import { WithContext as ReactTags } from 'react-tag-input';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const MyBlock = styled.div`
    .wrapper-class {
        width: 50%;
        margin: 0 auto;
        margin-bottom: 4rem;
    }
    .editor {
        height: 500px !important;
        border: 1px solid #f1f1f1 !important;
        padding: 5px !important;
        border-radius: 2px !important;
    }
`;

const IntroduceContent = styled.div`
    position: relative;
    border: 0.0625rem solid #d7e2eb;
    border-radius: 0.75rem;
    overflow: hidden;
    padding: 1.5rem;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 4rem;
`;
const Program = ({ match }) => {
    const history = useHistory();
    const [programId] = useState(match.params.programId);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState([]);
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [programInfo, setProgramInfo] = useState(EditorState.createEmpty());
    const [mealInfo, setMealInfo] = useState(EditorState.createEmpty());
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
                const blocksFromHtml = htmlToDraft(program1.programResult[0].programInfo);
                if (blocksFromHtml) {
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                    const contentState = ContentState.createFromBlockArray(
                        contentBlocks,
                        entityMap,
                    );
                    // ContentState를 EditorState기반으로 새 개체를 반환.
                    // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                    const editorState = EditorState.createWithContent(contentState);
                    setProgramInfo(editorState);
                }

                const blocksFromHtmlMeal = htmlToDraft(program1.programResult[0].mealInfo);
                if (blocksFromHtmlMeal) {
                    const { contentBlocks, entityMap } = blocksFromHtmlMeal;
                    // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                    const contentState = ContentState.createFromBlockArray(
                        contentBlocks,
                        entityMap,
                    );
                    // ContentState를 EditorState기반으로 새 개체를 반환.
                    // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                    const editorState = EditorState.createWithContent(contentState);
                    setMealInfo(editorState);
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
            history.push(`/enterprises/${enterpriseId}`);
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
        console.log(firebaseURL);
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
    function onChangecheckOut(e) {
        setCheckOut(e.target.value);
    }
    function onChangecheckIn(e) {
        setCheckIn(e.target.value);
    }
    function onProgramInfoChange(e) {
        setProgramInfo(e);
    }
    function onMealInfoChange(e) {
        setMealInfo(e);
    }

    // 프로그램 수정 버튼 onClick
    function onPatchButtonClick() {
        let tags = '';
        for (let i = 0; i < tag.length; i++) {
            tags += tag[i].text;
            tags += '|';
        }
        tags = tags.substring(0, tags.length - 1);

        const programInfoToHtml = draftToHtml(convertToRaw(programInfo.getCurrentContent()));
        const mealInfoToHtml = draftToHtml(convertToRaw(mealInfo.getCurrentContent()));
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
        if (isEmpty(programInfoToHtml)) {
            alert('프로그램 정보를 입력해주세요.');
            return;
        }
        console.log(programInfo);
        if (isEmpty(mealInfoToHtml)) {
            alert('식단 정보를 입력해주세요.');
            return;
        }

        if (isEmpty(thumbnailURL.trim())) {
            alert('이미지를 넣어 주세요.');
            return;
        }
        if (window.confirm('수정하시겠습니까?')) {
            const parameters = {
                name: name.trim(),
                description: description.trim(),
                tag: tags.trim(),
                checkIn: checkIn.trim(),
                checkOut: checkOut.trim(),
                programInfo: programInfoToHtml,
                mealInfo: mealInfoToHtml,
                thumbnailURL: thumbnailURL.trim(),
            };
            patchProgram(parameters).then();
        }
    }

    const editorToHtml = (e) => {
        return draftToHtml(convertToRaw(e.getCurrentContent()));
    };

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
                        <div style={{ float: 'right', marginTop: '3px' }}>
                            <button>추가</button>
                            <button>수정</button>
                        </div>
                        <CFormGroup row>
                            <CCol md="2" align="right">
                                <CLabel htmlFor="text-input">가격 정보</CLabel>
                            </CCol>
                            <CCol>
                                <div className="app" style={{ marginLeft: '4px' }}>
                                    <CInput
                                        placeholder="가격 정보를 입력 해주세요"
                                        value={showRoomPrice}
                                        disabled
                                    />
                                </div>
                            </CCol>
                        </CFormGroup>
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">체크인 시간</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input
                                        type="time"
                                        id="checkInInput"
                                        onChange={onChangecheckIn}
                                    />
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
                                    <input
                                        type="time"
                                        id="checkOutInput"
                                        onChange={onChangecheckOut}
                                    />
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
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">프로그램 정보</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <MyBlock>
                                        <Editor
                                            // 에디터와 툴바 모두에 적용되는 클래스
                                            wrapperClassName="wrapper-class"
                                            // 에디터 주변에 적용된 클래스
                                            editorClassName="editor"
                                            // 툴바 주위에 적용된 클래스
                                            toolbarClassName="toolbar-class"
                                            // 툴바 설정
                                            toolbar={{
                                                // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                                                list: { inDropdown: true },
                                                textAlign: { inDropdown: true },
                                                link: { inDropdown: true },
                                                history: { inDropdown: false },
                                            }}
                                            placeholder="내용을 작성해주세요."
                                            // 한국어 설정
                                            localization={{
                                                locale: 'ko',
                                            }}
                                            // 초기값 설정
                                            editorState={programInfo}
                                            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                                            onEditorStateChange={onProgramInfoChange}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">프로그램 정보</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <MyBlock>
                                        <IntroduceContent
                                            dangerouslySetInnerHTML={{
                                                __html: editorToHtml(programInfo),
                                            }}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        )}
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">식단 정보</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <MyBlock>
                                        <Editor
                                            // 에디터와 툴바 모두에 적용되는 클래스
                                            wrapperClassName="wrapper-class"
                                            // 에디터 주변에 적용된 클래스
                                            editorClassName="editor"
                                            // 툴바 주위에 적용된 클래스
                                            toolbarClassName="toolbar-class"
                                            // 툴바 설정
                                            toolbar={{
                                                // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                                                list: { inDropdown: true },
                                                textAlign: { inDropdown: true },
                                                link: { inDropdown: true },
                                                history: { inDropdown: false },
                                            }}
                                            placeholder="내용을 작성해주세요."
                                            // 한국어 설정
                                            localization={{
                                                locale: 'ko',
                                            }}
                                            // 초기값 설정
                                            editorState={mealInfo}
                                            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                                            onEditorStateChange={onMealInfoChange}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">식단 정보</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <MyBlock>
                                        <IntroduceContent
                                            dangerouslySetInnerHTML={{
                                                __html: editorToHtml(mealInfo),
                                            }}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        )}
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
