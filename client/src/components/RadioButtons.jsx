import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

const RadioButtons = ({values, selectedIndex = 0, handleSelection}) => {
    
    const [value, setValue] = useState(values[selectedIndex]);

    const onSelect = (e) => {
        setValue(e);
        handleSelection(e);
    }

    return (
        <RadioGroup onChange={onSelect} value={value}>
            <Stack direction='row'>
                {values.map((radio, key) => (
                    <Radio key={key} value={radio}>{radio}</Radio>
                ))}
            </Stack>
        </RadioGroup>
    )
}

export default RadioButtons