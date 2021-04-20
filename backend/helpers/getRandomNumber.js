function getRandomNumber(len) {
    var out = []
    while (out.length < len) {
        var digit = Math.floor(Math.random() * 10)
        if (out.indexOf(digit) < 0) {
            if (digit || out.length) {
                out.push(digit)
            }
        }
    }
    return out.join('')
}

module.exports = getRandomNumber;