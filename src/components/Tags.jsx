import React, { useEffect, useState } from 'react';

import { CONSTANTS } from '../constants';

import TagItem from './TagItem';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import db from '../Api/firebase';

const Tags = ({ tags, setTags, handleDelete }) => {
    const [tagName, setTagName] = useState('');

    const getTags = async () => {
        const q = await query(collection(db, CONSTANTS.TAGS));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tagsArr = [];
            querySnapshot.forEach((doc) => {
                tagsArr.push({ ...doc.data(), id: doc.id });
            });
            setTags(tagsArr);
        });

        return () => unsub();
    };

    useEffect(() => {
        getTags();
    }, []);

    const addNewTag = async () => {
        if (tagName !== '') {
            await addDoc(collection(db, CONSTANTS.TAGS), { name: tagName });
            setTagName('');
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setTagName(e.target.value);
    };

    return (
        <div className="tags">
            <h3 style={{ textAlign: 'center' }}>Tags List</h3>
            <div className="tags-wrapper">
                <input
                    type="text"
                    value={tagName}
                    className="list"
                    onChange={handleChange}
                    placeholder="Enter a tag"
                />
                <button className="button-edit" onClick={() => addNewTag()}>
                    <ArrowForward id="i" />
                </button>
            </div>

            <div className="tags-container">
                {tags.map((tag) => (
                    <TagItem
                        name={tag.name}
                        id={tag.id}
                        key={tag.id}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tags;
