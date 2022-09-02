import express, {Express, Request, Response} from 'express';
import {connection} from './config'
import {fetchStockData, stockJSON} from './stock'
import { fetchNewsData, newsResponse } from './news';

const app = express()

connection.connect((err) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log("Successfully connected to stockdb")
    }
})

const isAlphaNumeric = (str: string) => /^[a-z0-9]+$/i.test(str)

app.get('/stocks/:symbol', (req: Request, res: Response) => {
    const symbol = req.params.symbol
    if (!isAlphaNumeric(symbol)){
        return res.status(400).send("symbol should be alpha-numeric")
    }
    fetchStockData(symbol, connection).then(
        (data?: stockJSON) => {
            data = data as stockJSON
            if (data == null){
                res.status(500).send("failed to fetch stock data internally")
            } else {
                if (data.quandl_error){
                    res.status(400).send(data.quandl_error)
                } else {
                    res.send(data.dataset_data!.data)
                }
            }
        }
    ).catch(
        (error) => {
            res.status(400).send(error)
            console.log(error)
        }
    )
})

app.get('/news/:symbol', (req: Request, res: Response) => {
    const symbol = req.params.symbol
    if (!isAlphaNumeric(symbol)){
        return res.status(400).send("symbol should be alpha-numeric")
    }
    fetchNewsData(symbol, connection).then(
        (data?: newsResponse) => {
            if (data == null){
                res.status(500).send("failed to news data internally")
            } else {
                res.send(data)
            }
        }
    ).catch(
        (error) => {
            res.status(400).send(error)
            console.log(error)
        }
    )
})

app.listen(4000, () => {console.log("Server has started")})