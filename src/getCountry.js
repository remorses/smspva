const countries = require('./countries.json')

const getCountryCode = (country) => {
    const row = countries
        .filter(x => x[1].toLowerCase().includes(country.toLowerCase()))
    
    if (!row.length)
        return null

    return row[0][2]
}

const isCode = code => {
    if (countries.map(x => x[2]).includes(code))
        return true
    else
        return false
}

module.exports = x => isCode(x) ? x : getCountryCode(x)