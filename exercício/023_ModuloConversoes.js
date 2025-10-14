const celcius_para_fahrenheit = (celcius) => {
    return (celcius * 1.8) + 32;
}

const quilometros_para_milhas = (quilometros) => {
    return quilometros / 1.6;
}

module.exports = {celcius_para_fahrenheit, quilometros_para_milhas};
