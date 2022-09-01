import {
    Box, Flex, HStack, Spinner, Stat, StatArrow, StatGroup, StatHelpText, StatLabel,
    StatNumber, useToast, VStack
} from "@chakra-ui/react";
import { JSXElementConstructor, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { LineChart } from './LineChart';
import { SymbolContext } from './Search';

type stockResponseDate = [string, number, ...number[]]
interface stockResponse extends Array<stockResponseDate> { }

export const Statistics = (props: { children?: ReactElement<any, string | JSXElementConstructor<any>>; }) => {
    const didMount = useRef(false)
    const [loaded, setLoaded] = useState(true)
    const toast = useToast()
    const symbol = useContext(SymbolContext)
    const [xValues, setXValues] = useState<Array<string>>([])
    const [yValues, setYValues] = useState<Array<number>>([])
    
    const fetchData = async (symbol: string) => {
        setLoaded(false)
        const res = await fetch(`/stocks/${symbol}`)
        if (res.status !== 200) {
            toast({
                title: 'Failed to Fetch Stock Data',
                description: "The stock symbol you doesn't match any symbol we know. Double check that you've spelled it properly.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        } else {
            const data = await res.json() as stockResponse
            data.reverse()
            setXValues(data.map(data => data[0]))
            setYValues(data.map(data => data[1]))
        }
        setLoaded(true)
    }

    const getStat = (businessDays: number, text: string) => {
        const percentChange = (start: number, end: number): string => {
            return ((end - start) / start * 100).toFixed(1) + "%"
        }

        const change = (start: number, end: number): string => {
            return (end - start).toFixed(2)
        }

        const endIndex = yValues.length - 1
        const startIndex = endIndex - businessDays
        return (
            <Stat m={5} key={text}>
                <StatLabel>{text}</StatLabel>
                <StatNumber>${change(yValues[startIndex], yValues[endIndex])}</StatNumber>
                <StatHelpText>
                    <StatArrow type={(yValues[startIndex] < yValues[endIndex] ? 'increase' : 'decrease')} />
                    {percentChange(yValues[startIndex], yValues[endIndex])}
                </StatHelpText>
            </Stat>
        )
    }

    useEffect(() => {
        if (didMount.current) {
            fetchData(symbol)
        } else {
            didMount.current = true
        }
    }, [symbol])

    const stockDataLoaded = () => xValues.length > 0 && yValues.length > 0

    return (
        <>
        <HStack align="center" justify="center">
            {stockDataLoaded() &&
                <Box width={'60%'}>
                    <LineChart xValues={xValues} yValues={yValues}/>
                </Box>
            }
            {yValues.length > 5 &&
                <VStack>
                    <StatGroup>
                        {[getStat(1, "daily"), getStat(5, "weekly")]}
                    </StatGroup>
                </VStack>
            }
        </HStack>
        {(!loaded && !stockDataLoaded()) ?
            <Flex align="center" justify="center">
                <Spinner size='xl'/> 
            </Flex> 
            : props.children
        }
        </>
    )
}