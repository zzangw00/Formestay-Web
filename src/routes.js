import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const Boards = React.lazy(() => import('./views/boards/Boards'));
const Board = React.lazy(() => import('./views/boards/Board'));
const AddBoard = React.lazy(() => import('./views/boards/AddBoard'));
const AddAdmin = React.lazy(() => import('./views/admin/AddAdmin'));

const Enterprises = React.lazy(() => import('./views/enterprises/Enterprises'));
const Enterprise = React.lazy(() => import('./views/enterprises/Enterprise'));
const AddEnterprise = React.lazy(() => import('./views/enterprises/AddEnterprise'));

const routes = [
    { path: '/users', exact: true, name: '회원 목록 조회', component: Users },
    { path: '/users/:userId', exact: true, name: '회원 상세 조회', component: User },

    { path: '/boards', exact: true, name: '게시물 목록 조회', component: Boards },
    { path: '/boards/:boardIdx', exact: true, name: '게시물 상세 조회', component: Board },

    { path: '/add-admin', exact: true, name: '관리자 추가', component: AddAdmin },

    { path: '/enterprises', exact: true, name: '업체 조회', component: Enterprises },
    {
        path: '/enterprises/:enterpriseId',
        exact: true,
        name: '업체 상세 조회',
        component: Enterprise,
    },
    { path: '/add-enterprise', exact: true, name: '업체 추가', component: AddEnterprise },
];

export default routes;
