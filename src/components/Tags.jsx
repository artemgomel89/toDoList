import React, { useEffect, useState } from 'react';

import { PATH } from '../constants';

import Tag from './Tag';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import db from '../firebase';

const Tags = ({ handleDelete }) => {
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState('');

    useEffect(() => {
        const q = query(collection(db, PATH.TAGS));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tagsArr = [];
            querySnapshot.forEach((doc) => {
                tagsArr.push({ ...doc.data(), id: doc.id });
            });
            setTags(tagsArr);
        });

        return () => unsub();
    }, []);

    const handleSubmit = async () => {
        if (tagName !== '') {
            await addDoc(collection(db, PATH.TAGS), { name: tagName });
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
                <button
                    className="button-complete"
                    onClick={() => handleSubmit()}
                >
                    <ArrowForward id="i" />
                </button>
            </div>

            <div className="tags-container">
                {tags.map((tag) => (
                    <Tag
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
