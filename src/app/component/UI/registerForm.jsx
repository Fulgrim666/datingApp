import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validate";
import API from "../../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "Male",
        qualities: [],
        licence: false
    });

    const [error, setErrors] = useState({});
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((profession) => ({
                label: data[profession].name,
                value: data[profession]._id
            }));
            setProfession(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const qual in qualities) {
                if (elem.value === qualities[qual].value) {
                    qualitiesArray.push({
                        label: qualities[qual].value,
                        color: qualities[qual].color,
                        name: qualities[qual].name
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
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
                label="Выбери свою профессию"
                name="profession"
                error={error.profession}
                defaultOption="Choose..."
                options={professions}
                value={data.profession}
                onChange={handleChange}
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
                disabled={isValid}
                className="btn btn-primary p-1 w-100"
                onSubmit={handleSubmit}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
