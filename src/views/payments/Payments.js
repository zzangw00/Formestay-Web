import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { itemsPerPage } from '../../constant/Constants';
import { isEmpty } from '../../utils/common/commonFunction';
import { tablePagination, tableScopedSlots } from '../component/Table';
import BottomButtons from '../component/Button';

const Payments = () => {
    const history = useHistory();
    const [payments, setPayments] = useState([]);

    // 관계자 전체 조회 API 요청
    useEffect(() => {
        const getPayments = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_PAYMENTS,
                });
                console.log(res);
                if (!res?.isSuccess) {
                    if (res?.code === 2002) {
                        history.push('/users');
                    } else {
                        alert(res.message);
                    }
                    return;
                }
                setPayments(res.result);
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
            }
        };

        getPayments().then();
    }, []);

    // 테이블 속성 - fields
    const tableFields = [
        {
            key: 'paymentHistoryId',
            _classes: 'font-weight-bold',
            label: '고유번호',
            _style: { width: '120px' },
            filter: false,
            sorter: true,
        },
        {
            key: 'korName',
            label: '업체 명',
            filter: true,
            sorter: true,
        },
        {
            key: 'programName',
            label: '프로그램 명',
            filter: true,
            sorter: true,
        },
        {
            key: 'name',
            label: '예약자 명',
            filter: true,
            sorter: true,
        },
        {
            key: 'phoneNumber',
            label: '연락처',
            filter: true,
            sorter: true,
        },
        {
            key: 'startDate',
            label: '시작일',
            filter: true,
            sorter: true,
        },
        {
            key: 'endDate',
            label: '종료일',
            filter: true,
            sorter: true,
        },
        {
            key: 'price',
            label: '가격',
            filter: true,
            sorter: true,
        },
        {
            key: 'createdAt',
            label: '결제일',
            filter: false,
            sorter: true,
        },
    ];

    return (
        <CCol>
            <CCard>
                <CCardBody align="center">
                    <CDataTable
                        items={payments}
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

export default Payments;
