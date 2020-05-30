import React from 'react'

const Context = React.createContext({
  posts: [],
  users: [],
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setPosts: () => {}
})

export default Context
