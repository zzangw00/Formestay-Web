import React from "react"
import {useHistory} from "react-router-dom"
import {TheContent, TheHeader, TheSidebar, TheFooter} from "./index"
import {checkLogin} from "../utils/session/sessionManager"

const TheLayout = () => {
  const history = useHistory()

  return (
    <div className="c-app c-default-layout">
      {checkLogin() || history.push("/login")}
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
