import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label }) => {
    let optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <Select
                isMulti
                options={optionsArray}
                className={"basic-multi-select"}
                classNamePrefix={"select"}
                onChange={handleChange}
                name={name}
                closeMenuOnSelect={false}
            />
        </div>
    );
};

export default MultiSelectField;

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};
