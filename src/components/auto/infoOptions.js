/**
 * Created by sudhamshbachu on 5/29/20.
 */

import React, { Component } from 'react'
import { Button,Box,Grid,ThemeProvider,CSSReset } from "@chakra-ui/core";

class InfoOptions extends Component{

    render(){


        return(
            <ThemeProvider>
                <CSSReset />
                <Stack spacing={10}>
                    <Text fontSize="3xl">Information Options</Text>
                </Stack>

                <SimpleGrid columns={1}>
                    <Button>Upload Policy</Button>
                    <Button>Enter Details</Button>
                </SimpleGrid>
            </ThemeProvider>


        )
    }

}

export default InfoOptions;
