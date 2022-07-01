import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { initializeApp } from "firebase/app";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { setPoemDeleted } from '../redux/poemSlice';


const PoemCard = ( props ) => {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const dispatch = useDispatch()

    const poemDeleted = useSelector((state) => state.poem.poemDeleted)

    const handleDelete = async () => {
        console.log("delete")

        try {
            const poemsRef = collection(db, "poems");

            // Create a query against the collection.
            const q = query(poemsRef, where("text", "==", props.text));
            const querySnapshot = await getDocs(q) 
            //console.log("IN DELETE")
            querySnapshot.forEach((d) => {
                //console.log("DELETING poem")
                //console.log(d.data().text)
                deleteDoc(d.ref)
            })
            dispatch(setPoemDeleted(!poemDeleted))
        }
        catch (e) {
            //console.log("IN ERROR")
            console.log("error:", e)
        }
    }

    return (
        <Card sx={{maxWidth: 275, textAlign:'center'}}>
            <CardHeader
                action={
                    <IconButton aria-label="delete" onClick={async () => await handleDelete()}>
                        <DeleteIcon/>
                    </IconButton>
                }
                title={<Typography variant='h6'>{props.topic}</Typography>}
                subheader={<Typography variant='p'>{props.text}</Typography>}
            >

            </CardHeader>

        </Card>
    )
}

export default PoemCard;