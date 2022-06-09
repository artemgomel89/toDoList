import React from 'react';
import { Stack, Autocomplete, TextField } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../Api/firebase';
import { CONSTANTS } from '../constants';

const MuiAutocomplete = ({ tags, task }) => {
    const handleEdit = async (task, tag) => {
        await updateDoc(doc(db, CONSTANTS.TASKS, task.id), { tag });
    };

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
                    value={task.tag}
                    onChange={(e, newValue) => handleEdit(task, newValue)}
                />
            </Stack>
        </div>
    );
};

export default MuiAutocomplete;
