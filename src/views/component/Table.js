import React from 'react';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
import { SizePerPageDropDown } from 'react-bootstrap-table';
import { itemsPerPage } from '../../constant/Constants';
import { cellStatusBadge, cellSnsIdBadge } from './Badge';
import { CButton } from '@coreui/react';

// tableField - 상태
export const tableStatusField = {
    key: 'status',
    label: '상태',
    _style: { width: '120px' },
    filter: false,
    sorter: true,
};

// tableField - 로그인 유형
export const tableSnsIdField = {
    key: 'snsId',
    label: '로그인 유형',
    _style: { width: '120px' },
    filter: false,
    sorter: true,
};

// tableField - 조회
export const tableGetField = {
    key: 'get',
    label: '',
    _style: { width: '120px' },
    filter: false,
    sorter: false,
};

// tableField - 수정
export const tablePatchField = {
    key: 'patch',
    label: '',
    _style: { width: '120px' },
    filter: false,
    sorter: false,
};

// tableField - 삭제
export const tableDeleteField = {
    key: 'delete',
    label: '',
    _style: { width: '120px' },
    filter: false,
    sorter: false,
};

// tableScopedSlot - 상태
export function tableStatusScopedSlot(status) {
    return (
        <td className="py-2" style={{ fontSize: '18px' }}>
            {cellStatusBadge(status)}
        </td>
    );
}

// tableScopedSlot - 로그인 유형
export function tableSnsIdScopedSlot(snsId) {
    return (
        <td className="py-2" style={{ fontSize: '18px' }}>
            {cellSnsIdBadge(snsId)}
        </td>
    );
}

// tableScopedSlot - 조회
export function tableGetScopedSlot(onClick) {
    return (
        <td className="py-2">
            <CButton color="success" variant="outline" shape="square" size="sm" onClick={onClick}>
                조회
            </CButton>
        </td>
    );
}

// tableScopedSlot - 수정
export function tablePatchScopedSlot(onClick) {
    return (
        <td className="py-2">
            <CButton color="primary" variant="outline" shape="square" size="sm" onClick={onClick}>
                수정
            </CButton>
        </td>
    );
}

// tableScopedSlot - 삭제
export function tableDeleteScopedSlot(onClick) {
    return (
        <td className="py-2">
            <CButton color="danger" variant="outline" shape="square" size="sm" onClick={onClick}>
                삭제
            </CButton>
        </td>
    );
}

// tableScopedSlots - 기본값
export const tableScopedSlots = {
    status: (item) => tableStatusScopedSlot(item.status),
    snsId: (item) => tableSnsIdScopedSlot(item.snsId),
};

// tablePagination - 기본값
export const tablePagination = {
    doubleArrows: true,
    align: 'center',
};

// tableFilter - 기본값
export function tableFilter(label, placeholder) {
    return {
        label: label,
        placeholder: placeholder,
    };
}

export const tableOptions = {
    sortIndicator: true,
    paginationSize: itemsPerPage,
    clearSearch: true,
    withFirstAndLast: true,
    clearSearchBtn: createCustomClearButton,
    sizePerPageDropDown: renderSizePerPageDropDown,
    paginationShowsTotal: renderShowsTotal,
};

export const tableCustomOptions = {
    sortIndicator: true,
    paginationSize: itemsPerPage,
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageDropDown: renderSizePerPageDropDown,
    clearSearchBtn: createCustomClearButton,
    paginationShowsTotal: renderShowsTotal,
};

export function renderShowsTotal(start, to, total) {
    return (
        <p style={{ color: 'black' }}>
            From {start} to {to}, totals is {total}&nbsp;&nbsp;
        </p>
    );
}

export function renderDate(cell, row, enumObject, rowIndex) {
    if (!cell) {
        return cell;
    }
    return <Moment format="YYYY.MM.DD HH:mm:ss">{cell}</Moment>;
}

export function renderMoney(cell, row, enumObject, rowIndex) {
    if (!cell) {
        return cell;
    }
    return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
}

// size per page start

/*
function onToggleDropDown(toggleDropDown) {
  // do your stuff here
  //console.log("toggle dropdown")
  //toggleDropDown()
}
 */

function renderSizePerPageDropDown(props) {
    return (
        <SizePerPageDropDown
            className="my-size-per-page"
            variation="dropup"
            {...props}
            //onClick={() => onToggleDropDown(props.toggleDropDown)}
        />
    );
}

// size per page end

// clear button custom start
function handleClearButtonClick(onClick) {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    // console.log("This is my custom function for ClearSearchButton click event")
    onClick();
}

function createCustomClearButton(onClick) {
    return (
        <Button
            className="my-custom-class ml-2"
            color="success"
            size="sm"
            onClick={(e) => handleClearButtonClick(onClick)}
        >
            초기화
        </Button>
    );
    // If you want have more power to custom the child of ClearSearchButton,
    // you can do it like following
    // return (
    //   <ClearSearchButton
    //     btnContextual="btn-warning"
    //     className="my-custom-class"
    //     onClick={ () => this.handleClearButtonClick(onClick) }>
    //     { ... }
    //   </ClearSearchButton>
    // )
}

// clear button custom end
