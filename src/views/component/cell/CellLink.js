import {Link} from "react-router-dom"
import React from "react"

export function cellPartnerLink(cell, row, enumObject, rowIndex) {
  return (
    <Link to={`/partner/${row.partner_idx || row.idx}`}>
      {cell}
    </Link>
  )
}

export function cellUserLink(cell, row, enumObject, rowIndex) {
  return (
    <Link to={`/users/${row.user_idx || row.idx || row.userIdx}`}>
      {cell}
    </Link>
  )
}

export function cellProductLink(cell, row, enumObject, rowIndex) {
  return (
    <Link to={`/product/${row.product_idx || row.idx}`}>
      {cell}
    </Link>
  )
}

export function cellOrderLink(cell, row, enumObject, rowIndex) {
  return (
    <Link to={`/orders/${row.order_number}`}>
      {cell}
    </Link>
  )
}

export function cellOrderProductLink(cell, row, enumObject, rowIndex) {
  const orderProduct = `/orders/${row.order_number}/${row.order_list_number}`
  return (
    <Link to={orderProduct}>
      {cell}
    </Link>
  )
}

export function cellReviewLink(cell, row, enumObject, rowIndex) {
  return (
    <Link to={`/review/${row.idx}`}>
      내용보기
    </Link>
  )
}

export function cellQuestionLink(cell, row, enumObject, rowIndex) {
  return (
    <Link to={`/questions/${row.idx}`}>
      내용보기
    </Link>
  )
}

export function cellNoticeLink(cell, row, enumObject, rowIndex) {
  return (
    <Link to={`/notice/${row.idx}`}>
      {cell}
    </Link>
  )
}
