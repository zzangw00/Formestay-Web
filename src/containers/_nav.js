export default [
  {
    _tag: "CSidebarNavDropdown",
    name: "사용자 관리",
    route: "/users",
    icon: "cil-people",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "사용자 조회",
        to: "/users"
      },
      {
        _tag: "CSidebarNavItem",
        name: "사용자 추가",
        to: "/add-user"
      }
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "게시물 관리",
    route: "/boards",
    icon: "cil-notes",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "게시물 조회",
        to: "/boards"
      },
      {
        _tag: "CSidebarNavItem",
        name: "게시물 추가",
        to: "/add-board"
      }
    ]
  },
]
