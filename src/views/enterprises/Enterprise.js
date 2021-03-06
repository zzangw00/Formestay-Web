import React, { useCallback, useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CFormGroup, CPagination } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidEmail, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import TextCell from '../component/cell/TextCell';
import BottomButtons from '../component/Button';
import {
    tablePagination,
    tableScopedSlots,
    tableStatusField,
    tableEnterpriseAndProgramStatusField,
} from '../component/Table';
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
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const customStyles = {
    content: {
        width: '700px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
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
    const [events, setEvents] = useState([]);
    const [modalIsOpenOne, setIsOpenOne] = useState(false);
    const [modalIsOpenTwo, setIsOpenTwo] = useState(false);
    const [name, setName] = useState('');
    const [programName, setProgramName] = useState('');
    const [userId, setUserId] = useState(null);
    const [programId, setProgramId] = useState(null);
    const [phoneNumberR, setPhoneNumberR] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState(null);
    const [reservationNumber, setReservationNumber] = useState('');
    const [createdAtR, setCreatedAtR] = useState('');
    const [status, setStatus] = useState('');
    const [reservationId, setReservationId] = useState(null);

    function manageReservation(reservationId, color) {
        if (color == 'orange') {
            openModalOne(reservationId);
        } else {
            openModalTwo(reservationId);
        }
    }
    function openModalOne(reservationId) {
        getReservation(reservationId);
        setReservationId(reservationId);
        setIsOpenOne(true);
    }
    function openModalTwo(reservationId) {
        getReservation(reservationId);
        setReservationId(reservationId);
        setIsOpenTwo(true);
    }
    function closeModalOne() {
        setIsOpenOne(false);
    }
    function closeModalTwo() {
        setIsOpenTwo(false);
    }
    const [reservation, setReservation] = useState([]);

    // ?????? ?????? ?????? API ??????
    useEffect(() => {
        const getEnterprise = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_ENTERPRISE,
                    path: { enterpriseId: enterpriseId },
                });
                const { data: res2 } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_STATUS,
                });
                if (!res?.isSuccess || isEmpty(res?.result)) {
                    alert(res.message);
                    history.push('/enterprises');
                    return;
                }
                if (
                    !res2?.isSuccess ||
                    isEmpty(res2?.result) ||
                    (res2.result.enterpriseId != enterpriseId && res2.result.status == 1)
                ) {
                    alert('?????? ?????? ???????????? ????????? ??? ????????????.');
                    history.push('/users');
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
                alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
                history.push('/enterprises');
            }
        };

        getEnterprise().then();
    }, []);

    // ?????? ?????? API ??????
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
            alert('?????? ????????? ?????????????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ?????? ?????? API ??????
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

            alert('????????? ?????? ???????????????.');
            history.push('/enterprises');
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ?????? ?????? API ??????
    async function cancleReservation(reservationId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_RESERVATION_CANCLE,
                path: { reservationId: reservationId },
                data: { status: 'INACTIVE' },
            });

            if (!res.isSuccess) {
                alert(res.message);
                return;
            }

            alert('????????? ?????? ???????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    // ?????? ?????? API ??????
    async function registReservation(reservationId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.PATCH,
                url: EndPoint.PATCH_RESERVATION_REGIST,
                path: { reservationId: reservationId },
                data: { status: 'ACTIVE' },
            });

            if (!res.isSuccess) {
                alert(res.message);
                return;
            }

            alert('????????? ?????? ???????????????.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
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
            'enterprise',
            theFile.name,
            event.target.files[0],
        );
        setThumbnailURL(firebaseURL);
    }, []);

    // ???????????? ?????? onClick
    function onBackButtonClick() {
        history.push(`/enterprises`);
    }

    // ???????????? ?????? ?????? onClick
    function onPostProgramClick() {
        history.push(`/enterprise/${enterpriseId}/add-program`);
    }

    // ?????? ?????? onClick
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
            alert('?????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(engName.trim())) {
            alert('?????? ????????? ??????????????????.');
            return;
        }
        if (isEmpty(categoryId.trim())) {
            alert('??????????????? ??????????????????.');
            return;
        }
        if (isEmpty(primeLocation.trim())) {
            alert('??????????????? ??????????????????.');
            return;
        }
        if (isEmpty(location.trim())) {
            alert('????????? ??????????????????.');
            return;
        }
        if (isEmpty(tags.trim())) {
            alert('????????? ??????????????????.');
            return;
        }
        if (isEmpty(description.trim())) {
            alert('????????? ??????????????????.');
            return;
        }
        if (!isEmpty(phoneNumber.trim()) && !isValidPhoneNumber(phoneNumber.trim())) {
            alert('???????????? ????????? ??????????????????.');
            return;
        }
        if (window.confirm('?????????????????????????')) {
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
    // ?????? ?????? ?????? API ??????
    async function getReservation(reservationId) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.GET,
                url: EndPoint.GET_RESERVATION,
                path: { reservationId: reservationId },
            });

            if (!res?.isSuccess) {
                if (res?.code === 2002) {
                    history.go(0);
                } else {
                    alert(res.message);
                }
                return;
            }
            const reservation = res.result;
            setName(reservation[0].name);
            setUserId(reservation[0].userId);
            setProgramId(reservation[0].programId);
            setPhoneNumberR(reservation[0].phoneNumber);
            setStartDate(reservation[0].startDate);
            setEndDate(reservation[0].endDate);
            setPrice(reservation[0].price);
            setReservationNumber(reservation[0].reservationNumber);
            setCreatedAtR(reservation[0].createdAt);
            setProgramName(reservation[0].programName);
            if (reservation[0].status == 'ACTIVE') {
                setStatus('?????? ??????');
            } else {
                setStatus('?????????');
            }
        } catch (error) {
            console.log(error);
            alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
        }
    }

    //?????? ?????? API ??????
    useEffect(() => {
        const getReservations = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_RESERVATIONS,
                    path: { enterpriseId: enterpriseId },
                });

                if (!res?.isSuccess) {
                    alert(res.message);
                    history.push('/enterprises');
                    return;
                }
                let tempArr = [];
                let events = [];
                setReservation(res.result);
                const reservation = res.result;
                tempArr = reservation;
                let jsonData;
                for (let i = 0; i < tempArr.length; i++) {
                    let date = new Date(tempArr[i].endDate);
                    date.setDate(date.getDate() + 1);
                    var year = date.getFullYear();
                    var month = ('0' + (1 + date.getMonth())).slice(-2);
                    var day = ('0' + date.getDate()).slice(-2);
                    let title = tempArr[i].programName + ', ' + tempArr[i].name;
                    jsonData = new Object();
                    jsonData.id = tempArr[i].reservationId;
                    jsonData.title = title;
                    jsonData.start = tempArr[i].startDate;
                    jsonData.end = year + '-' + month + '-' + day;
                    if (tempArr[i].status == 'ACTIVE') {
                        jsonData.color = '#9418FF';
                    } else {
                        jsonData.color = 'orange';
                    }
                    jsonData.created = tempArr[i].createdAt;
                    events.push(jsonData);
                }
                setEvents(events);
            } catch (error) {
                console.log(error);
                alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
            }
        };

        getReservations().then();
    }, []);
    //???????????? ????????? ?????? API ??????
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
                alert('???????????? ?????? ??????. ????????? ?????? ??????????????????.');
            }
        };

        getPrograms().then();
    }, []);

    // ????????? ?????? - fields
    const tableFields = [
        {
            key: 'programId',
            _classes: 'font-weight-bold',
            label: '????????????',
            _style: { width: '120px' },
            filter: false,
            sorter: true,
        },
        {
            key: 'name',
            label: '???????????? ??????',
            filter: true,
            sorter: true,
        },
        tableEnterpriseAndProgramStatusField,
    ];

    // ????????? ??? onClick
    function onTableRowClick(item) {
        history.push(`/program/${item.programId}`);
    }

    // ?????? ?????? ?????? onClick
    function onDeleteButtonClick() {
        if (window.confirm('????????? ?????????????????????????')) {
            patchEnterpriseStatus(enterpriseId).then(() => {});
        }
    }

    // ?????? ?????? ?????? onClick
    function onCancleButtonClick() {
        if (window.confirm('????????? ????????? ?????????????????????????')) {
            cancleReservation(reservationId).then(() => {});
        }
    }
    // ?????? ?????? ?????? onClick
    function onRegistButtonClick() {
        if (window.confirm('????????? ????????? ?????????????????????????')) {
            registReservation(reservationId).then(() => {});
        }
    }

    // ???????????? ?????? ?????? onClick
    // function onDeleteProgramButtonClick() {
    //     if (window.confirm('????????? ?????????????????????????')) {
    //         patchProgramStatus(programId).then(() => {});
    //     }
    // }
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
            if (tag.length == 5) {
                alert('????????? 5??? ?????? ???????????? ??? ????????????.');
            } else {
                setTag([...tag, oneTag]);
            }
            // let jsonData = new Object()
            // jsonData.id = tag.length + 1
            // jsonData.text = oneTag
            // let testTag = jsonData
        },
        [tag],
    );

    // const handleDeleteP = useCallback(
    //     (i) => {
    //         setTagP(tagP.filter((onetagP, index) => index !== i));
    //     },
    //     [tagP],
    // );

    // const handleAdditionP = useCallback(
    //     (oneTagP) => {
    //         // let jsonData = new Object()
    //         // jsonData.id = tag.length + 1
    //         // jsonData.text = oneTag
    //         // let testTag = jsonData
    //         setTagP([...tagP, oneTagP]);
    //     },
    //     [tagP],
    // );
    const onChangeCategory = useCallback((e) => {
        let target = document.getElementById('categoryId');
        setCategoryId(target.options[target.selectedIndex].value);
    }, []);

    // const onChangeCheckInTime = useCallback((e) => {
    //     alert(e.target.value);
    // }, []);

    // const onChangeCheckOutTime = useCallback((e) => {
    //     alert(e.target.value);
    // }, []);

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
                        <TextCell label="?????? ????????????" value={enterpriseId} />
                        <TextCell
                            label="?????? ??????"
                            placeholder="?????? ????????? ??????????????????"
                            value={korName}
                            onChange={isEditing ? (e) => setKorName(e.target.value) : null}
                        />
                        <TextCell
                            label="?????? ??????"
                            placeholder="?????? ????????? ??????????????????"
                            value={engName}
                            onChange={isEditing ? (e) => setEngName(e.target.value) : null}
                        />
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">????????????</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <select
                                        id="categoryId"
                                        value={categoryId}
                                        onChange={onChangeCategory}
                                        style={{ width: '100px', height: '30px' }}
                                    >
                                        <option value="1">?????????</option>
                                        <option value="2">???????????????</option>
                                        <option value="3">????????????</option>
                                        <option value="4">???????????????</option>
                                    </select>
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">????????????</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <select
                                        id="categoryId"
                                        value={categoryId}
                                        onChange={onChangeCategory}
                                        disabled
                                        style={{ width: '100px', height: '30px' }}
                                    >
                                        <option value="1">?????????</option>
                                        <option value="2">???????????????</option>
                                        <option value="3">????????????</option>
                                        <option value="4">???????????????</option>
                                    </select>
                                </div>
                            </CFormGroup>
                        )}
                        <TextCell
                            label="????????????"
                            placeholder="??????????????? ??????????????????"
                            value={phoneNumber}
                            onChange={isEditing ? (e) => setPhoneNumber(e.target.value) : null}
                        />
                        <TextCell
                            label="????????????"
                            placeholder="??????????????? ??????????????????"
                            value={primeLocation}
                            onChange={isEditing ? (e) => setPrimeLocation(e.target.value) : null}
                        />
                        <TextCell
                            label="??????"
                            placeholder="????????? ??????????????????"
                            value={location}
                            onChange={isEditing ? (e) => setLocation(e.target.value) : null}
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
                        <TextCell
                            label="??????"
                            placeholder="????????? ??????????????????"
                            value={description}
                            onChange={isEditing ? (e) => setDescription(e.target.value) : null}
                        />
                        <TextCell label="?????????" value={createdAt} />
                        {isEditing ? (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">?????????</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <input type="file" accept="image/*" onChange={onFileChange} />
                                </div>
                            </CFormGroup>
                        ) : (
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">?????????</label>
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
                        {/* get backgroundColor(): string;
    get borderColor(): string; */}

                        <Modal
                            isOpen={modalIsOpenOne}
                            onRequestClose={closeModalOne}
                            style={customStyles}
                        >
                            <div>
                                <TextCell label="?????? ????????????" value={reservationId} />
                                <TextCell label="????????? ??????" value={name} />
                                <TextCell label="???????????? ??????" value={programName} />
                                <TextCell label="????????? ?????????" value={phoneNumberR} />
                                <TextCell label="????????? ??????" value={startDate} />
                                <TextCell label="???????????? ??????" value={endDate} />
                                <TextCell label="??????" value={price} />
                                <TextCell label="?????? ??????" value={reservationNumber} />
                                <TextCell label="?????? ??????" value={createdAtR} />
                                <TextCell label="?????? ??????" value={status} />
                            </div>
                            <BottomButtons
                                onCloseClick={closeModalOne}
                                onCancleClick={onCancleButtonClick}
                                onRegistClick={onRegistButtonClick}
                            />
                        </Modal>

                        <Modal
                            isOpen={modalIsOpenTwo}
                            onRequestClose={closeModalTwo}
                            style={customStyles}
                        >
                            <div>
                                <TextCell label="?????? ????????????" value={reservationId} />
                                <TextCell label="????????? ??????" value={name} />
                                <TextCell label="???????????? ??????" value={programName} />
                                <TextCell label="????????? ?????????" value={phoneNumberR} />
                                <TextCell label="????????? ??????" value={startDate} />
                                <TextCell label="???????????? ??????" value={endDate} />
                                <TextCell label="??????" value={price} />
                                <TextCell label="?????? ??????" value={reservationNumber} />
                                <TextCell label="?????? ??????" value={createdAtR} />
                                <TextCell label="?????? ??????" value={status} />
                            </div>
                            <BottomButtons
                                onCloseClick={closeModalTwo}
                                onCancleClick={onCancleButtonClick}
                            />
                        </Modal>

                        <div className="App">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                events={events}
                                nowIndicator
                                // eventClick={(e) => alert(e.event.id)}
                                eventClick={(e) =>
                                    manageReservation(e.event.id, e.event.backgroundColor)
                                }
                            />
                        </div>
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
                onPostClick={onPostProgramClick}
                onPatchClick={onPatchButtonClick}
                onDeleteClick={onDeleteButtonClick}
                patchLabel={isEditing ? '????????????' : '????????????'}
            />
        </CCol>
    );
};

export default Enterprise;
