import axios from 'axios'

class Http {
  instance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3001/',
      timeout: 5000
    })
  }
}
const http = new Http().instance
export default http
