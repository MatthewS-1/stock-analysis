import { HamburgerIcon } from "@chakra-ui/icons"
import {
    Accordion, Drawer, DrawerContent, DrawerHeader,
    DrawerOverlay, HStack, IconButton, Spacer, Text, useDisclosure
} from "@chakra-ui/react"
import * as React from "react"
import { SideBarContent, SidebarContentProps } from "./SideBarContent"

const SideBarItems: Array<SidebarContentProps> = [
    {
        title: "Try out our API!",
        image_src: "https://static.vecteezy.com/system/resources/thumbnails/000/569/512/small/vector60-3879-01.jpg",
        description: "Access our historical stock API by calling /stocks/{stock symbol} or access our news API through /news/{stock symbol}",
    },
    {
        title: "How does our sentiment classification work?",
        image_src: "https://cdn-icons-png.flaticon.com/512/3662/3662817.png",
        description: "sentiment classification is done by analyzing news headlines with a bayes classifier. The sentiment is then summarized as a number in [-1, 1] where -1 is very poor and 1 is very good.",
    }
]

function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <HStack p="2" backgroundColor="black">
                <IconButton aria-label="open/close drawer" icon={<HamburgerIcon />} onClick={onOpen} />
                <Spacer />
                <Text fontSize="3xl" textColor="white">
                    Stock Analysis
                </Text>
            </HStack>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>About</DrawerHeader>
                    <Accordion allowMultiple>
                        {
                            SideBarItems.map((content) => (
                                <SideBarContent
                                    title={content.title}
                                    image_src={content.image_src}
                                    description={content.description}
                                    key={content.title}
                                />
                            ))
                        }
                    </Accordion>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideBar