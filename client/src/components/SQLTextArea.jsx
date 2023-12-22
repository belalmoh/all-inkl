import AceEditor from 'react-ace';
import { useColorMode } from '@chakra-ui/react';

import "ace-builds/src-min-noconflict/mode-mysql"
import "ace-builds/src-min-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/theme-github";
import "ace-builds/src-min-noconflict/theme-github_dark"
import "ace-builds/src-noconflict/ext-language_tools";


const SQLTextArea = ({state, handleChange}) => {

    const { colorMode } = useColorMode();

    return (
        <AceEditor 
            mode='mysql'
            theme={colorMode === 'dark' ? 'github_dark' : 'github'}
            onChange={handleChange}
            height='30vh'
            width='auto'
            value={state.query}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            fontSize={16}
            placeholder='Enter your MySQL command'
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
            }}
        />
    )
}

export default SQLTextArea;