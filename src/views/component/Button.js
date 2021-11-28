import { CButton, CCol, CRow } from '@coreui/react';
import React from 'react';

// 뒤로가기 버튼
const BackButton = (props) => {
    const { label, onClick } = props;

    return (
        <CButton color="success" shape="square" size="m" onClick={onClick}>
            {label || '뒤로가기'}
        </CButton>
    );
};

// 닫기 버튼
const CloseButton = (props) => {
    const { label, onClick } = props;

    return (
        <CButton color="success" shape="square" size="m" onClick={onClick}>
            {label || '닫기'}
        </CButton>
    );
};

// 추가하기 버튼
const PostButton = (props) => {
    const { label, onClick } = props;

    return (
        <CButton color="success" shape="square" size="m" onClick={onClick}>
            {label || '프로그램 추가하기'}
        </CButton>
    );
};

// 가격 추가하기 버튼
const RoomPostButton = (props) => {
    const { label, onClick } = props;

    return (
        <CButton color="success" shape="square" size="m" onClick={onClick}>
            {label || '추가하기'}
        </CButton>
    );
};

// 수정하기 버튼
const PatchButton = (props) => {
    const { label, onClick } = props;

    return (
        <CButton color="primary" shape="square" size="m" onClick={onClick}>
            {label || '수정하기'}
        </CButton>
    );
};

// 삭제하기 버튼
const DeleteButton = (props) => {
    const { label, onClick } = props;

    return (
        <CButton color="danger" shape="square" size="m" onClick={onClick}>
            {label || '삭제하기'}
        </CButton>
    );
};

// 하단 버튼 모듈
const BottomButtons = (props) => {
    const {
        onBackClick,
        onPostClick,
        onPatchClick,
        onDeleteClick,
        backLabel,
        postLabel,
        patchLabel,
        deleteLabel,
        RoomPostLabel,
        onCloseClick,
        onRoomPostClick,
    } = props;

    return (
        <CRow>
            {onBackClick ? (
                <CCol align="left">
                    <BackButton label={backLabel} onClick={onBackClick} />
                </CCol>
            ) : (
                <p />
            )}
            {onCloseClick ? (
                <CCol align="left">
                    <CloseButton label={backLabel} onClick={onCloseClick} />
                </CCol>
            ) : (
                <p />
            )}
            <CCol align="right">
                {onRoomPostClick && (
                    <RoomPostButton label={RoomPostLabel} onClick={onRoomPostClick} />
                )}
                &nbsp;&nbsp;
                {onPostClick && <PostButton label={postLabel} onClick={onPostClick} />}
                &nbsp;&nbsp;
                {onPatchClick && <PatchButton label={patchLabel} onClick={onPatchClick} />}
                &nbsp;&nbsp;
                {onDeleteClick && <DeleteButton label={deleteLabel} onClick={onDeleteClick} />}
            </CCol>
            <br />
            <br />
            <br />
        </CRow>
    );
};

export default BottomButtons;
