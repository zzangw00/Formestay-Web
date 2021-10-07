import React from "react"
import {CBadge} from "@coreui/react"

function getStatusBadgeColor(status) {
  switch (status) {
    case "ACTIVE":     return "success"
    case "DEACTIVATE": return "secondary"
    case "INACTIVE":   return "danger"
    default:           return "primary"
  }
}

function getStatusBadgeText(status) {
  switch (status) {
    case "ACTIVE":     return "활성"
    case "DEACTIVATE": return "비활성"
    case "INACTIVE":   return "탈퇴"
    default:           return ""
  }
}

export function cellStatusBadge(status) {
  return (
    <CBadge color={getStatusBadgeColor(status)}>{getStatusBadgeText(status)}</CBadge>
  )
}
