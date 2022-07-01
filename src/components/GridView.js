import {React, useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PoemCard from './PoemCard';

const GridView = ( props ) => {
    return (
        <Container>
            <Grid container rowSpacing={4} columnSpacing={1} justifyContent="center">
                {
                    props.poems.filter(item => {
                        if (props.filter == '') {
                            return item
                        } else if (item.topic.match('(.+)?'+props.filter+'(.+)?')) {
                            return item
                        }
                    }).map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <PoemCard topic={item.topic} text={item.text} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default GridView;

/*
            <Grid container rowSpacing={4} columnSpacing={1} justifyContent="center">
                {
                    poems.filter(item => {
                        if (finalFilter == '') {
                            return item
                        } else if (item.topic.match('(.+)?'+finalFilter+'(.+)?')) {
                            return item
                        }
                    }).map(item => (
                        <Grid item xs={12} lg={3}>
                            <PoemCard topic={item.topic} text={item.text} />
                        </Grid>
                    ))
                }
            </Grid>

s
*/
