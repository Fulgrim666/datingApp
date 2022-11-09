import React from "react";
import PropTypes from "prop-types";
const Bookmark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};
console.log(Bookmark);
export default Bookmark;

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};
