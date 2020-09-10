/**
 * Created by sudhamshbachu on 9/9/20.
 */
import React from "react";
import { Image,
         Box,
        Button,

        } from "@chakra-ui/core";

export const Home = (props) => {
    return(
        <div>
            <Box width="100%">
                <Image src="/images/HowItWorks.png" alt="How It Works" />
            </Box>
        </div>
    );
}

export default Home;
