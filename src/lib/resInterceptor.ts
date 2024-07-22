import axios from 'axios'

axios.interceptors.response.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (e) => Promise.reject(e),
)

export default axios
