import React from "react";

const SearchBox = ({ searchField, searchChange}) => {

    <div className="searchbox">
        <input
            className="input"
            type="search"
            placeholder="Search"
            onChange={ searchChange }
         />
    </div>

}

export default SearchBox;