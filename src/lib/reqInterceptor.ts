import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    config.baseURL = 'http://localhost:5214/api'
    config.withCredentials = true
    config.headers.Authorization =
      'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjIzMDg0MDAsImlzcyI6IjYifQ.28CvRGqluk6xBTP5iaYCl2faSp4spU93JHCjSI_ipJs'
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (e) => Promise.reject(e),
)

export default axios
