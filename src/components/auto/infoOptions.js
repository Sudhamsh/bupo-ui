/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { Button,Box,Grid,ChakraProvider,CSSReset } from "@chakra-ui/react";

class InfoOptions extends Component{

    render(){


        return(
            <ChakraProvider>

                <Stack spacing={10}>
                    <Text fontSize="3xl">Information Options</Text>
                </Stack>

                <SimpleGrid columns={1}>
                    <Button>Upload Policy</Button>
                    <Button>Enter Details</Button>
                </SimpleGrid>
            </ChakraProvider>


        )
    }

}

export default InfoOptions;
