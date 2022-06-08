import React, { useState } from 'react';
import { Stack, Autocomplete, TextField } from '@mui/material';

const MuiAutocomplete = ({ tags }) => {
    const [tagValue, setTagValue] = useState(null);
    console.log(tagValue);
    return (
        <div>
            <Stack spacing={2} width="150px">
                <Autocomplete
                    options={tags.map((e) => e.name)}
                    renderInput={(params) => (
                        <TextField
                            className="tag-input"
                            {...params}
                            label={'Tag'}
                        />
                    )}
                    value={tagValue}
                    onChange={(e, newValue) => setTagValue(newValue)}
                />
            </Stack>
        </div>
    );
};

export default MuiAutocomplete;
