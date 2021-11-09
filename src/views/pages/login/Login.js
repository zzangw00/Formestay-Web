import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { sessionSet } from '../../../utils/session/expirySession';
import TempAdminApi, { EndPoint, HttpMethod } from '../../../constant/TempAdminApi';
import { checkLogin } from '../../../utils/session/sessionManager';
import { isEmpty } from '../../../utils/common/commonFunction';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(checkLogin());

    const autoLogin = useCallback(() => {
        if (redirect) {
            history.push('/');
        }
    }, [history, redirect]);

    const onSubmitForm = useCallback(
        async (e) => {
            e.preventDefault();

            if (isEmpty(username.trim())) {
                alert('아이디를 입력해 주세요.');
                return;
            }

            if (isEmpty(password)) {
                alert('패스워드를 입력해 주세요.');
                return;
            }

            try {
                const { data: res } = await TempAdminApi.request({
                    data: {
                        email: username.trim(),
                        password: password,
                    },
                    method: HttpMethod.POST,
                    url: EndPoint.POST_ADMIN_LOGIN,
                });

                if (!res?.isSuccess || isEmpty(res?.result?.jwt)) {
                    alert(res?.message);
                    return;
                }

                sessionSet('jwt', res.result.jwt);
                setRedirect(true);
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
            }
        },
        [username, password],
    );

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            {autoLogin()}
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="6">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                placeholder="Username"
                                                autoComplete="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    onClick={onSubmitForm}
                                                >
                                                    Login
                                                </CButton>
                                            </CCol>
                                            {/*<CCol xs="6" className="text-right">*/}
                                            {/*  <CButton color="link" className="px-0">Forgot password?</CButton>*/}
                                            {/*</CCol>*/}
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            {/*<CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>*/}
                            {/*  <CCardBody className="text-center">*/}
                            {/*    <div>*/}
                            {/*      <h2>Sign up</h2>*/}
                            {/*      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut*/}
                            {/*        labore et dolore magna aliqua.</p>*/}
                            {/*      <Link to="/register">*/}
                            {/*        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>*/}
                            {/*      </Link>*/}
                            {/*    </div>*/}
                            {/*  </CCardBody>*/}
                            {/*</CCard>*/}
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;
