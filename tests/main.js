
const { createClient } = require('../src')
const { validate } = require('jsonschema')
const assert = require('assert').strict


if (!process.env.KEY) exit(1)

const pretty = data => console.log(JSON.stringify(data, null, '\t'))

const client = createClient({
    apikey: process.env.KEY,
    country: 'UK',
    service: 'instagram'
})


it('gets balance', async () => {
    const { balance } = await client.getBalance()
    console.log('balance is ' + balance)
    Number(balance)
    assert.ok(balance)
})

it('gets avaliability', async() => {
    const data = await client.getAvailability('UK')
    assert.ok(validate({
        type: 'object',
        required: [
            'service',
            'online',
            'total',
            'country'
        ]
    }, data).valid)
    const { online } = data
    console.log('there are ' + online + ' numbers available')
})


// it('gets a number', async () => {
//     const { number, id } = await client.getNumber('UK')
//     assert.ok(number)
//     assert.ok(id)
//     console.log(number, id)
// })


it('gets the price', async () => {
    const { price, } = await client.getPrice()
    assert.ok(price)
    console.log(Number(price), 'dollars')
})