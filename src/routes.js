import React from "react"

const Users = React.lazy(() => import("./views/users/Users"))
const User = React.lazy(() => import("./views/users/User"))
const AddUser = React.lazy(() => import("./views/users/AddUser"))

const Boards = React.lazy(() => import("./views/boards/Boards"))
const Board = React.lazy(() => import("./views/boards/Board"))
const AddBoard = React.lazy(() => import("./views/boards/AddBoard"))

const routes = [
  { path: "/users", exact: true,  name: "사용자 목록 조회", component: Users },
  { path: "/users/:userIdx", exact: true, name: "사용자 상세 조회", component: User },
  { path: "/add-user", exact: true, name: "사용자 추가", component: AddUser },

  { path: "/boards", exact: true,  name: "게시물 목록 조회", component: Boards },
  { path: "/boards/:boardIdx", exact: true, name: "게시물 상세 조회", component: Board },
  { path: "/add-board", exact: true, name: "게시물 추가", component: AddBoard },
]

export default routes
