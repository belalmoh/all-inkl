import React, { useContext } from 'react';
import { ChakraProvider, Box, Flex, Spacer, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { LogoutButton } from './components/LogoutButton';

import { Login, Query, Results } from './containers';
import { AppActions, AppContext } from './contexts/AppContext';

import { disconnect } from './apis/query';

function App() {
    const {state, dispatch} = useContext(AppContext);

    const handleRenderingLogic = () => {
        if(!state?.isConnected) {
            return <Login />
        }

        return (
            <>
                <Query />
                <Results />
            </>
        )
    }

    const handleLogout = async () => {
        try {
            await disconnect();
            dispatch({type: AppActions.DISCONNECT});
        } catch (e) {
            
        }
    }

    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl" p={12}>
                <Flex>
                    {state?.isConnected ? <Box><LogoutButton justifySelf="flex-start" onClick={handleLogout}/></Box> : <Box></Box>}
                    <Spacer />
                    <Box>
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Box>
                </Flex>
                <Flex>
                    <Box w={'100%'}>
                        {handleRenderingLogic()}
                    </Box>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}

export default App;
