import React from 'react'

const Title = props => {
  return (
    <div className="text-center mt-5 mb-5">
      <h1>{props.main}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  )
}

export default Title
