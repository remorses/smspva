



const getPrefix = (country) => {
    const row = countries
        .filter(x => x[2].toLowerCase().includes(country.toLowerCase()))
    
    if (!row.length)
        return null

    return row[0][3]
}


module.exports = getPrefix

// const getCountry = require('./getCountry')

// const p = require('./prefixes.json')
// let countries = require('./countries.json')
// let res = []

// for (let o of p.countries) {
//     const row = countries
//         .filter(x => x[1].toLowerCase().includes(o.name.toLowerCase()))
//     if (row.length) res.push([
//         ...row[0],
//         o.code  
//     ])
// }


// console.log(res.length)
// console.log(countries.length)
// console.log(JSON.stringify(res, null, '\t'))