import React from 'react';
import Generator from './Generator';
import Poem from './Poem'
import Container from '@mui/material/Container'
const Create = () => {

    return (
        <Container>
            <Generator />
            <Poem />
        </Container>
    )
}

export default Create;