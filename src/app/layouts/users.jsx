import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../component/page/userPage";
import UsersListPage from "../component/page/userPage/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <> {userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
