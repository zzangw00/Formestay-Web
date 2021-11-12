import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { itemsPerPage } from '../../constant/Constants';
import { isEmpty } from '../../utils/common/commonFunction';
import { tablePagination, tableScopedSlots, tableStatusField } from '../component/Table';
import BottomButtons from '../component/Button';

const Enterprises = () => {
    const history = useHistory();
    const [enterprises, setEnterprises] = useState([]);

    // 사용자 전체 조회 API 요청
    useEffect(() => {
        const getEnterprises = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_ENTERPRISES,
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    if (res?.code === 2002) {
                        history.push('/login');
                    } else {
                        alert(res.message);
                    }
                    return;
                }

                setEnterprises(res.result);
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
            }
        };

        getEnterprises().then();
    }, []);

    // 테이블 속성 - fields
    const tableFields = [
        {
            key: 'enterpriseId',
            _classes: 'font-weight-bold',
            label: '고유번호',
            _style: { width: '120px' },
            filter: false,
            sorter: true,
        },
        {
            key: 'korName',
            label: '한글 이름',
            filter: true,
            sorter: true,
        },
        {
            key: 'engName',
            label: '영어 이름',
            filter: true,
            sorter: true,
        },
        {
            key: 'primeLocation',
            label: '대표 위치',
            filter: true,
            sorter: true,
        },
        tableStatusField,
    ];

    // 테이블 셀 onClick
    function onTableRowClick(item) {
        history.push(`/enterprises/${item.enterpriseId}`);
    }

    return (
        <CCol>
            <CCard>
                <CCardBody align="center">
                    <CDataTable
                        items={enterprises}
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
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default Enterprises;
