const juros_simples = (capital, taxa, tempo) => {
    const juros = capital * (taxa / 100) * tempo;
    const objretorno = {
        juros: juros,
        total: capital + juros
    }
    return objretorno;
}

module.exports = {juros_simples}
const juros_composto = (capital, taxa, tempo) => {
    const montante = capital * ((1 + taxa/100) ** tempo)
    const objretorno = {
        juros: montante - capital,
        total: montante

    }
    return objretorno;
}

module.exports = {juros_simples, juros_composto}