import React from 'react';
import { Redirect } from 'react-router-dom';
import { sessionGet } from './expirySession';
import { isEmpty } from '../common/commonFunction';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import usersData from '../../views/users/UsersData';

export function checkLogin() {
    if (!isEmpty(sessionGet('jwt'))) {
        const autoLogin = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_AUTO_LOGIN,
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    return false;
                }
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
            }
        };
        autoLogin().then();
        return true;
    }

    window.localStorage.clear();
    return false;
}

export function getJwt() {
    let jwt = window.localStorage.getItem('jwt');
    if (isEmpty(jwt)) {
        return;
    }
    return JSON.parse(jwt).value;
}

export function cleanUpSession() {
    window.localStorage.clear();
}
