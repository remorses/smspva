
const { createClient } = require('../src')
const { validate } = require('jsonschema')
const { log, sleep } = require('./support')
const assert = require('assert').strict


if (!process.env.KEY) throw ''

const pretty = data => console.log(JSON.stringify(data, null, '\t'))

const client = createClient({
    apikey: process.env.KEY,
    country: 'UK',
    service: 'instagram'
})


it('gets balance', async () => {
    const balance = await client.getBalance()
    console.log('balance is ' + balance)
    // assert.ok(balance)
})

it('gets avaliability', async() => {
    const online = await client.getAvailability('UK')
    console.log('there are ' + online + ' numbers available')
})


it.skip('gets a number and sms with waitSms', async () => {
    const { number, id } = await client.getNumber('UK')
    assert.ok(number)
    assert.ok(id)
    console.log(number, id)
    const code = await client.waitSms(id, console.log)
    console.log(code)
    assert.ok(code)
})

it('gets a existing number', async () => {
    log(await client.getBalance())
    assert.ok(process.env.existing_number)
    const data = await client.getExistingNumber(process.env.existing_number)
    log(data)
    await sleep(200)
    log(await client.getBalance())
    log(await client.denial(data.id))
    await sleep(200)
    log(await client.getBalance())
})


it('gets the price', async () => {
    const price = await client.getPrice()
    assert.ok(price)
    console.log(price, 'dollars')
})

it('getPrefix', () => {
    assert.deepEqual(require('../src/getPrefix')('UK'), '+44')
})



// it('wait sms', () => client.waitSms(9))