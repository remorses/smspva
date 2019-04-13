const services = require('./services.json')

const getServiceCode = (service) => {
    const row = services
        .filter(x => x[1].toLowerCase().includes(service.toLowerCase()))
    
    if (!row.length)
        return null

    return row[0][2]
}

const isCode = code => {
    if (services.map(x => x[2]).includes(code))
        return true
    else
        return false
}

module.exports = x => isCode(x) ? x : getServiceCode(x)

