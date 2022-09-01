import { HamburgerIcon } from "@chakra-ui/icons"
import {
    Accordion, Drawer, DrawerContent, DrawerHeader,
    DrawerOverlay, HStack, IconButton, Spacer, Text, useDisclosure
} from "@chakra-ui/react"
import * as React from "react"
import { SideBarContent, SidebarContentProps } from "./SideBarContent"

const SideBarItems: Array<SidebarContentProps> = [
    {
        title: "US News 2022 Stock Recommendations",
        image_src: "https://upload.wikimedia.org/wikipedia/commons/1/18/U.S._News_%26_World_Report_logo.svg",
        description: "Lorem Ipst dolor",
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
                    <DrawerHeader borderBottomWidth='1px'>Stock Recommendations</DrawerHeader>
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