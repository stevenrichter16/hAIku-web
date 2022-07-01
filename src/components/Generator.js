import {React, useState } from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setPoemLines } from '../redux/poemSlice';

const Generator = () => {

    const dispatch = useDispatch()

    const [topic, setTopic] = useState('')
    const [output, setOutput] = useState('')

    const handleChange = (e) => {
        console.log("changed:", e.target.value)
        setTopic(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log("submitted")
        console.log(topic)
        getOutput()
    }

    const processOutput = (text) => {
        console.log("processing:", text)
        const matches = [...text.matchAll('\\n')];
        console.log("matches:", matches)
        const indexes = matches.map((match) => match.index)
        //console.log(indexes)
        console.log(text.split('\n'))
        const lines = text.split('\n')
        const first = lines[0]
        const second = lines[1]
        const third = lines[2]
        console.log("lines:",first,second,third)

        const outputLines = [first, second, third]
        dispatch(setPoemLines(outputLines))
    }

    const getOutput = () => {
        console.log("getting output")
        const shortPrompt = 'A metaphorical haiku about death and hope:\nThe water rose--\nLife sank beneath the level;\nhope floated above...\n###\nA metaphorical haiku about love:\nLove is a burning candle\nIt\'s not easy to handle\nIt burns, but it\'s still beautiful\n###\nA metaphorical haiku about hope:\nHope perches in the soul\nAnd sings without works\nAnd never stops\n###\nA metaphorical haiku about ' + topic + ':\n'
        
        const instance = axios.create({
            baseURL: 'https://api.openai.com/v1/',
            headers: { Authorization: ''},
            });

        // create the completion parameters object
        const completionParmas = {
            prompt: shortPrompt,
            max_tokens: 25,
            temperature: 0.96,
            n: 1,
            stream: false,
            logprobs: null,
            echo: false,
            frequency_penalty: 0.00,
            presence_penalty: 0.85,
            stop: '###',
        };

        // send a POST method to the API endpoint, which includes the created completion parameters
        /*const result = instance.post('/engines/davinci/completions', completionParmas)
        .then((response) => {
            let tempOutput = response.data.choices[0].text

            console.log(response.status)
            console.log(response.data.choices[0].text)
            setOutput(response.data.choices[0].text)

            //process output
            processOutput(tempOutput)

            dispatch(setPoemTopic(topic))
            dispatch(setPoemText(tempOutput))
            dispatch(setPoemTextLength(tempOutput.length))
        })*/    


    }

    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Typography component="h1" variant="h5">
                Enter topic
            </Typography>
            <Box component="form">
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="topic"
                        name="topic"
                        autoFocus
                        value="winter storm"
                        disabled
                        onChange={(e) => handleChange(e)}
                    />

                <Button
                    fullWidth
                    variant="contained"
                    disabled
                >
                    Generate Poem
                </Button>
            </Box>
        </Box>
    )
}

export default Generator;