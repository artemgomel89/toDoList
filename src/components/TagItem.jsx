import React from 'react';

import { CONSTANTS } from '../constants';

const TagItem = ({ name, handleDelete, id }) => {
    return (
        <span className="tag" onClick={() => handleDelete(id, CONSTANTS.TAGS)}>
            #{name}
        </span>
    );
};

export default TagItem;
