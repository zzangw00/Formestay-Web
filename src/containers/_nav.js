export default [
  {
    _tag: "CSidebarNavDropdown",
    name: "회원 관리",
    route: "/users",
    icon: "cil-people",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "회원 조회",
        to: "/users",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "예약 관리",
    route: "/boards",
    icon: "cil-notes",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "예약 조회",
        to: "/boards",
      },
      {
        _tag: "CSidebarNavItem",
        name: "게시물 추가",
        to: "/add-board",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "업체 관리",
    route: "/boards",
    icon: "cil-notes",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "업체 등록",
        to: "/boards",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "결제 관리",
    route: "/boards",
    icon: "cil-notes",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "결제 이력 조회",
        to: "/boards",
      },
    ],
  },
];
