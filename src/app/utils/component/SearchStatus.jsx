import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ length }) => {
    const dlina = length;
    console.log(dlina);
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number >= 4 && number < 15) {
            return "человек тусанет";
        }
        if (lastOne === 1) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанет";
        return "человек тусанет";
    };
    return (
        <h3>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {length > 0
                    ? `${length + " " + renderPhrase(length)}  с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h3>
    );
};

export default SearchStatus;

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
