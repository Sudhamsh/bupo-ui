/**
 * Created by sudhamshbachu on 9/9/20.
 */
import React from "react";
import {
    Image,
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
    Container,
    Center
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
            <Box>
                <Center>
                    <Heading>How does It Work!</Heading>
                </Center>
                <SimpleGrid columns={3} spacing={10} height="240px">
                    <Box >
                        <Center>
                            Invest
                        </Center>
                        <br/>
                        <Center>
                            <Icon as={AiFillPieChart} w={20} h={20} color="green.300"/>
                        </Center>
                    </Box>
                    <Box >
                        <Center>
                            Assets Generate Rent
                        </Center>
                        <br/>
                        <Center>
                            <Icon as={AiFillBank} w={20} h={20} color="blue.300"/>
                        </Center>

                    </Box>
                    <Box >
                        <Center>
                            Collect Monthly
                            Distributions
                        </Center>
                        <br/>
                        <Center>
                            <Icon as={AiFillDollarCircle} w={20} h={20} color="green.300"/>
                        </Center>
                    </Box>
                </SimpleGrid>
            </Box>

            <br/>
            <br/>
            <br/>
            <br/>



            <Box bg="gray.50">
                <Center>
                <Heading>Our Process</Heading>
                </Center>
                <SimpleGrid columns={4} spacing={10} height="240px">
                    <Box >
                        <Center>Analyze With Machine Learning</Center>
                        <br/>
                        <Center>
                            <Image
                                boxSize="60px"
                                objectFit="cover"
                                src="/images/machine-learning.png"
                                alt="Segun Adebayo"
                            />
                        </Center>
                    </Box>
                    <Box >
                        <Center>Add Human Expertise</Center>
                        <br/>
                        <Center>
                            <Image
                                boxSize="60px"
                                objectFit="cover"
                                src="/images/teamwork.png"
                                alt="Segun Adebayo"
                            />
                        </Center>
                    </Box>
                    <Box >
                        <Center>Negotiate</Center>
                        <br/>
                        <Center>
                            <Image
                                boxSize="60px"
                                objectFit="cover"
                                src="/images/iconfinder_negotiation_3827980.png"
                                alt="Segun Adebayo"
                            />

                        </Center>
                    </Box>
                    <Box >
                        <Center>Great Returns to Investors</Center>
                        <br/>
                        <Center>
                            <Image
                                boxSize="60px"
                                objectFit="cover"
                                src="/images/returns.png"
                                alt="Segun Adebayo"
                            />
                        </Center>
                    </Box>
                </SimpleGrid>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>


            {/*<Box bg="gray.50">*/}
                {/*<Center>*/}
                    {/*<Heading>Our Principles</Heading>*/}
                {/*</Center>*/}
                {/*<SimpleGrid columns={4} spacing={10} height="240px">*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Balance Risk And Reward*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillPieChart} w={20} h={20} color="green.300"/>*/}
                        {/*</Center>*/}
                    {/*</Box>*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Protect Principle*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillBank} w={20} h={20} color="blue.300"/>*/}
                        {/*</Center>*/}

                    {/*</Box>*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Monthly Distributions*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillDollarCircle} w={20} h={20} color="green.300"/>*/}
                        {/*</Center>*/}
                    {/*</Box>*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Increase Asset Value*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillDollarCircle} w={20} h={20} color="green.300"/>*/}
                        {/*</Center>*/}
                    {/*</Box>*/}
                {/*</SimpleGrid>*/}
            {/*</Box>*/}

            {/*<br/>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<Box>*/}
                {/*<Center>*/}
                    {/*<Heading>Why Real Estate</Heading>*/}
                {/*</Center>*/}
                {/*<SimpleGrid columns={4} spacing={10} height="240px">*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Diversify Your Investments*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillPieChart} w={20} h={20} color="green.300"/>*/}
                        {/*</Center>*/}
                    {/*</Box>*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Strong Lease Agreements Protect Returns*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillBank} w={20} h={20} color="blue.300"/>*/}
                        {/*</Center>*/}

                    {/*</Box>*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Monthly Cash Flows*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillDollarCircle} w={20} h={20} color="green.300"/>*/}
                        {/*</Center>*/}
                    {/*</Box>*/}
                    {/*<Box >*/}
                        {/*<Center>*/}
                            {/*Long Term Asset Creation*/}
                        {/*</Center>*/}
                        {/*<br/>*/}
                        {/*<Center>*/}
                            {/*<Icon as={AiFillDollarCircle} w={20} h={20} color="green.300"/>*/}
                        {/*</Center>*/}
                    {/*</Box>*/}
                {/*</SimpleGrid>*/}
            {/*</Box>*/}

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
