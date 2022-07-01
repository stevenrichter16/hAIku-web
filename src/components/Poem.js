import {React, useState } from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';

const Poem = () => {
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    const poemTopic = useSelector((state) => state.poem.poemTopic)
    const poem = useSelector((state) => state.poem.poemText)
    const poemLength = useSelector((state) => state.poem.poemTextLength)
    const poemLines = useSelector((state) => state.poem.poemLines)

    const onSave = async () => {
        console.log("in save")

        try {
            const docRef = await addDoc(collection(db, "poems"),
                {
                    topic: poemTopic, 
                    text: poem
                }
            )
            console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.log("error:", e)
        }
    }

    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Paper sx={{marginTop: '1%', marginBottom:'1%', padding: '5%', textAlign:'center'}}>
                <Typography component="p">
                East wind shakes the snow
                </Typography>
                <Typography component="p">
                Blizzards fall from clouds  
                </Typography>
                <Typography component="p">
                Life on land is already buried
                </Typography>
                <Button disabled onClick={console.log("")}>Save</Button>
            </Paper>
            <Typography variant="body2">Saved poems will appear in the Home tab</Typography>
        </Box>
    )
}

export default Poem;