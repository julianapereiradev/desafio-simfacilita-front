const API_URL = import.meta.env.VITE_API_URL;

export const API = {
    postSignUp: API_URL + '/signup',
    postLogin: API_URL + '/signin',
    getUsers: API_URL + '/users',
    getAllPosts: API_URL + '/timeline',
    postComment: API_URL + '/comments',
    createPost: API_URL + '/timeline',
    getAllUserPosts: API_URL + '/timeline/'
}
