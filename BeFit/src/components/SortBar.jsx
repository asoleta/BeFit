import React from "react";

const SortBar = ({ onSortChange }) => {
    return (
        <div className="sortBar">
            <h4>Sort by...</h4>
            <button onClick={() => onSortChange('newest')}>Most Recent</button>
            <button onClick={() => onSortChange('likes')}>Most Liked</button>
        </div>
    );
}

export default SortBar;
