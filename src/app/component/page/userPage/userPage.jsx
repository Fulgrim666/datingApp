import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../../api";
import PropTypes from "prop-types";
import Qualities from "../../UI/quolities/index";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const handleClick = () => {
        history.push("/users");
    };
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    });
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}> Все Пользователи</button>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
