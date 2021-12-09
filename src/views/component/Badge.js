import React from 'react';
import { CBadge } from '@coreui/react';

function getStatusBadgeColor(status) {
    switch (status) {
        case 'ACTIVE':
            return 'success';
        case 'DEACTIVATE':
            return 'secondary';
        case 'INACTIVE':
            return 'danger';
        default:
            return 'primary';
    }
}

function getStatusBadgeText(status) {
    switch (status) {
        case 'ACTIVE':
            return '활성';
        case 'DEACTIVATE':
            return '비활성';
        case 'INACTIVE':
            return '탈퇴';
        default:
            return '';
    }
}

function getDeleteBadgeColor(status) {
    switch (status) {
        case 'ACTIVE':
            return 'success';
        case 'DEACTIVATE':
            return 'secondary';
        case 'INACTIVE':
            return 'danger';
        default:
            return 'primary';
    }
}

function getDeleteBadgeText(status) {
    switch (status) {
        case 'ACTIVE':
            return '활성';
        case 'DEACTIVATE':
            return '비활성';
        case 'INACTIVE':
            return '삭제';
        default:
            return '';
    }
}

function getSnsIdBadgeColor(snsId) {
    switch (snsId) {
        case 0:
            return 'light';
        default:
            return 'warning';
    }
}

function getSnsIdBadgeText(snsId) {
    switch (snsId) {
        case 0:
            return '일반';
        default:
            return '카카오';
    }
}

export function cellStatusBadge(status) {
    return <CBadge color={getStatusBadgeColor(status)}>{getStatusBadgeText(status)}</CBadge>;
}

export function cellDeleteBadge(status) {
    return <CBadge color={getDeleteBadgeColor(status)}>{getDeleteBadgeText(status)}</CBadge>;
}

export function cellSnsIdBadge(snsId) {
    return <CBadge color={getSnsIdBadgeColor(snsId)}>{getSnsIdBadgeText(snsId)}</CBadge>;
}
