const fetch = require('cross-fetch')
const instance = {
    baseURL: 'https://ipapi.co/',
    get(path) {
        return fetch(`${this.baseURL}${path}`)
            .then(resp => resp.json())
    }
}

const ip = {
    async local() {
        return instance.get('json')
    },

    async source(address) {
        if (!address) {
            throw new Error('address should not be empty.')
        }
        return instance.get(`${address}/json`)
    }
}

module.exports = ip 