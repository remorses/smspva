


exports.log = x => console.log(JSON.stringify(x, null, '\t'))

exports.sleep = ms => Promise((res) => setTimeout(()=> res(true)), ms)