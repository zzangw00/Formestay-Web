import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const AddAdmin = React.lazy(() => import('./views/admin/AddAdmin'));

const Admins = React.lazy(() => import('./views/admin/Admins'));

const Enterprises = React.lazy(() => import('./views/enterprises/Enterprises'));
const Enterprise = React.lazy(() => import('./views/enterprises/Enterprise'));
const AddEnterprise = React.lazy(() => import('./views/enterprises/AddEnterprise'));

const Program = React.lazy(() => import('./views/programs/Program'));
const AddProgram = React.lazy(() => import('./views/programs/AddProgram'));

const routes = [
    { path: '/users', exact: true, name: '회원 목록 조회', component: Users },
    { path: '/users/:userId', exact: true, name: '회원 상세 조회', component: User },

    { path: '/admins', exact: true, name: '업체 관계자 조회', component: Admins },

    { path: '/add-admin', exact: true, name: '관계자 추가', component: AddAdmin },

    { path: '/enterprises', exact: true, name: '업체 조회', component: Enterprises },
    {
        path: '/enterprises/:enterpriseId',
        exact: true,
        name: '업체 상세 조회',
        component: Enterprise,
    },
    { path: '/add-enterprise', exact: true, name: '업체 추가', component: AddEnterprise },

    {
        path: '/program/:programId',
        exact: true,
        name: '프로그램 상세 조회',
        component: Program,
    },

    {
        path: '/enterprise/:enterpriseId/add-program',
        exact: true,
        name: '프로그램 추가',
        component: AddProgram,
    },
];

export default routes;
