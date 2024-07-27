import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    config.baseURL = 'http://localhost:5214/api'
    config.withCredentials = true
    config.headers.Authorization =
      'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjIxMzU2MDAsImlzcyI6IjYifQ.6QaARNh6L8xaKWTCq9Sr_ghDl9UIboD0IovWQY1v9SU'
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (e) => Promise.reject(e),
)

export default axios
