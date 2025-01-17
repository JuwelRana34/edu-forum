import React from 'react'
import { useParams } from 'react-router'

function Comments() {
    const {postId} = useParams()

  return (
    <div>Comments
        <h2>Post ID: {postId}</h2>
    </div>
  )
}

export default Comments