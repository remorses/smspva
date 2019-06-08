
const url = require('url')
const fetch = require('node-fetch')
const getCountry = require('./getCountry')
const getService = require('./getService')

const toJson = async (data) => {
    text = await data.text()
    try {
        return JSON.parse(text)
    } catch {
        return { message: text }
    }
}


const raise = data => {
    const res = data.response
    if (!res && res !== 1 && res !== 'ok' && res !== '1') {
        throw Error(data)
    }
    return data
}

const sleep = time =>  new Promise((res, rej) => setTimeout(() => res(null), time * 1000))

const createClient = ({
    apikey,
    service = 'instagram',
    country = 'UK',
}) => {
    _country = country
    service = getService(service)

    const defaults = {
        protocol: 'http',
        hostname: 'smspva.com',
        pathname: '/priemnik.php',
    }

    let client =  {
        getBalance: () => {
            return fetch(
                url.format({
                    ...defaults,
                    query: {
                        metod: 'get_balance',
                        service,
                        apikey,
                    }
                }),
            ).then(toJson).then(raise)
        },
        getNumber: (country = _country) => {
            return fetch(
                url.format({
                    ...defaults,
                    query: {
                        metod: 'get_number',
                        country: getCountry(country),
                        service,
                        apikey,
                    }
                }),
            ).then(toJson).then(raise)
        },
        getSms: (id, country = _country) => {
            return fetch(
                url.format({
                    ...defaults,
                    query: {
                        metod: 'get_sms',
                        country: getCountry(country),
                        service,
                        id,
                        apikey,
                    }
                }),
            ).then(toJson).then(raise)
        },
        denial: (id, country = _country) => {
            return fetch(
                url.format({
                    ...defaults,
                    query: {
                        metod: 'denial',
                        country: getCountry(country),
                        id,
                        service,
                        apikey,
                    }
                }),
            ).then(toJson).then(raise)
        },
        getAvailability: (country = _country) => {
            return fetch(
                url.format({
                    ...defaults,
                    query: {
                        metod: 'get_count_new',
                        country: getCountry(country),
                        service,
                        apikey,
                    }
                }),
            ).then(toJson)//.then(raise)
        },
        ban: (id) => {
            return fetch(
                url.format({
                    ...defaults,
                    query: {
                        metod: 'ban',
                        id,
                        service,
                        apikey,
                    }
                }),
            ).then(toJson)//.then(raise)
        },
        
        getPrice: () => {
            return fetch(
                url.format({
                    ...defaults,
                    query: {
                        metod: 'get_service_price',
                        service,
                        apikey,
                    }
                }),
            ).then(toJson)//.then(raise)
        },
    }

    client.waitSms = async id => {
        let waited = 0 // seconds
        while(1) {
            let { sms } = await client.getSms(id)
            if (sms) return sms
            await sleep(20)
            waited += 20
            if (waited > 11 * 60) {
                throw Error('sms not received, after 10 minutes smspva stops searching')
            }
        }
        
    }
    return client
}

module.exports = { createClient, }

