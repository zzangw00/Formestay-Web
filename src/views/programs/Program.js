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
import Modal from 'react-modal';
import { tablePagination, tableScopedSlots, tableStatusField } from '../component/Table';
import { itemsPerPage } from '../../constant/Constants';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../scss/date.css';
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
    const [files, setFiles] = useState([]);
    const [enterpriseId, setEnterpriseId] = useState(null);
    const [roomPrice, setRoomPrice] = useState([]);
    const [inRoomPrice, setInRoomPrice] = useState([]);
    const [showRoomPrice, setShowRoomPrice] = useState([]);
    const [roomPriceInfo, setRoomPriceInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingP, setIsEditingP] = useState(false);
    const [isEditingI, setIsEditingI] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalOneIsOpen, setModalOneIsOpen] = useState(false);
    const [modalTwoIsOpen, setModalTwoIsOpen] = useState(false);
    const [modalThreeIsOpen, setModalThreeIsOpen] = useState(false);
    const [modalProgramIsOpen, setModalProgramIsOpen] = useState(false);
    const [modalMealIsOpen, setModalMealIsOpen] = useState(false);
    const [person, setPerson] = useState(null);
    const [price, setPrice] = useState(null);
    const [programRoomPriceId, setProgramRoomPriceId] = useState(false);
    const [myImage, setMyImage] = useState([]);
    const [programImages, setProgramImages] = useState([]);
    const [uploadProgramImages, setUploadProgramImages] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [date, setDate] = useState('');
    const [date2, setDate2] = useState('');
    const [programInfoId, setProgramInfoId] = useState(null);
    const [mealInfoId, setMealInfoId] = useState(null);
    const [infoState, setInfoState] = useState(null); //???????????? ???????????? 1: ?????? 0: ??????

    function getToday() {
        var date2 = new Date();
        var year = date2.getFullYear();
        var month = ('0' + (1 + date2.getMonth())).slice(-2);
        var day = ('0' + date2.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }

    function openModal() {
        setIsOpen(true);
    }

    function openModalOne() {
        setModalOneIsOpen(true);
    }

    function openModalTwo(item) {
        setModalTwoIsOpen(true);
        setProgramRoomPriceId(item.programRoomPriceId);
        getRoomPrice(item.programRoomPriceId);
    }
    function openModalThree() {
        setModalThreeIsOpen(true);
    }

    function openModalProgram() {
        setDate(getToday());
        getProgramInfo(getToday());
        setModalProgramIsOpen(true);
    }

    function openModalMeal() {
        setDate(getToday());
        getMealInfo(getToday());
        setModalMealIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        history.go(0);
    }
    function closeModalOne() {
        setModalOneIsOpen(false);
        history.go(0);
    }

    function closeModalTwo() {
        setModalTwoIsOpen(false);
    }

    function closeModalThree() {
        setModalThreeIsOpen(false);
    }
    function closeModalProgram() {
        setModalProgramIsOpen(false);
        history.go(0);
    }

    function closeModalMeal() {
        setModalMealIsOpen(false);
        history.go(0);
    }
    // ???????????? ?????? ?????? API ??????
    async function getProgramInfo(date2) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.GET,
                url: EndPoint.GET_PROGRAMINFO,
                path: { programId: programId },
                query: { date: date2 },
            });
            if (!res?.isSuccess) {
                if (res?.code === 2002) {
                    history.go(0);
                } else {
                    alert(res.message);
                }
                return;
            }
            const program = res.result;
            if (!program) {
                setInfoState(0);
            } else {
                setProgramInfoId(program.programInfoId);
                setInfoState(1);
            }
            if (!program) {
                const blocksFromHtml = htmlToDraft('');
                if (blocksFromHtml) {
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                    const contentState = ContentState.createFromBlockArray(
                        contentBlocks,
                        entityMap,
                    );
                    // ContentState??? EditorState???????????? ??? ????????? ??????.
                    // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                    const editorState = EditorState.createWithContent(contentState);
                    setProgramInfo(editorState);
                }
            } else {
                const blocksFromHtml = htmlToDraft(program.content);
                if (blocksFromHtml) {
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                    const contentState = ContentState.createFromBlockArray(
                        contentBlocks,
                        entityMap,
                    );
                    // ContentState??? EditorState???????????? ??? ????????? ??????.
                    // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                    const editorState = EditorState.createWithContent(contentState);
                    setProgramInfo(editorState);
                }
            }
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ?????? ?????? ?????? API ??????
    async function getMealInfo(date2) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.GET,
                url: EndPoint.GET_MEALINFO,
                path: { programId: programId },
                query: { date: date2 },
            });
            if (!res?.isSuccess) {
                if (res?.code === 2002) {
                    history.go(0);
                } else {
                    alert(res.message);
                }
                return;
            }
            const meal = res.result;
            if (!meal) {
                setInfoState(0);
            } else {
                setMealInfoId(meal.mealInfoId);
                setInfoState(1);
            }
            if (!meal) {
                const blocksFromHtml = htmlToDraft('');
                if (blocksFromHtml) {
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                    const contentState = ContentState.createFromBlockArray(
                        contentBlocks,
                        entityMap,
                    );
                    // ContentState??? EditorState???????????? ??? ????????? ??????.
                    // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                    const editorState = EditorState.createWithContent(contentState);
                    setMealInfo(editorState);
                }
            } else {
                const blocksFromHtml = htmlToDraft(meal.content);
                if (blocksFromHtml) {
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                    const contentState = ContentState.createFromBlockArray(
                        contentBlocks,
                        entityMap,
                    );
                    // ContentState??? EditorState???????????? ??? ????????? ??????.
                    // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                    const editorState = EditorState.createWithContent(contentState);
                    setMealInfo(editorState);
                }
            }
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? ?????? API ??????
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
                setDate(getToday());
                setDate2(getToday());
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
                priceArr.sort((a, b) => {
                    if (a[0] === b[0]) return a[1] - b[1];
                    else return a[0] - b[0];
                });
                setInRoomPrice(program1.programRoomResult);
                setRoomPrice(priceArr);
                let showPriceArr = [];
                let tempString = '';
                for (let i = 0; i < priceArr.length; i++) {
                    tempString = String(priceArr[i][0]) + '??????: ' + String(priceArr[i][1]) + '???';
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
                const date = getToday();
                const { data: res1 } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_PROGRAMINFO,
                    path: { programId: programId },
                    query: { date: date },
                });
                console.log(res1.result);
                if (!res1?.isSuccess) {
                    if (res1?.code === 2002) {
                        history.go(0);
                    } else {
                        alert(res1.message);
                    }
                    return;
                }
                const program2 = res1.result;
                if (!program2) {
                    setInfoState(0);
                } else {
                    setProgramInfoId(program2.programInfoId);
                    setInfoState(1);
                }
                if (!program2) {
                    const blocksFromHtml = htmlToDraft('');
                    if (blocksFromHtml) {
                        const { contentBlocks, entityMap } = blocksFromHtml;
                        // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                        const contentState = ContentState.createFromBlockArray(
                            contentBlocks,
                            entityMap,
                        );
                        // ContentState??? EditorState???????????? ??? ????????? ??????.
                        // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                        const editorState = EditorState.createWithContent(contentState);
                        setProgramInfo(editorState);
                    }
                } else {
                    const blocksFromHtml = htmlToDraft(program2.content);
                    if (blocksFromHtml) {
                        const { contentBlocks, entityMap } = blocksFromHtml;
                        // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                        const contentState = ContentState.createFromBlockArray(
                            contentBlocks,
                            entityMap,
                        );
                        // ContentState??? EditorState???????????? ??? ????????? ??????.
                        // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                        const editorState = EditorState.createWithContent(contentState);
                        setProgramInfo(editorState);
                    }
                }
                const { data: res2 } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_MEALINFO,
                    path: { programId: programId },
                    query: { date: date },
                });
                if (!res2?.isSuccess) {
                    if (res2?.code === 2002) {
                        history.go(0);
                    } else {
                        alert(res.message);
                    }
                    return;
                }
                const meal = res2.result;
                if (!meal) {
                    setInfoState(0);
                } else {
                    setMealInfoId(meal.mealInfoId);
                    setInfoState(1);
                }
                if (!meal) {
                    const blocksFromHtml = htmlToDraft('');
                    if (blocksFromHtml) {
                        const { contentBlocks, entityMap } = blocksFromHtml;
                        // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                        const contentState = ContentState.createFromBlockArray(
                            contentBlocks,
                            entityMap,
                        );
                        // ContentState??? EditorState???????????? ??? ????????? ??????.
                        // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                        const editorState = EditorState.createWithContent(contentState);
                        setMealInfo(editorState);
                    }
                } else {
                    const blocksFromHtml = htmlToDraft(meal.content);
                    if (blocksFromHtml) {
                        const { contentBlocks, entityMap } = blocksFromHtml;
                        // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
                        const contentState = ContentState.createFromBlockArray(
                            contentBlocks,
                            entityMap,
                        );
                        // ContentState??? EditorState???????????? ??? ????????? ??????.
                        // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
                        const editorState = EditorState.createWithContent(contentState);
                        setMealInfo(editorState);
                    }
                }
            } catch (error) {
                console.log(error);
                alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
                history.go(0);
            }
        };

        getProgram().then();
    }, []);

    //???????????? ????????? ?????? API ??????
    useEffect(() => {
        const getProgramImages = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_PROGRAMIMAGES,
                    path: { programId: programId },
                });

                if (!res?.isSuccess) {
                    if (res?.code === 2002) {
                        history.push('/enterprises');
                    } else {
                        alert(res.message);
                    }
                    return;
                }
                const temp = res.result;
                const images = [];
                if (!temp) {
                    setProgramImages('');
                } else {
                    for (let i = 0; i < temp.length; i++) {
                        images.push(temp[i].imageURL);
                    }
                }
                setProgramImages(images);
                let imageData = [];
                let jsonData;
                for (let i = 0; i < temp.length; i++) {
                    jsonData = new Object();
                    jsonData.original = temp[i].imageURL;
                    jsonData.thumbnailURL = temp[i].imageURL;
                    jsonData.originalAlt = temp[i].programImageId;
                    imageData.push(jsonData);
                }
                setImageData(imageData);
            } catch (error) {
                console.log(error);
                alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
            }
        };

        getProgramImages().then();
    }, []);

    // ???????????? ?????? API ??????
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
            alert('?????? ????????? ?????????????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ????????? ?????? API ??????
    async function postProgramImages(parameters) {
        try {
            // console.log(parameters);
            if (parameters.images.length !== 0) {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.POST,
                    url: EndPoint.POST_PROGRAMIMAGE,
                    path: { programId: programId },
                    data: parameters,
                });
                if (!res?.isSuccess) {
                    alert(res.message);
                    return;
                }
                alert('????????? ????????? ?????????????????????.');
                history.go(0);
            } else {
                alert('???????????? ??????????????????.');
            }
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? API ??????
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

            alert('???????????? ????????? ?????????????????????.');
            history.push(`/enterprises/${enterpriseId}`);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? API ??????
    async function postRoomPrice(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.POST,
                url: EndPoint.POST_ROOMPRICE,
                data: parameters,
            });
            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('?????? ?????? ????????? ?????????????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? API ??????
    async function getRoomPrice(programRoomPriceId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.GET,
                url: EndPoint.GET_ROOMPRICE,
                path: { programRoomPriceId: programRoomPriceId },
            });

            if (!res?.isSuccess) {
                if (res?.code === 2002) {
                    history.go(0);
                } else {
                    alert(res.message);
                }
                return;
            }
            const programRoomPrice = res.result;
            setPrice(programRoomPrice[0].price);
            setPerson(programRoomPrice[0].inRoom);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? API ??????
    async function patchRoomPrice(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_ROOMPRICE,
                path: { programRoomPriceId: programRoomPriceId },
                data: parameters,
            });
            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('?????? ?????? ????????? ?????????????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? API ??????
    async function patchProgramRoomPriceStatus(programRoomPriceId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_ROOMPRICE_STATUS,
                path: { programRoomPriceId: programRoomPriceId },
                data: { status: 'INACTIVE' },
            });
            if (!res.isSuccess) {
                alert(res.message);
                return;
            }

            alert('?????? ?????? ????????? ?????????????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ????????? ?????? API ??????
    async function patchProgramImageStatus(programImageId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_PROGRAMIMAGE_STATUS,
                path: { programImageId: parseInt(programImageId) },
            });
            if (!res.isSuccess) {
                alert(res.message);
                return;
            }

            alert('????????? ????????? ?????????????????????.');
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
                programId: programId,
                inRoom: person,
                price: price,
            };
            postRoomPrice(parameters).then();
        }
    }

    // ???????????? ?????? ?????? API ??????
    async function patchProgramInfo(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_PROGRAMINFO,
                path: { programInfoId: programInfoId },
                data: parameters,
            });
            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('???????????? ?????? ????????? ?????????????????????.');
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? ?????? API ??????
    async function postProgramInfo(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.POST,
                url: EndPoint.POST_PROGRAMINFO,
                path: { programId: programId },
                data: parameters,
            });
            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('???????????? ?????? ????????? ?????????????????????.');
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ?????? ?????? ?????? API ??????
    async function patchMealInfo(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_MEALINFO,
                path: { mealInfoId: mealInfoId },
                data: parameters,
            });
            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('?????? ?????? ????????? ?????????????????????.');
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ?????? ?????? ?????? API ??????
    async function postMealInfo(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.POST,
                url: EndPoint.POST_MEALINFO,
                path: { programId: programId },
                data: parameters,
            });
            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }
            alert('?????? ?????? ????????? ?????????????????????.');
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ???????????? ?????? ?????? onClick
    function onPatchRoomButtonClick() {
        if (!isEditingP) {
            setIsEditingP(true);
            return;
        }
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
            patchRoomPrice(parameters).then();
        }
    }

    // ????????? ?????? ?????? onClick
    function onPostImagesButtonClick() {
        const subs = document.getElementById('images-upload');
        subs.innerText = '?????? ??????';
        if (!isEditingI) {
            setIsEditingI(true);
            return;
        }
        if (window.confirm('???????????? ???????????? ?????? ???????????????????')) {
            const parameters = {
                images: uploadProgramImages,
            };
            setIsEditingI(false);
            subs.innerText = '?????? ??????';
            postProgramImages(parameters).then();
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

    const onImageChange = useCallback(async (event) => {
        const theFiles = event.target.files;
        setFiles(event.target.files);
        let urls = [];
        for (let i = 0; i < theFiles.length; i++) {
            let firebaseURL = await handleFirebaseUpload(
                'programImages',
                theFiles[i].name,
                theFiles[i],
            );
            urls.push(firebaseURL);
        }
        setUploadProgramImages(urls);
    }, []);

    const handleDelete = useCallback(
        (i) => {
            setTag(tag.filter((onetag, index) => index !== i));
        },
        [tag],
    );

    const handleAddition = useCallback(
        (oneTag) => {
            if (tag.length == 5) {
                alert('????????? 5??? ?????? ???????????? ??? ????????????.');
            } else {
                setTag([...tag, oneTag]);
            }
        },
        [tag],
    );

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    // ???????????? ?????? onClick
    function onBackButtonClick() {
        history.push(`/enterprises/${enterpriseId}`);
    }

    // ?????? ?????? onClick
    function onDeleteButtonClick() {
        if (window.confirm('????????? ?????????????????????????')) {
            patchProgramStatus(programId).then(() => {});
        }
    }

    // ?????? ?????? onClick
    function onDeleteImageButtonClick(programImageId) {
        if (window.confirm('????????? ?????????????????????????')) {
            patchProgramImageStatus(programImageId).then(() => {});
        }
    }

    // ???????????? ?????? ?????? onClick
    function onDeleteRoomPriceButtonClick() {
        if (window.confirm('????????? ?????????????????????????')) {
            patchProgramRoomPriceStatus(programRoomPriceId).then(() => {});
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
    function onClickImage(e) {
        onDeleteImageButtonClick(e.target.alt);
    }

    function programDateChange(e) {
        setDate(e.target.value);
        getProgramInfo(e.target.value);
    }

    function mealDateChange(e) {
        setDate2(e.target.value);
        getMealInfo(e.target.value);
    }

    function programCheckState() {
        if (infoState == 1) {
            onProgramInfoPatchButtonClick();
        } else {
            onProgramInfoPostButtonClick();
        }
    }

    function mealCheckState() {
        if (infoState == 1) {
            onMealInfoPatchButtonClick();
        } else {
            onMealInfoPostButtonClick();
        }
    }

    // ???????????? ?????? ?????? ??????
    function onProgramInfoPatchButtonClick() {
        const programInfoToHtml = draftToHtml(convertToRaw(programInfo.getCurrentContent()));
        if (isEmpty(programInfoToHtml)) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
            const parameters = {
                content: programInfoToHtml,
            };
            patchProgramInfo(parameters).then();
        }
    }
    // ???????????? ?????? ?????? ??????
    function onProgramInfoPostButtonClick() {
        const programInfoToHtml = draftToHtml(convertToRaw(programInfo.getCurrentContent()));
        if (isEmpty(programInfoToHtml)) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
            const parameters = {
                programId: programId,
                content: programInfoToHtml,
                date: date,
            };
            postProgramInfo(parameters).then();
        }
    }

    // ?????? ?????? ?????? ??????
    function onMealInfoPatchButtonClick() {
        const mealInfoToHtml = draftToHtml(convertToRaw(mealInfo.getCurrentContent()));
        if (isEmpty(mealInfoToHtml)) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
            const parameters = {
                content: mealInfoToHtml,
            };
            patchMealInfo(parameters).then();
        }
    }
    // ?????? ?????? ?????? ??????
    function onMealInfoPostButtonClick() {
        const mealInfoToHtml = draftToHtml(convertToRaw(mealInfo.getCurrentContent()));
        if (isEmpty(mealInfoToHtml)) {
            alert('?????? ????????? ??????????????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
            const parameters = {
                programId: programId,
                content: mealInfoToHtml,
                date: date2,
            };
            postMealInfo(parameters).then();
        }
    }

    // ???????????? ?????? ?????? onClick
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
        if (isEmpty(checkIn.trim())) {
            alert('????????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(checkOut.trim())) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(programInfoToHtml)) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(mealInfoToHtml)) {
            alert('?????? ????????? ??????????????????.');
            return;
        }

        if (isEmpty(thumbnailURL.trim())) {
            alert('???????????? ?????? ?????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
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

    // ????????? ?????? - fields
    const tableFields = [
        {
            key: 'inRoom',
            label: '??????',
            filter: true,
            sorter: true,
        },
        {
            key: 'price',
            label: '??????',
            filter: true,
            sorter: true,
        },
    ];

    const rendering = () => {
        const result = [];
        if (programImages.length == 0) {
            result.push(
                <img
                    id="thumbnailImg"
                    src={programImages}
                    alt=""
                    class="img-thumbnail"
                    width="150px"
                    height="150px"
                ></img>,
            );
        } else {
            for (let i = 0; i < programImages.length; i++) {
                result.push(
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px',
                        }}
                        key={i}
                    >
                        <img
                            id="thumbnailImg"
                            src={programImages[i]}
                            alt=""
                            width="150px"
                            height="150px"
                            style={{ boxSizing: 'border-box' }}
                        ></img>
                    </div>,
                );
            }
        }
        return result;
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
                    <p>
                        <div
                            class="text-center"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {rendering()}
                        </div>
                    </p>
                    <div>
                        <TextCell
                            label="???????????????"
                            placeholder="?????????????????? ??????????????????"
                            value={name}
                            onChange={isEditing ? (e) => setName(e.target.value) : null}
                        />
                        <TextCell
                            label="??????"
                            placeholder="????????? ??????????????????"
                            value={description}
                            onChange={isEditing ? (e) => setDescription(e.target.value) : null}
                        />
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '10px' }}>
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
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '10px' }}>
                                    <ReactTags
                                        tags={tag}
                                        suggestions={tag}
                                        inline
                                        delimiters={delimiters}
                                        placeholder="???????????? ?????? ??????????????????."
                                    />
                                </div>
                            </CFormGroup>
                        )}
                        <div style={{ float: 'right', marginTop: '3px', marginRight: '10px' }}>
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
                        <div style={{ float: 'right', marginTop: '3px', marginRight: '3px' }}>
                            <button onClick={openModalOne}>??????</button>
                            <Modal
                                isOpen={modalOneIsOpen}
                                onRequestClose={closeModalOne}
                                // classNames={{
                                //     overlay: 'customOverlay',
                                //     modal: 'customModal',
                                // }}
                                style={customStyles}
                            >
                                <CDataTable
                                    items={inRoomPrice}
                                    fields={tableFields}
                                    scopedSlots={tableScopedSlots}
                                    hover
                                    striped
                                    sorter
                                    onRowClick={openModalTwo}
                                    columnFilter
                                    pagination={tablePagination}
                                    itemsPerPage={itemsPerPage}
                                />
                                <BottomButtons onCloseClick={closeModalOne} />
                            </Modal>
                            <Modal
                                isOpen={modalTwoIsOpen}
                                onRequestClose={closeModalTwo}
                                // classNames={{
                                //     overlay: 'customOverlay',
                                //     modal: 'customModal',
                                // }}
                                style={customStyles}
                            >
                                <TextCell
                                    label="??????"
                                    placeholder="????????? ??????????????????"
                                    value={person}
                                    onChange={isEditingP ? (e) => setPerson(e.target.value) : null}
                                />
                                <TextCell
                                    label="??????"
                                    placeholder="????????? ??????????????????"
                                    value={price}
                                    onChange={isEditingP ? (e) => setPrice(e.target.value) : null}
                                />
                                <BottomButtons
                                    onCloseClick={closeModalTwo}
                                    onPatchClick={onPatchRoomButtonClick}
                                    onDeleteClick={onDeleteRoomPriceButtonClick}
                                    patchLabel={isEditingP ? '????????????' : '????????????'}
                                />
                            </Modal>
                        </div>

                        <CFormGroup row>
                            <CCol md="2" align="right">
                                <CLabel htmlFor="text-input">?????? ??????</CLabel>
                            </CCol>
                            <CCol>
                                <div className="app" style={{ marginLeft: '6px' }}>
                                    <CInput
                                        placeholder="?????? ????????? ?????? ????????????"
                                        value={showRoomPrice}
                                        disabled
                                    />
                                </div>
                            </CCol>
                        </CFormGroup>
                        {isEditing ? (
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
                        ) : (
                            <TextCell
                                label="????????? ??????"
                                placeholder="????????? ????????? ??????????????????"
                                value={checkIn}
                                onChange={isEditing ? (e) => setCheckIn(e.target.value) : null}
                            />
                        )}
                        {isEditing ? (
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
                        ) : (
                            <TextCell
                                label="???????????? ??????"
                                placeholder="???????????? ????????? ??????????????????"
                                value={checkOut}
                                onChange={isEditing ? (e) => setCheckOut(e.target.value) : null}
                            />
                        )}
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">???????????? ??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input
                                        type="date"
                                        id="dateInput"
                                        name="trip-start"
                                        required
                                        value={date}
                                        onChange={(e) => programDateChange(e)}
                                    />
                                    <button
                                        onClick={() => programCheckState()}
                                        style={{ marginLeft: '15px' }}
                                    >
                                        ??????
                                    </button>
                                    <MyBlock>
                                        <Editor
                                            // ???????????? ?????? ????????? ???????????? ?????????
                                            wrapperClassName="wrapper-class"
                                            // ????????? ????????? ????????? ?????????
                                            editorClassName="editor"
                                            // ?????? ????????? ????????? ?????????
                                            toolbarClassName="toolbar-class"
                                            // ?????? ??????
                                            toolbar={{
                                                // inDropdown: ?????? ????????? ????????? ????????? ?????????????????? ??????????????????
                                                list: { inDropdown: true },
                                                textAlign: { inDropdown: true },
                                                link: { inDropdown: true },
                                                history: { inDropdown: false },
                                            }}
                                            placeholder="????????? ??????????????????."
                                            // ????????? ??????
                                            localization={{
                                                locale: 'ko',
                                            }}
                                            // ????????? ??????
                                            editorState={programInfo}
                                            // ???????????? ?????? ????????? ????????? onEditorStateChange ??????
                                            onEditorStateChange={onProgramInfoChange}
                                            readOnly={false}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">???????????? ??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input
                                        type="date"
                                        id="dateInput"
                                        name="trip-start"
                                        required
                                        value={date}
                                        onChange={(e) => programDateChange(e)}
                                    />

                                    <MyBlock>
                                        <Editor
                                            // ???????????? ?????? ????????? ???????????? ?????????
                                            wrapperClassName="wrapper-class"
                                            // ????????? ????????? ????????? ?????????
                                            editorClassName="editor"
                                            // ?????? ????????? ????????? ?????????
                                            toolbarClassName="toolbar-class"
                                            // ?????? ??????
                                            toolbar={{
                                                // inDropdown: ?????? ????????? ????????? ????????? ?????????????????? ??????????????????
                                                list: { inDropdown: true },
                                                textAlign: { inDropdown: true },
                                                link: { inDropdown: true },
                                                history: { inDropdown: false },
                                            }}
                                            placeholder="????????? ??????????????????."
                                            // ????????? ??????
                                            localization={{
                                                locale: 'ko',
                                            }}
                                            // ????????? ??????
                                            editorState={programInfo}
                                            // ???????????? ?????? ????????? ????????? onEditorStateChange ??????
                                            onEditorStateChange={onProgramInfoChange}
                                            readOnly={true}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        )}
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">?????? ??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input
                                        type="date"
                                        id="dateInput"
                                        name="trip-start"
                                        required
                                        value={date2}
                                        onChange={(e) => mealDateChange(e)}
                                    />
                                    <button
                                        onClick={() => mealCheckState()}
                                        style={{ marginLeft: '15px' }}
                                    >
                                        ??????
                                    </button>
                                    <MyBlock>
                                        <Editor
                                            // ???????????? ?????? ????????? ???????????? ?????????
                                            wrapperClassName="wrapper-class"
                                            // ????????? ????????? ????????? ?????????
                                            editorClassName="editor"
                                            // ?????? ????????? ????????? ?????????
                                            toolbarClassName="toolbar-class"
                                            // ?????? ??????
                                            toolbar={{
                                                // inDropdown: ?????? ????????? ????????? ????????? ?????????????????? ??????????????????
                                                list: { inDropdown: true },
                                                textAlign: { inDropdown: true },
                                                link: { inDropdown: true },
                                                history: { inDropdown: false },
                                            }}
                                            placeholder="????????? ??????????????????."
                                            // ????????? ??????
                                            localization={{
                                                locale: 'ko',
                                            }}
                                            // ????????? ??????
                                            editorState={mealInfo}
                                            // ???????????? ?????? ????????? ????????? onEditorStateChange ??????
                                            onEditorStateChange={onMealInfoChange}
                                            readOnly={false}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="tag">?????? ??????</label>
                                </CCol>
                                <div className="app" style={{ marginLeft: '15px' }}>
                                    <input
                                        type="date"
                                        id="dateInput"
                                        name="trip-start"
                                        required
                                        value={date2}
                                        onChange={(e) => mealDateChange(e)}
                                    />
                                    <MyBlock>
                                        <Editor
                                            // ???????????? ?????? ????????? ???????????? ?????????
                                            wrapperClassName="wrapper-class"
                                            // ????????? ????????? ????????? ?????????
                                            editorClassName="editor"
                                            // ?????? ????????? ????????? ?????????
                                            toolbarClassName="toolbar-class"
                                            // ?????? ??????
                                            toolbar={{
                                                // inDropdown: ?????? ????????? ????????? ????????? ?????????????????? ??????????????????
                                                list: { inDropdown: true },
                                                textAlign: { inDropdown: true },
                                                link: { inDropdown: true },
                                                history: { inDropdown: false },
                                            }}
                                            placeholder="????????? ??????????????????."
                                            // ????????? ??????
                                            localization={{
                                                locale: 'ko',
                                            }}
                                            // ????????? ??????
                                            editorState={mealInfo}
                                            // ???????????? ?????? ????????? ????????? onEditorStateChange ??????
                                            onEditorStateChange={onMealInfoChange}
                                            readOnly={true}
                                        />
                                    </MyBlock>
                                </div>
                            </CFormGroup>
                        )}
                        <TextCell label="?????????" value={createdAt} />
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">????????? ?????????</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <input type="file" accept="image/*" onChange={onFileChange} />
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">????????? ?????????</label>
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
                        <div style={{ float: 'right', marginTop: '3px', marginRight: '10px' }}>
                            <button onClick={openModalThree}>??????</button>
                            <Modal
                                isOpen={modalThreeIsOpen}
                                onRequestClose={closeModalThree}
                                style={customStyles}
                            >
                                <ImageGallery items={imageData} onClick={onClickImage} />
                            </Modal>
                        </div>
                        <div style={{ float: 'right', marginTop: '3px', marginRight: '3px' }}>
                            <button id="images-upload" onClick={onPostImagesButtonClick}>
                                ????????????
                            </button>
                        </div>
                        {isEditingI ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="images">?????????</label>
                                </CCol>
                                <div style={{ marginLeft: '24px' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onImageChange}
                                        multiple
                                    />
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="images">?????????</label>
                                </CCol>
                                <div style={{ marginLeft: '24px' }}>
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
                patchLabel={isEditing ? '????????????' : '????????????'}
            />
        </CCol>
    );
};

export default Program;
