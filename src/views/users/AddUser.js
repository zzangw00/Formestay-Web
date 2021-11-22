import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { isEmpty } from '../../utils/common/commonFunction';
import { useHistory } from 'react-router-dom';
import { handleFirebaseUpload } from '../../utils/firebase/uploadFirebase';
import TextCell from '../component/cell/TextCell';
import TextareaCell from '../component/cell/TextareaCell';
import BottomButtons from '../component/Button';
import ImageCell from '../component/cell/ImageCell';

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
    const [isEditing, setIsEditing] = useState(false);
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

            if (!res?.isSuccess || isEmpty(res?.result)) {
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
        if (isEmpty(korName.trim())) {
            alert('한글 이름을 입력해주세요.');
        }
        if (isEmpty(engName.trim())) {
            alert('영어 이름을 입력해주세요.');
        }
        if (isEmpty(categoryId.trim())) {
            alert('카테고리를 입력해주세요.');
        }
        if (isEmpty(primeLocation.trim())) {
            alert('대표 주소를 입력해주세요.');
        }
        if (isEmpty(location.trim())) {
            alert('주소를 입력해주세요.');
        }
        if (isEmpty(tag.trim())) {
            alert('태그를 입력해주세요.');
        }
        if (isEmpty(description.trim())) {
            alert('설명을 입력해주세요.');
        }
        if (isEmpty(phoneNumber.trim())) {
            alert('번호를 입력해주세요.');
        }
        if (isEmpty(thumbnailURL.trim())) {
            alert('이미지를 넣어주세요.');
        }

        if (window.confirm('추가하시겠습니까?')) {
            const parameters = {
                korName: korName.trim(),
                engName: engName.trim(),
                categoryId: categoryId.trim(),
                primeLocation: primeLocation.trim(),
                location: location.trim(),
                tag: tag.trim(),
                description: description.trim(),
                phoneNumber: phoneNumber.trim(),
                thumbnailURL: thumbnailURL.trim(),
            };
            postUser(parameters).then();
        }
    }

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardBody>
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
                            <TextareaCell
                                label="내용"
                                placeholder="내용을 입력해주세요"
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                            />
                            <ImageCell
                                multiple
                                label="이미지"
                                src={imageURLs}
                                onChange={onImageChange}
                            />
                        </div>
                    </CCardBody>
                </CCard>
                <BottomButtons onPostClick={onPostButtonClick} />
            </CCol>
        </CRow>
    );
};

export default AddBoard;
