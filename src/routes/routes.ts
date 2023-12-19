const API_URL = import.meta.env.VITE_API_URL;

export const API = {
  postSignUp: API_URL + "/signup",
  postLogin: API_URL + "/signin",
  getUsers: API_URL + "/users",
  getAllPosts: API_URL + "/timeline",
  postComment: API_URL + "/comments",
  createPost: API_URL + "/timeline",
  getAllUserPosts: API_URL + "/timeline/",
  followOrUnfollow: API_URL + "/follow/",
  getFollowers: API_URL + "/followers/",
  getProfileId: API_URL + "/user",
  putProfileId: API_URL + "/user",
  deleteProfileId: API_URL + "/user",
  updatePassword: API_URL + "/user",
  getOtherUsersProfileById: API_URL + "/user/"
};

export function headersAuth() {
  let token: string | null = ""
  if (localStorage.token) {
    console.log("Ver aqui")
     token = localStorage.getItem("token");
     console.log('tokenn', token)
  }

  return {headers: {
      'Authorization': `Bearer ${token}`
  }}
}