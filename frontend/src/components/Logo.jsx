import React from 'react'
import image1 from "../assets/logo.svg"

function Logo({width = '200px'}) {
  return (
    <div style={{width}}>
      <img src={image1} />
    </div>
  )
}

export default Logo;