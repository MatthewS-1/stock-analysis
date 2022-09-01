import {
    Badge,
    Box,
    Button, Flex, Input, Skeleton, SkeletonText, Spinner, Table, TableCaption, TableContainer, Text, Tr, Th, Tbody, Td,
    Thead,
    VStack
} from "@chakra-ui/react";
import React, { createContext, JSXElementConstructor, ReactElement, useContext, useEffect, useState } from "react";
import { SymbolContext } from './Search';
import {} from '../'

interface newsResponse {
    sentiment: number
    data: newsJSON
}

interface newsJSON {
    status?: string,
    totalResults?: number,
    articles?: article[]
}

interface article {
    source: {
        id?: any,
        name?: string
    }
    author: string
    title: string
    url: string
    urlToImage: string
    publishedAt: string
    conent: string
}

export const News = () => {
    const symbol = useContext(SymbolContext)
    const [loaded, setLoaded] = useState(true)
    const [sentiment, setSentiment] = useState<number>()
    const [news, setNews] = useState<newsJSON>()

    const validSymbol = async () => {
        if (symbol) {
            const res = await fetch(`/stocks/${symbol}`)
            if (res.status === 200) {
                return true
            }
        }
        return false
    }

    const fetchData = async () => {
        if (await validSymbol()) {
            setLoaded(false)
            const res = await fetch(`/news/${symbol}`)
            if (res.status === 200) {
                const data = await res.json() as newsResponse
                setSentiment(data.sentiment)
                setNews(data.data)
            }
            setLoaded(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [symbol])

    const sentimentColor = () => {
        if (sentiment) {
            const red = 125 * (1 - sentiment)
            const green = 125 * (1 + sentiment)
            return `rgb(${red}, ${green}, 0)`
        }
        return 'black'
    }
    
    const articleToRow = (article: article) => {
        const shorten = (text: string) => text.slice(0, 50) + '...'
        console.log(article)
        return (
            <Tr key={article.title}>
                <Td>{shorten(article.title)}</Td>
                <Td>{article.source.name}</Td>
                <Td>{article.publishedAt}</Td>
            </Tr>
        )
    }

    return (
        <Box p={8}>
            {sentiment &&
                <SkeletonText isLoaded={loaded} noOfLines={8}>
                    <Text size='2xl' fontWeight='semibold'>{symbol}'s Sentiment Score:</Text>
                    <Badge size='2xl' color={sentimentColor()}>{sentiment} </Badge>

                    <TableContainer>
                        <Table variant='striped' colorScheme='blue'>
                            <TableCaption>Articles that Mentioned {symbol}</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Source</Th>
                                    <Th>Date Published</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {news?.articles?.map(article => articleToRow(article))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </SkeletonText>
            }
        </Box>
    )
}