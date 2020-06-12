import React from 'react'

const Context = React.createContext({
  posts: [],
  users: [],
  comments: [],
  activeUser: {},
  error: null,
  editPost: {},
  setActiveUser: () => {},
  clearActiveUser: () => {},
  setEditPost: () => {},
  clearEditPost: () => {},
  setError: () => {},
  clearError: () => {},
  setPosts: () => {}
})

export default Context
