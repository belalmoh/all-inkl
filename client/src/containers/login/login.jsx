import { useContext, useState } from 'react';

import {FormControl, FormLabel, Input, SimpleGrid, Button, Center, Spinner, Text} from '@chakra-ui/react';
import { AppContext, AppActions } from '../../contexts/AppContext';

import { setConnection } from '../../apis/query';

const Login = () => {

    const {state, dispatch} = useContext(AppContext);
    
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [database, setDatabase] = useState('');
    const [host, setHost] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        try {
            setLoading(true);
            setError(false);
            const result = await setConnection({user, password, database, host});
            if(result.status == 200) {
                dispatch({type: AppActions.CONNECT});
            }
        } catch (e) {
            // console.log(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Center>
            <SimpleGrid columns={1} spacing={4} height={'50vh'} width={'50vh'}>

                <FormControl isDisabled={loading}>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' value={user} onChange={(e) => setUser(e.target.value)}/>
                </FormControl>

                <FormControl isDisabled={loading}>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>

                <FormControl isDisabled={loading}>
                    <FormLabel>Database Host</FormLabel>
                    <Input type='text' value={host} onChange={(e) => setHost(e.target.value)}/>
                </FormControl>

                <FormControl isDisabled={loading}>
                    <FormLabel>Database Name</FormLabel>
                    <Input type='text' value={database} onChange={(e) => setDatabase(e.target.value)}/>
                </FormControl>

                <Button onClick={handleLogin} isDisabled={loading}>
                    {loading ? <Spinner /> : 'Login'}
                </Button>

                {error && <Text color='red'>
                    Authentication Error
                </Text>}

            </SimpleGrid>
        </Center>
    )
}

export default Login;