/**
 * Created by sudhamshbachu on 10/15/20.
 */
import React, { Component,useState, useEffect, } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useToast } from "@chakra-ui/react";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export const ViewQuotes = (props) =>{
    const classes = useStyles();
    const toast = useToast();

    function handleErrors(response) {
        if (!response.ok) {
            toast({
                title: "Error",
                description: "Unexpected Error Occured. Please retry.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            throw Error(response.statusText);
        }
        return response;
    }

    const [quotes, setQuotes] = useState(null);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
        };
        if(quotes == null) {
            //Get code from URL
            const queryString = window.location.search;
            const params = new URLSearchParams(queryString);
            if(params.get('code')) {
                fetch('/rest/quote/code/' + params.get('code'), requestOptions)
                    .then(handleErrors)
                    .then(response => response.json())
                    .then((data) => {
                        console.log("data" + data)
                        if(data.count == 1 ){
                            console.log("data"+ data.results[0])
                            setQuotes(data.results[0]);
                        }

                    }).catch(function (error) {
                    console.log("Error:" + error);
                });
            }
        }
    },[]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Insurance Provide</TableCell>
                        <TableCell align="right">Least</TableCell>
                        <TableCell align="right">Recommended</TableCell>
                        <TableCell align="right">Expensive (Risk Averse)</TableCell>
                        <TableCell align="right">Contact Agent</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default ViewQuotes;