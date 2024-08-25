import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    config.baseURL = 'http://localhost:5214/api'
    config.withCredentials = true
    config.headers.Authorization =
      '	eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQ5ODY4MDAsImlzcyI6IjIifQ.O_ossfSeF-L-vxKR0kmlpo8sNeBc9z4r4UX5IonkAhE'
    config.headers['Content-Type'] = 'application/json'

    return config
  },
  (e) => Promise.reject(e),
)

export default axios
