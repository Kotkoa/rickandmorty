import React from "react"
import { useSelector } from "react-redux"

function Selection() {
  const hideDisplay = useSelector((store) => store.account.bodyShow)
  return (
<div className={`${hideDisplay === "hideFavo" ? "hideWindow" : "containerSelection"}`}>some text</div>
  )
}

export default Selection
