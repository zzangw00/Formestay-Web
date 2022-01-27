import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    CBreadcrumbRouter,
    CButton,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CSubheader,
    CToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import routes from '../routes';
import { cleanUpSession } from '../utils/session/sessionManager';

const TheHeader = () => {
    const env = process.env.NODE_ENV;
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state) => state.sidebarShow);

    const [info, setInfo] = useState(false);

    const history = useHistory();

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
        dispatch({ type: 'set', sidebarShow: val });
    };

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
        dispatch({ type: 'set', sidebarShow: val });
    };

    const logout = () => {
        //jwt 로컬스토리지에서 삭제
        cleanUpSession();

        //로그인 페이지로 이동
        history.push('/login');
    };

    return (
        <CHeader withSubheader style={{ background: env === 'production' ? 'white' : 'white' }}>
            <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
            <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
                <CIcon name="logo" height="48" alt="Logo" />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                <h1 style={{ color: '#9418FF', zIndex: 8 }}>
                    {env === 'production' ? 'Formestay' : 'Formestay'}
                </h1>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                <CButton color="info" to="/add-admin" className="mr-1">
                    관계자 추가
                </CButton>

                <CButton color="info" to="/change-password" className="mr-1">
                  비밀번호 변경
                </CButton>

                <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">
                    로그아웃
                </CButton>
                <CModal show={info} onClose={() => setInfo(!info)} color="info">
                    <CModalHeader closeButton>
                        <CModalTitle>확인</CModalTitle>
                    </CModalHeader>
                    <CModalBody>정말로 로그아웃 하시겠습니까?</CModalBody>
                    <CModalFooter>
                        <CButton color="info" onClick={logout}>
                            Logout
                        </CButton>{' '}
                        <CButton color="secondary" onClick={() => setInfo(!info)}>
                            취소
                        </CButton>
                    </CModalFooter>
                </CModal>
            </CHeaderNav>

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumbRouter
                    className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                    routes={routes}
                />
            </CSubheader>
        </CHeader>
    );
};

export default TheHeader;
