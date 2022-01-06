import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { itemsPerPage } from '../../constant/Constants';
import { isEmpty } from '../../utils/common/commonFunction';
import {
    tablePagination,
    tableScopedSlots,
    tableStatusField,
    tableSnsIdField,
} from '../component/Table';
import BottomButtons from '../component/Button';

const Admins = () => {
    const history = useHistory();
    const [admins, setAdmins] = useState([]);

    // 관계자 전체 조회 API 요청
    useEffect(() => {
        const getAdmins = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_ADMINS,
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    alert(res.message);
                    history.push('/users');
                    return;
                }
                setAdmins(res.result);
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
            }
        };

        getAdmins().then();
    }, []);

    // 테이블 속성 - fields
    const tableFields = [
        {
            key: 'adminId',
            _classes: 'font-weight-bold',
            label: '고유번호',
            _style: { width: '120px' },
            filter: false,
            sorter: true,
        },
        {
            key: 'enterpriseId',
            _classes: 'font-weight-bold',
            label: '업체 고유번호',
            _style: { width: '120px' },
            filter: true,
            sorter: true,
        },
        {
            key: 'nickname',
            label: '닉네임',
            filter: true,
            sorter: true,
        },
        {
            key: 'email',
            label: '이메일',
            filter: true,
            sorter: true,
        },
    ];

    return (
        <CCol>
            <CCard>
                <CCardBody align="center">
                    <CDataTable
                        items={admins}
                        fields={tableFields}
                        scopedSlots={tableScopedSlots}
                        hover
                        striped
                        sorter
                        columnFilter
                        pagination={tablePagination}
                        itemsPerPage={itemsPerPage}
                    />
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default Admins;
