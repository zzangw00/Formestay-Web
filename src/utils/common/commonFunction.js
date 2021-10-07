export const isEmpty = function (value) {
  return (value === "" || value === null || value === undefined || (typeof value === "object" && !Object.keys(value).length))
}

export function isValidEmail(email) {
  return email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
}

export function isValidPhoneNumber(phoneNumber) {
  return phoneNumber.match(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
}
