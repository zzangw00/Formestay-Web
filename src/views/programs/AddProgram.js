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
            tempString = String(parameters.inRoom) + '??????: ' + String(parameters.price) + '???';

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
    // ???????????? ?????? API ??????
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

            alert('???????????? ????????? ?????????????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }
    // ???????????? ?????? ?????? onClick
    function onPostRoomButtonClick() {
        if (isEmpty(person)) {
            alert('????????? ??????????????????.');
            return;
        }
        if (isEmpty(price)) {
            alert('????????? ??????????????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
            const parameters = {
                inRoom: person,
                price: price,
            };
            setRoomPrice([...roomPrice, parameters]);
            getRoomPrice(parameters);
            closeModal();
        }
    }

    // ?????? ?????? onClick
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
            alert('?????????????????? ??????????????????.');
            return;
        }
        if (isEmpty(description.trim())) {
            alert('????????? ??????????????????.');
            return;
        }
        if (isEmpty(tags.trim())) {
            alert('????????? ??????????????????.');
            return;
        }
        if (isEmpty(thumbnailURL.trim())) {
            alert('???????????? ??????????????????.');
            return;
        }
        if (isEmpty(checkIn.trim())) {
            alert('????????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(checkOut.trim())) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(programInfo)) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(mealInfo)) {
            alert('?????? ????????? ??????????????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
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

    // ???????????? ?????? onClick
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
                                label="???????????????"
                                placeholder="?????????????????? ??????????????????"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextareaCell
                                label="??????"
                                placeholder="????????? ??????????????????"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div style={{ float: 'right', marginTop: '3px', marginRight: '20px' }}>
                                <button onClick={openModal}>??????</button>
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
                                            label="??????"
                                            placeholder="????????? ??????????????????"
                                            value={person}
                                            onChange={(e) => setPerson(e.target.value)}
                                        />
                                        <TextCell
                                            label="??????"
                                            placeholder="????????? ??????????????????"
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
                                    <CLabel htmlFor="text-input">?????? ??????</CLabel>
                                </CCol>
                                <CCol>
                                    <CInput
                                        placeholder="?????? ????????? ?????? ????????????"
                                        value={showRoomPrice}
                                        disabled
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <ReactTags
                                        tags={tag}
                                        suggestions={tag}
                                        inline
                                        handleDelete={handleDelete}
                                        handleAddition={handleAddition}
                                        delimiters={delimiters}
                                        placeholder="????????? ?????? ???????????????."
                                    />
                                </div>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">????????? ??????</label>
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
                                    <label name="tag">???????????? ??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input
                                        type="time"
                                        id="checkOutInput"
                                        onChange={onChangecheckOut}
                                    />
                                </div>
                            </CFormGroup>
                            <TextCell
                                label="???????????? ??????"
                                value="???????????? ??????????????? ?????? ???????????????"
                            />
                            <TextCell
                                label="?????? ??????"
                                value="???????????? ??????????????? ?????? ???????????????"
                            />
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">????????? ?????????</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <input type="file" accept="image/*" onChange={onFileChange} />
                                </div>
                            </CFormGroup>
                            <TextCell label="?????????" value="???????????? ??????????????? ?????? ???????????????" />
                        </div>
                    </CCardBody>
                </CCard>
                <BottomButtons onPostClick={onPostButtonClick} onBackClick={onBackButtonClick} />
            </CCol>
        </CRow>
    );
};

export default AddProgram;
