import * as mysql from 'mysql'
import {classify} from './classifier/classifier'
import { NEWS_API_KEY } from './config'

const UPDATE_WHEN = 10800000 // time in milliseconds to wait until a new NewsAPI call

interface newsJSON {
    status?: string,
    totalResults?: number,
    articles?: any[]
}

interface newsRow{
    id: number
    symbol: string
    data: string
    sentiment: number
    unix_timestamp: number
}

interface newsResponse{
    sentiment: number
    data: newsJSON
}

function newsQuery(symbol: string, connection: mysql.Connection){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM news WHERE symbol='${symbol}' ORDER BY id DESC LIMIT 1`, (error, results) => {
            if (error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

async function fetchNews(symbol: string, connection: mysql.Connection): Promise<newsResponse> {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${symbol}&sortBy=relevance&apiKey=${NEWS_API_KEY}`)
    const data = await res.json()
    const sentiment = await classify(data.articles)
    connection.query(`INSERT INTO news (symbol, data, sentiment, unix_timestamp) VALUES ('${symbol}', ${mysql.escape(JSON.stringify(data))}, ${sentiment}, ${Date.now()})`)
    console.log(`successfully added ${symbol} into news api db`)
    return {sentiment: sentiment, data: data}
}

async function fetchNewsData(symbol: string, connection: mysql.Connection) {
    try{
        var data: newsResponse
        const results = await newsQuery(symbol, connection) as newsRow[]
        if (results.length && Date.now() - results[0].unix_timestamp < UPDATE_WHEN) {
            data = {sentiment: results[0].sentiment, data: JSON.parse(results[0].data)};
        } else {
            data = await fetchNews(symbol, connection)
        }
        return data
    } catch(error) {
        console.error(error)
    }
}

export {newsJSON, newsRow, newsResponse, newsQuery, fetchNews, fetchNewsData}