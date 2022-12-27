import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validate";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
    const [data, setdata] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [error, setErrors] = useState({});
    const handleChange = (target) => {
        setdata((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательная для заполнения"
            },
            isEmail: {
                message: "Email введен некоректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalLetter: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен иметь минимум 8 символов",
                value: 8
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).lenght === 0;
    };
    const isValid = Object.keys(error).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={error.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={error.password}
            />
            <CheckBoxField
                value={data.stayOn}
                name={"stayOn"}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>

            <button
                type="submit"
                disabled={isValid}
                className="btn btn-primary p-1 w-100"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
