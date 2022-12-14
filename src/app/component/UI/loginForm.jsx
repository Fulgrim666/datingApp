import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validate";

const LoginForm = () => {
    const [data, setdata] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setdata((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                massege: "Электронная почта обязательная для заполнения"
            },
            isEmail: {
                massege: "Email введен некоректно"
            }
        },
        password: {
            isRequired: {
                massege: "Пароль обязателен для заполнения"
            },
            isCapitalLetter: {
                massege: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                massege: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                massege: "Пароль должен иметь минимум 8 символов",
                value: 8
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).lenght === 0;
    };
    const isValid = Object.keys(errors).length === 0;
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
                errors={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                errors={errors.password}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary p-1 w-100"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
