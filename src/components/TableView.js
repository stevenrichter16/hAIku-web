import {React, useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { setPoemDeleted } from '../redux/poemSlice';


const TableView = ( props ) => {
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    const dispatch = useDispatch()

    const poemDeleted = useSelector((state) => state.poem.poemDeleted)

    const [poem, setPoem] = useState('')
    const [topic, setTopic] = useState('')
    const [poems, setPoems] = useState([{}])

    const [topicFilter, setTopicFilter] = useState('')
    const [finalFilter, setFinalFilter] = useState('')


    const handleDelete = async (text) => {
        console.log("delete:", text)
        try {
            const poemsRef = collection(db, "poems");

            // Create a query against the collection.
            const q = query(poemsRef, where("text", "==", text));
            const querySnapshot = await getDocs(q) 
            console.log("IN DELETE")
            querySnapshot.forEach((d) => {
                console.log("DELETING poem")
                console.log(d.data().text)
                deleteDoc(d.ref)
            })
            dispatch(setPoemDeleted(!poemDeleted))
        }
        catch (e) {
            console.log("IN ERROR")
            console.log("error:", e)
        }

    }

    return (
        
            <TableContainer sx={{width:'100%'}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Topic</TableCell>
                                <TableCell align="center">Content</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.poems.filter(item => {
                                    if (props.filter == '') {
                                        return item
                                    } else if (item.topic.match('(.+)?'+props.filter+'(.+)?')) {
                                        return item
                                    }
                                })
                                .map(item => (
                                    <TableRow>
                                        <TableCell align="center">{item.topic}</TableCell>
                                        <TableCell align="center">{item.text}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={async () => await handleDelete(item.text)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

       
    )
}

export default TableView;

/*

<TableContainer sx={{width:'75%'}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Topic</TableCell>
                                <TableCell align="center">Content</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                poems.map(item => {
                                    <TableRow>
                                        <TableCell align="center">{item.topic}</TableCell>
                                        <TableCell align="center">{item.text}</TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
*/