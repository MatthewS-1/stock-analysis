import {
    Button, Input, Text,
    VStack
} from "@chakra-ui/react";
import React, { createContext, JSXElementConstructor, ReactElement, useState } from "react";

export const SymbolContext = createContext('');

export const Search = (props: { children?: ReactElement<any, string | JSXElementConstructor<any>>; }) => {
    const [symbol, setSymbol] = useState('');
    const [input, setInput] = useState('');

    const handleClick = () => {
        setInput('')
        setSymbol(input)
    }

    return (
        <>
            <VStack p={8} spacing={2}>
                <Text fontSize='2xl' textAlign={'center'}>Perform Stock Analysis for...</Text>
                <Input 
                    placeholder="Stock Symbol (Ex: AAPL or FB)" size="lg" textAlign={'center'}
                    value={input} onChange={(event) => setInput(event.target.value)}
                />
                <Button colorScheme='blue' onClick={handleClick}>Search</Button>
            </VStack>
            <SymbolContext.Provider value={symbol}>
                {props.children}
            </SymbolContext.Provider>
        </>
    )
}