import React, { useState, useCallback, useEffect } from 'react';
import { CCard, CCardBody, CCol, CRow, CFormGroup, CInput, CLabel } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import { handleFirebaseUpload } from '../../utils/firebase/uploadFirebase';
import TextCell from '../component/cell/TextCell';
import TextareaCell from '../component/cell/TextareaCell';
import BottomButtons from '../component/Button';
import { WithContext as ReactTags } from 'react-tag-input';
import tagStyles from '../../scss/tag.scss';
import { program } from '@babel/types';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import Modal from 'react-modal';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MyBlock = styled.div`
    .wrapper-class {
        width: 100%;
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
const AddProgram = ({ match }) => {
    const history = useHistory();
    const [enterpriseId] = useState(match.params.enterpriseId);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [programInfo, setProgramInfo] = useState(EditorState.createEmpty());
    const [mealInfo, setMealInfo] = useState(EditorState.createEmpty());
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [file, setFile] = useState(null);
    const [person, setPerson] = useState(null);
    const [price, setPrice] = useState(null);
    const [showRoomPrice, setShowRoomPrice] = useState([]);
    const [roomPrice, setRoomPrice] = useState([]);

    const getRoomPrice = useCallback(
        (parameters) => {
            let tempString = '';
            tempString = String(parameters.inRoom) + '인실: ' + String(parameters.price) + '원';

            setShowRoomPrice([...showRoomPrice, tempString]);
        },
        [roomPrice],
    );
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    // 프로그램 추가 API 요청
    async function postProgram(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.POST,
                url: EndPoint.POST_PROGRAM,
                data: parameters,
            });

            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }

            alert('프로그램 추가에 성공하였습니다.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
        }
    }
    // 가격정보 추가 버튼 onClick
    function onPostRoomButtonClick() {
        if (isEmpty(person)) {
            alert('인수를 입력해주세요.');
            return;
        }
        if (isEmpty(price)) {
            alert('가격을 입력해주세요.');
            return;
        }
        if (window.confirm('추가하시겠습니까?')) {
            const parameters = {
                inRoom: person,
                price: price,
            };
            setRoomPrice([...roomPrice, parameters]);
            getRoomPrice(parameters);
            closeModal();
        }
    }

    // 추가 버튼 onClick
    function onPostButtonClick() {
        let tags = '';
        for (let i = 0; i < tag.length; i++) {
            tags += tag[i].text;
            tags += '|';
        }
        tags = tags.substring(0, tags.length - 1);
        const programInfoToHtml = draftToHtml(convertToRaw(programInfo.getCurrentContent()));
        const mealInfoToHtml = draftToHtml(convertToRaw(mealInfo.getCurrentContent()));
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
        if (isEmpty(thumbnailURL.trim())) {
            alert('이미지를 입력해주세요.');
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
        if (isEmpty(programInfo)) {
            alert('프로그램 설명을 입력해주세요.');
            return;
        }
        if (isEmpty(mealInfo)) {
            alert('식단 설명을 입력해주세요.');
            return;
        }
        if (window.confirm('추가하시겠습니까?')) {
            const parameters = {
                enterpriseId: enterpriseId,
                name: name.trim(),
                description: description.trim(),
                tag: tags.trim(),
                thumbnailURL: thumbnailURL.trim(),
                checkIn: checkIn.trim(),
                checkOut: checkOut.trim(),
                programInfo: programInfoToHtml,
                mealInfo: mealInfoToHtml,
                roomPrice: roomPrice,
            };
            postProgram(parameters).then();
        }
    }

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
            'program',
            theFile.name,
            event.target.files[0],
        );
        setThumbnailURL(firebaseURL);
    }, []);

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

    // 뒤로가기 버튼 onClick
    function onBackButtonClick() {
        history.push(`/enterprises`);
    }

    return (
        <CRow>
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
                        <div className="form-group">
                            <TextCell
                                label="프로그램명"
                                placeholder="프로그램명을 입력해주세요"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextareaCell
                                label="설명"
                                placeholder="설명을 입력해주세요"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div style={{ float: 'right', marginTop: '3px', marginRight: '10px' }}>
                                <button onClick={openModal}>추가</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    // classNames={{
                                    //     overlay: 'customOverlay',
                                    //     modal: 'customModal',
                                    // }}
                                    style={customStyles}
                                >
                                    <div className="form-group">
                                        <TextCell
                                            label="인실"
                                            placeholder="인실을 입력해주세요"
                                            value={person}
                                            onChange={(e) => setPerson(e.target.value)}
                                        />
                                        <TextCell
                                            label="가격"
                                            placeholder="가격을 입력해주세요"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <BottomButtons
                                            onRoomPostClick={onPostRoomButtonClick}
                                            onCloseClick={closeModal}
                                        />
                                    </div>
                                </Modal>
                            </div>
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <CLabel htmlFor="text-input">가격 정보</CLabel>
                                </CCol>
                                <CCol>
                                    <div className="app" style={{ marginLeft: '6px' }}>
                                        <CInput
                                            placeholder="가격 정보를 입력 해주세요"
                                            value={showRoomPrice}
                                            disabled
                                        />
                                    </div>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">태그</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
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
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">썸네일 이미지</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <input type="file" accept="image/*" onChange={onFileChange} />
                                </div>
                            </CFormGroup>
                            <TextCell label="이미지" value="프로그램 수정하기를 통해 넣어주세요" />
                        </div>
                    </CCardBody>
                </CCard>
                <BottomButtons onPostClick={onPostButtonClick} onBackClick={onBackButtonClick} />
            </CCol>
        </CRow>
    );
};

export default AddProgram;
