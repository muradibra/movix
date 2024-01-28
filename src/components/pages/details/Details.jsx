import React from 'react'
import { useParams } from 'react-router-dom'

function Details() {
  const { type, id } = useParams()

  return (
    <div className='details'>Detail</div>
  )
}

export default Details