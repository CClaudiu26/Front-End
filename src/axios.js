import axios from 'axios'

const instance = axios.create ({
        baseURL: ' https://dir-backend.herokuapp.com',
})

export default instance