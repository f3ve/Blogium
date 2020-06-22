import TokenService from "./token-service";
import config from "../config";

const PostsApiService = {
  getPosts() {
    return fetch(`${config.API_BASE_URL}/posts`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getPost(id) {
    return fetch(`${config.API_BASE_URL}/posts/${id}`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getDrafts() {
    return fetch(`${config.API_BASE_URL}/posts/drafts`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getComments(postId) {
    return fetch(
      `${config.API_BASE_URL}/posts/${postId}/comments`
    ).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getUser(id) {
    return fetch(`${config.API_BASE_URL}/users/${id}`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getUsersPosts(userId) {
    return fetch(`${config.API_BASE_URL}/users/${userId}/posts`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postPost(post) {
    return fetch(`${config.API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(post),
    });
  },

  postComment(comment) {
    return fetch(`${config.API_BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(comment),
    });
  },

  patchPost(post, postId) {
    return fetch(`${config.API_BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(post),
    });
  },

  patchUser(user, userId) {
    return fetch(`${config.API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteUser(userId) {
    return fetch(`${config.API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "content-ty{pe": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
  },

  deletePost(postId) {
    return fetch(`${config.API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
  },

  deleteComment(cId) {
    return fetch(`${config.API_BASE_URL}/comments/${cId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
  },
};

export default PostsApiService;
