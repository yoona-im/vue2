import axios from 'axios';

const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    }) 
}
export default {
    post
}