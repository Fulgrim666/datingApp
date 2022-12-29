import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../../api";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validate";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelect";

const UserEditPage = () => {
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const { userId } = useParams();
    const [isloading, setIsLoading] = useState(false);
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        API.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((option) => ({
                label: data[option].name,
                value: data[option]._id,
                color: data[option].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

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
        const isValid = validator();
        if (!isValid) return;
        const { profession, qualities } = data;
        API.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
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
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(professions).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isloading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                name="Email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                                label="email"
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                name="profession"
                                error={errors.profession}
                                defaultOption="Choose..."
                                options={professions}
                                value={data.profession}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "otherl" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                                onSubmit={handleClick}
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading"
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;

UserEditPage.propTypes = {
    sex: PropTypes.string,
    profession: PropTypes.string,
    qualities: PropTypes.array,
    email: PropTypes.string
};

