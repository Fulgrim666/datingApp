import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validate";
import api from "../../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setdata] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "Male",
        qualities: [],
        licence: false
    });

    const [error, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Необходимо принять соглашение пользователя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
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
    };

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
            <SelectField
                onChange={handleChange}
                options={professions}
                defaultOption="Choose..."
                error={error.profession}
                value={data.profession}
                label="Выбери свою профессию"
            />
            <RadioField
                onChange={handleChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                label="Выбери пол: "
                value={data.sex}
                name="sex"
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label={"Выберите свои качества"}
            />

            <CheckBoxField
                value={data.licence}
                name={"licence"}
                onChange={handleChange}
                error={error.licence}
            >
                <a>Подтвердить лицензионное соглашение</a>
            </CheckBoxField>
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

export default RegisterForm;
