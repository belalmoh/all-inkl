import { useContext, useEffect, useState } from 'react';
import {Button, Flex, Box, Text} from '@chakra-ui/react'

import SQLTextArea from "../../components/SQLTextArea"
import { AppContext, AppActions } from '../../contexts/AppContext';

import { getQueryResults } from '../../apis/query';

const Query = () => {

    const {state, dispatch} = useContext(AppContext);
    const [error, setError] = useState({error: false, message: ''});

    const handleChange = (value) => {
        setError({error: false, message: ''});
        dispatch({type: AppActions.SET_QUERY, payload: {query: value}});
    }

    const handleSubmit = async () => {
        try {
            const result = await getQueryResults(state.query);
            console.log(result.data.result);
            dispatch({type: AppActions.SET_DATA, payload: {databaseResults: result.data.result}})
        } catch (e) {
            console.log(e);
            setError({error: true, message: e.response.data.error.message});
        }
    }
        
    return (
        <Box my={10}>
            <SQLTextArea handleChange={handleChange} state={state}/>
            <Flex gap={5} my={10}>
                <Button w={'50%'} colorScheme={'blue'} onClick={handleSubmit} isDisabled={state.query?.length == 0 ?? true}>Submit</Button>
                <Button w={'50%'} colorScheme={'pink'} onClick={() => handleChange('')}>Clear</Button>
            </Flex>
            {error.error && <Text color={'red'}>{error.message}</Text>}
        </Box>
    )
}

export default Query;