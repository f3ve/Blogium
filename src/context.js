import React from 'react'

const Context = React.createContext({
  posts: [],
  users: [],
  comments: [],
  activeUser: {},
  error: null,
  setActiveUser: () => {},
  clearActiveUser: () => {},
  setError: () => {},
  clearError: () => {},
  setPosts: () => {}
})

export default Context
