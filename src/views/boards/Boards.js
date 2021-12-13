import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import TempAdminApi, { EndPoint, HttpMethod } from '../../constant/TempAdminApi';
import { itemsPerPage } from '../../constant/Constants';
import { isEmpty } from '../../utils/common/commonFunction';
import {
    tableFilter,
    tablePagination,
    tableScopedSlots,
    tableStatusField,
} from '../component/Table';
import BottomButtons from '../component/Button';
import boardsData from './BoardsData';

// Import antd
import { Calendar } from 'antd';
import 'antd/dist/antd.css';

const Boards = () => {
    const history = useHistory();

    const [boards, setBoards] = useState([]);

    // 게시물 전체 조회 API 요청
    useEffect(() => {
        const getBoards = async () => {
            try {
                const { data: res } = await TempAdminApi.request({
                    method: HttpMethod.GET,
                    url: EndPoint.GET_BOARDS,
                });

                if (!res?.isSuccess || isEmpty(res?.result)) {
                    if (res?.code === 2002) {
                        history.push('/login');
                    } else {
                        alert(res.message);
                    }
                    return;
                }

                setBoards(res.result);
            } catch (error) {
                console.log(error);
                alert('네트워크 통신 실패. 잠시후 다시 시도해주세요.');
                setBoards(boardsData);
            }
        };

        getBoards().then();
    }, []);

    // 테이블 속성 - fields
    const tableFields = [
        {
            key: 'boardIdx',
            _classes: 'font-weight-bold',
            label: '고유번호',
            _style: { width: '120px' },
            filter: false,
            sorter: true,
        },
        {
            key: 'title',
            label: '제목',
            filter: true,
            sorter: true,
        },
        tableStatusField,
    ];

    // 테이블 셀 onClick
    function onTableRowClick(item) {
        history.push(`/boards/${item.boardIdx}`);
    }

    // 추가 버튼 onClick
    function onPostButtonClick() {
        history.push('/add-board');
    }

    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    return (
        <CCol>
            <CCard>
                <CCardBody align="center">
                    <CDataTable
                        items={boards}
                        fields={tableFields}
                        scopedSlots={tableScopedSlots}
                        hover
                        striped
                        sorter
                        onRowClick={onTableRowClick}
                        tableFilter={tableFilter('검색 :  ', '제목을 입력하세요')}
                        pagination={tablePagination}
                        itemsPerPage={itemsPerPage}
                    />
                </CCardBody>
            </CCard>
            <BottomButtons onPostClick={onPostButtonClick} />
        </CCol>
    );
};

export default Boards;
