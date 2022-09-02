import * as mysql from 'mysql'

const NEWS_API_KEY = "097ad8ad9e4a40a498a34e5a90c36440"
const NASDAQ_API_KEY = "13DxjUqzFE3qbfXxyoEt"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'casio1572f-105',
    database: 'stockdb'
})

export {NEWS_API_KEY, NASDAQ_API_KEY, connection}