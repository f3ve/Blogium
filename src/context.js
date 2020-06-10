import React from 'react'

const Context = React.createContext({
  posts: [],
  users: [],
  comments: [],
  activeUser: {},
  error: null,
  setActiveUser: () => {},
  setError: () => {},
  clearError: () => {},
  setPosts: () => {}
})

export default Context
