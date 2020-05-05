export default (axios) => ({

  getSentence: (id) => { return axios.get(`/sentences/${id}/`) },

  getUserInfo: () => { return axios.get(`/users/info/`) },

  getCategories: () => { return axios.get(`/categories/`) },

  getArchives: () => { return axios.get(`/articles/archives`) },

  getProfiles: () => { return axios.get(`/articles/profiles`) },

  getMessages: () => { return axios.get(`/messages`) },

  getArticles: (params) => { return axios.get(`/articles`, { params }) },

  getArticleInfo: (id) => { return axios.get(`/articles/${id}/`) }

})
