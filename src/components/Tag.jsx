import React from 'react';
import { PATH } from '../constants';

const Tag = ({ name, handleDelete, id }) => {
    return (
        <div className="tag" onClick={() => handleDelete(id, PATH.TAGS)}>
            #{name}
        </div>
    );
};

export default Tag;
