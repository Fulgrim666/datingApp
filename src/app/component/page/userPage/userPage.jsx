import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../../api";
import PropTypes from "prop-types";
import Qualities from "../../UI/quolities/index";
import UserEditPage from "../editUserPage";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}>Изменить</button>
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
