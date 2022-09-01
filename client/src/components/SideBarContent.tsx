import {
    AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Image, Text
} from "@chakra-ui/react"
import * as React from "react"

export interface SidebarContentProps {
    title: string,
    image_src: string,
    description: string,
}

export function SideBarContent({title: title, image_src, description}: SidebarContentProps) {
    return (
        <AccordionItem>
            <AccordionButton>
                <Box flex='1' textAlign='left'>
                    <Text>
                        {title}
                    </Text>
                    <Image
                        src={image_src}
                    />
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pl={4} pb={1} borderTop='1px' borderColor='gray.200'>
                {description}
            </AccordionPanel>
        </AccordionItem>
    )
}