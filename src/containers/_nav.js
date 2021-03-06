export default [
    {
        _tag: 'CSidebarNavDropdown',
        name: '회원 관리',
        route: '/users',
        icon: 'cil-people',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '회원 조회',
                to: '/users',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '관계자 조회',
                to: '/admins',
            },
        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: '업체 관리',
        route: '/enterprises',
        icon: 'cil-notes',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '업체 조회',
                to: '/enterprises',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '업체 추가',
                to: '/add-enterprise',
            },
        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: '결제 관리',
        route: '/payments',
        icon: 'cil-notes',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '결제 이력 조회',
                to: '/payments',
            },
        ],
    },
];
