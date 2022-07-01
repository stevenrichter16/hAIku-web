import {React, useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import GridOnIcon from '@mui/icons-material/GridOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TableView from './TableView'
import GridView from './GridView'

const Home = () => {
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    const [poem, setPoem] = useState('')
    const [topic, setTopic] = useState('')
    const [poems, setPoems] = useState([{}])

    const [topicFilter, setTopicFilter] = useState('')
    const [finalFilter, setFinalFilter] = useState('')

    const [view, setView] = useState('grid')

    const poemDeleted = useSelector((state) => state.poem.poemDeleted)

    const getPoems = async () => {
        //const poemsRef = collection(db, "poems");

        // Create a query against the collection.
        //const q = query(poemsRef, where("topic", "==", "cute puppies"));

        /*
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data().text)
            setTopic(doc.data().topic)
            setPoem(doc.data().text)
        })
        */

        const tempPoems = []
        const querySnapshot = await getDocs(collection(db, "poems"));
            querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => topic: ${doc.data().topic} | text: ${doc.data().text}`);
            tempPoems.push({topic:doc.data().topic, text:doc.data().text})
        });
        setPoems(tempPoems)
    }

    useEffect(() => {
        async function fetchData() {
          // You can await here
          const response = await getPoems();
          //console.log(poems)
          //console.log("TIMES:", lastLoginUtc, lastLoginDatetime)
          //console.log("UID BABY:", uid)
        }
        fetchData();
      }, [poemDeleted]);
    
    
    const handleChange = (e) => {
        //console.log('changed')
        setTopicFilter(e.target.value)
    }

    const handleFilterSubmit = (e) => {
        //console.log("filter btn pressed")
        //console.log("topic:", topicFilter)
        setFinalFilter(topicFilter)
    }

    const handleView = (newView) => {
        console.log(newView)
        setView(newView)
    }

    return (
        <Container>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', paddingBottom:'1%'}}>
                    <Box sx={{flexDirection:'row'}}>
                        <Box sx={{flexDirection:'column'}}>
                            <TextField
                                    margin="normal"
                                    required
                                    id="filter"
                                    label="Filter"
                                    name="filter"
                                    autoFocus
                                    onChange={(e) => handleChange(e)}
                                />
                                
                        </Box>
                    </Box>
                            
                    <Box sx={{flexDirection:'row', width:'100%'}}>
                        <Button
                            variant="contained"
                            fullWidth
                            disabled 
                            onClick={(e) => handleFilterSubmit(e)}
                        >
                            Filter Poems
                        </Button>
                    </Box>
                </Box>
                
                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Box sx={{flexDirection:'row'}}>
                        <Box sx={{flexDirection:'column'}}>
                            <IconButton onClick={() => handleView("grid")}>
                                <GridOnIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{flexDirection:'column'}}>
                            <IconButton onClick={() => handleView("table")}>
                                <TableRowsIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {
                view == "grid" ? <GridView filter={topicFilter} poems={poems} />
                :
                <TableView filter={topicFilter} poems={poems} />
            }
        </Container>
    )
}

export default Home;