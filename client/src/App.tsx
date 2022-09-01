import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"
import * as React from "react"
import { Search } from "./components/Search"
import { Statistics } from "./components/Statistics"
import { News } from "./components/News"
import SideBar from "./components/SideBar"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SideBar/>
    <Search>
      <Statistics>
        <News/>
      </Statistics>
    </Search>
  </ChakraProvider>
)
