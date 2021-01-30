/**
 * Created by sudhamshbachu on 9/9/20.
 */
import React from "react";
import { Image,
        Box,
        Button,
        Stat,
        StatLabel,
        StatNumber,
        StatHelpText,
        StatArrow,
        StatGroup,
    SimpleGrid,
    Icon,
        } from "@chakra-ui/react";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Heading } from "@chakra-ui/react"
import {AiFillPieChart,AiFillBank,AiFillDollarCircle} from 'react-icons/ai';

export const Home = (props) => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <SimpleGrid columns={3} spacing={10}>
                <Box height="80px">
                    Invest
                    <br/>
                    <Icon as={AiFillPieChart} w={20} h={20} color="green.300"/>
                </Box>
                <Box height="80px">
                    Assets Generate Rent
                    <br/>
                    <Icon as={AiFillBank} w={20} h={20} color="blue.300"/>

                </Box>
                <Box height="80px">
                    Collect Monthly
                    Taxable Distributions
                    <br/>
                    <Icon as={AiFillDollarCircle} w={20} h={20} color="green.300"/>
                </Box>
            </SimpleGrid>

            <br/>
            <br/>
            <br/>
            <br/>
            <Heading as="h3" size="lg" align="center">
                Past Investments
            </Heading>
            <Carousel responsive={responsive}>
                <div>
                    <Stat>
                        <StatLabel>FMC</StatLabel>
                        <StatNumber>1.2 Million</StatNumber>
                        <StatHelpText>
                            <StatArrow type="increase" />
                            16.02%
                        </StatHelpText>
                    </Stat>
                </div>
                <div>
                    <Stat>
                        <StatLabel>IHOP</StatLabel>
                        <StatNumber>3.8 Million</StatNumber>
                        <StatHelpText>
                            <StatArrow type="increase" />
                            15.31%
                        </StatHelpText>
                    </Stat>
                </div>
                <div>
                    <Stat>
                        <StatLabel>TLE DayCare</StatLabel>
                        <StatNumber>3.5 Million</StatNumber>
                        <StatHelpText>
                            <StatArrow type="increase" />
                            18.57%
                        </StatHelpText>
                    </Stat>
                </div>
                <div>
                    <Stat>
                        <StatLabel>FMC</StatLabel>
                        <StatNumber>1.2 Million</StatNumber>
                        <StatHelpText>
                            <StatArrow type="increase" />
                            16.02%
                        </StatHelpText>
                    </Stat>
                </div>
            </Carousel>
        </div>
    );
}

export default Home;
