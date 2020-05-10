export default (axios) => ({

  getSentence: (id) => { return axios.get(`/sentences/${id}/`) },

  getUserInfo: () => { return axios.get(`/users/info/`) },

  getCategories: () => { return axios.get(`/categories/`) },

  getArchives: () => { return axios.get(`/articles/archives`) },

  getProfiles: () => { return axios.get(`/articles/profiles`) },

  getMessages: () => { return axios.get(`/messages`) },

  getArticles: (params) => { return axios.get(`/articles`, { params }) },

  getArticleInfo: (id) => { return axios.get(`/articles/${id}/`) },

  getMobileCode: (data) => { return axios.post(`/utils/code/`, data) },

  register: (data) => { return axios.post(`/users/`, data) },

  login: (data) => { return axios.post('/utils/token/', data) },

  updateUserInfo: (id, data) => { return axios.put(`/users/${id}/`, data) },

  addMessage: (data) => { return axios.post(`/messages/`, data) },

  getComments: (params) => { return axios.get(`/comments/`, { params }) },

  addComment: (data) => { return axios.post(`/comments/`, data) },

  getReplies: (params) => { return axios.get(`/replies/`, { params }) },

  addReply: (data) => { return axios.post(`/replies/`, data) },

  getUserInfoById: (id) => { return axios.get(`/users/${id}`) }
})
