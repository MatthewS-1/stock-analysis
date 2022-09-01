import * as mysql from 'mysql'

const NASDAQ_API_KEY = "13DxjUqzFE3qbfXxyoEt"

interface stockJSON {
    quandl_error?: string,
    dataset_data?: any
}

interface stocksRow{
    id: number
    symbol: string
    data: string
}

function stockQuery(symbol: string, connection: mysql.Connection){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM stocks WHERE symbol='${symbol}'`, (error, results) => {
            if (error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

async function fetchNASDAQ(symbol: string, connection: mysql.Connection) {
    const res = await fetch(`https://data.nasdaq.com/api/v3/datasets/WIKI/${symbol}/data.json?api_key=${NASDAQ_API_KEY}`)
    const data = await res.json()
    connection.query(`INSERT INTO stocks (symbol, data) VALUES ('${symbol}', '${JSON.stringify(data)}')`)
    console.log(`successfully added ${symbol} into stock api db`)
    return data
}

async function fetchStockData(symbol: string, connection: mysql.Connection){
    try{
        var data: stockJSON = {}
        const results = await stockQuery(symbol, connection) as stocksRow[]
        if (results.length) {
            data = JSON.parse(results[0].data);
        } else {
            data = await fetchNASDAQ(symbol, connection)
        }
        return data
    } catch(error) {
        console.error(error)
    }
}

export {stockJSON, stockQuery, fetchNASDAQ, fetchStockData, NASDAQ_API_KEY}