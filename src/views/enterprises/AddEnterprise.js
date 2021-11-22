import React, { useState, useCallback } from 'react';
import { CCard, CCardBody, CCol, CRow, CFormGroup } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty, isValidPhoneNumber } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import { handleFirebaseUpload } from '../../utils/firebase/uploadFirebase';
import TextCell from '../component/cell/TextCell';
import TextareaCell from '../component/cell/TextareaCell';
import BottomButtons from '../component/Button';
import { WithContext as ReactTags } from 'react-tag-input';
import tagStyles from '../../scss/tag.scss';

const AddEnterprise = () => {
    const history = useHistory();
    const [korName, setKorName] = useState('');
    const [engName, setEngName] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primeLocation, setPrimeLocation] = useState('');
    const [location, setLocation] = useState('');
    const [tag, setTag] = useState([]);
    const [description, setDescription] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [file, setFile] = useState(null);

    // 사용자 추가 API 요청
    async function postEnterprise(parameters) {
        try {
            const { data: res } = await TempAdminApi.request({
                method: HttpMethod.POST,
                url: EndPoint.POST_ENTERPRISE,
                data: parameters,
            });

            if (!res?.isSuccess) {
                alert(res.message);
                return;
            }

            alert('업체 추가에 성공하였습니다.');
            history.go(0);
        } catch (error) {
            console.log(error);
            alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
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
            alert('대표 주소를 입력해주세요.');
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
        if (isEmpty(thumbnailURL.trim())) {
            alert('이미지를 넣어주세요.');
            return;
        }

        if (window.confirm('추가하시겠습니까?')) {
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
            postEnterprise(parameters).then();
        }
    }

    const onChangeCategory = useCallback((e) => {
        let target = document.getElementById('categoryId');
        setCategoryId(target.options[target.selectedIndex].value);
    }, []);

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
            'enterprise',
            theFile.name,
            event.target.files[0],
        );
        setThumbnailURL(firebaseURL);
    }, []);

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
                                label="한글 이름"
                                placeholder="한글 이름을 입력해주세요"
                                value={korName}
                                onChange={(e) => setKorName(e.target.value)}
                            />
                            <TextCell
                                label="영어 이름"
                                placeholder="영어 이름을 입력해주세요"
                                value={engName}
                                onChange={(e) => setEngName(e.target.value)}
                            />
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="category">카테고리</label>
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
                            <TextCell
                                label="대표 주소"
                                placeholder="대표 주소를 입력해주세요"
                                value={primeLocation}
                                onChange={(e) => setPrimeLocation(e.target.value)}
                            />
                            <TextCell
                                label="주소"
                                placeholder="주소를 입력해주세요"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
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
                            <TextareaCell
                                label="설명"
                                placeholder="설명을 입력해주세요"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextCell
                                label="전화번호"
                                placeholder="전화번호를 입력해주세요"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <CFormGroup row>
                                <CCol md="2" align="right">
                                    <label name="thumbnailImg">이미지</label>
                                </CCol>
                                <div style={{ marginLeft: '15px' }}>
                                    <input type="file" accept="image/*" onChange={onFileChange} />
                                </div>
                            </CFormGroup>
                        </div>
                    </CCardBody>
                </CCard>
                <BottomButtons onPostClick={onPostButtonClick} />
            </CCol>
        </CRow>
    );
};

export default AddEnterprise;
