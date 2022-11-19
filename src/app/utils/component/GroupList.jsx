import React from "react";
import PropTypes from "prop-types";
const GroupList = ([
    { items, valueProp, contentProp, onItemSelect, selectedItem }
]) => {
    console.log(items);
    return (
        <ul className="list-group">
            {items.array.forEach((item) => (
                <li
                    className={
                        "list-group-item" +
                        (items[item] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(items[item])}
                    key={items[item][valueProp]}
                    role="button"
                >
                    {items[item][contentProp]}
                </li>
            ))}
        </ul>
    );
};

export default GroupList;
GroupList.defaultProps = {
    valueProp: "_id",
    contentProp: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProp: PropTypes.string.isRequired,
    contentProp: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object.isRequired
};
